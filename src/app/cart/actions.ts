"use server";

import { randomInt } from "node:crypto";
import { prisma } from "@/lib/prisma";
import { bookingSchema, type BookingField, type BookingInput } from "@/data/booking";

export type BookingResult =
  | { ok: true; reference: string }
  | { ok: false; message: string; fieldErrors?: Partial<Record<BookingField, string>> };

// No 0/O or 1/I, so a reference read out over the phone is unambiguous.
const ALPHABET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";

function makeReference(): string {
  let code = "";
  for (let i = 0; i < 6; i++) code += ALPHABET[randomInt(ALPHABET.length)];
  return `TZ-${code}`;
}

export async function createBooking(input: BookingInput): Promise<BookingResult> {
  const parsed = bookingSchema.safeParse(input);
  if (!parsed.success) {
    const fieldErrors: Partial<Record<BookingField, string>> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as BookingField | undefined;
      if (field && !fieldErrors[field]) fieldErrors[field] = issue.message;
    }
    return { ok: false, message: "Please check the highlighted fields.", fieldErrors };
  }

  const data = parsed.data;

  // Prices come from the database, never from the browser's cart.
  const ids = [...new Set(data.items.map((item) => item.id))];
  const tests = await prisma.labTest.findMany({ where: { id: { in: ids } } });
  const byId = new Map(tests.map((t) => [t.id, t]));

  const missing = ids.filter((id) => !byId.has(id));
  if (missing.length > 0) {
    return {
      ok: false,
      message: "Some tests in your cart are no longer offered. Please remove them and try again.",
    };
  }

  const lines = data.items.map((item) => {
    const test = byId.get(item.id)!;
    return { labTestId: test.id, name: test.name, rate: test.rate, quantity: item.quantity };
  });
  const subtotal = lines.reduce((sum, l) => sum + (l.rate ?? 0) * l.quantity, 0);

  // A collision among 32^6 codes is vanishingly rare, but retry rather than fail.
  for (let attempt = 0; attempt < 5; attempt++) {
    const reference = makeReference();
    try {
      await prisma.booking.create({
        data: {
          reference,
          patientName: data.patientName,
          phone: data.phone,
          age: data.age,
          city: data.city,
          preference: data.preference,
          address: data.preference === "HOME" ? (data.address ?? null) : null,
          preferredDate: data.preferredDate || null,
          preferredTime: data.preferredTime || null,
          subtotal,
          items: { create: lines },
        },
      });
      return { ok: true, reference };
    } catch (error) {
      const isUniqueClash =
        typeof error === "object" && error !== null && "code" in error && error.code === "P2002";
      if (!isUniqueClash) {
        console.error("createBooking failed", error);
        return {
          ok: false,
          message: "We couldn't place your booking just now. Please try again.",
        };
      }
    }
  }

  return { ok: false, message: "We couldn't place your booking just now. Please try again." };
}
