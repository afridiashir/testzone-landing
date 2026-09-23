// Options and rules shared by the checkout form (client) and the booking
// action (server), so the two can't disagree about what is valid.

import { z } from "zod";

export const cities = [
  "Lahore",
  "Karachi",
  "Islamabad",
  "Rawalpindi",
  "Faisalabad",
  "Multan",
  "Gujranwala",
  "Sialkot",
  "Peshawar",
  "Quetta",
  "Hyderabad",
  "Sargodha",
  "Bahawalpur",
  "Sahiwal",
  "Sheikhupura",
  "Kasur",
  "Okara",
  "Gujrat",
  "Other",
] as const;

export const preferences = {
  LAB: "Visit Lab",
  HOME: "Home Sample",
} as const;

export type Preference = keyof typeof preferences;
export type City = (typeof cities)[number];

/** Pakistani mobile: 03XXXXXXXXX, 923XXXXXXXXX or +92 3XX XXXXXXX. */
const MOBILE = /^(?:\+?92|0)3\d{9}$/;

/** Strips spaces and dashes, then rewrites to the 03XXXXXXXXX form. */
export function normalisePhone(raw: string): string {
  const compact = raw.replace(/[\s-]/g, "");
  if (!MOBILE.test(compact)) return compact;
  return "0" + compact.slice(-10);
}

export const bookingSchema = z
  .object({
    patientName: z.string().trim().min(2, "Enter the patient's name").max(100),
    phone: z
      .string()
      .transform((v) => v.replace(/[\s-]/g, ""))
      .refine((v) => MOBILE.test(v), "Enter a mobile number like 03xx-xxxxxxx")
      .transform(normalisePhone),
    // The form sends the raw input string; blank must fail, not coerce to 0.
    age: z
      .union([z.string(), z.number()])
      .refine((v) => String(v).trim() !== "", "Enter the patient's age")
      .pipe(
        z.coerce
          .number({ invalid_type_error: "Enter the patient's age" })
          .int("Enter age in whole years")
          .min(0, "Enter a valid age")
          .max(120, "Enter a valid age"),
      ),
    city: z.enum(cities, { errorMap: () => ({ message: "Choose a city" }) }),
    preference: z.enum(["LAB", "HOME"]),
    address: z.string().trim().max(300).optional(),
    preferredDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .optional()
      .or(z.literal("")),
    preferredTime: z
      .string()
      .regex(/^\d{2}:\d{2}$/)
      .optional()
      .or(z.literal("")),
    items: z
      .array(
        z.object({
          id: z.number().int().positive(),
          quantity: z.number().int().min(1).max(10),
        }),
      )
      .min(1, "Your cart is empty")
      .max(50),
  })
  .superRefine((data, ctx) => {
    if (data.preference === "HOME" && (!data.address || data.address.length < 5)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["address"],
        message: "Enter the address for home sample collection",
      });
    }
  });

export type BookingInput = z.input<typeof bookingSchema>;
export type BookingField = keyof BookingInput;
