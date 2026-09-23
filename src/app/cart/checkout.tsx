"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition, type FormEvent, type ReactNode } from "react";
import { Loader2, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { contact } from "@/data/contact";
import { cities, preferences, type BookingField, type City, type Preference } from "@/data/booking";
import { MAX_QUANTITY, useCart } from "@/lib/cart";
import { formatRate } from "@/lib/format";
import { createBooking } from "./actions";

const inputClass =
  "w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-[#1a2b56] outline-none transition placeholder:text-slate-400 focus:border-[#5bc55e] focus:ring-2 focus:ring-green-100 aria-[invalid=true]:border-red-400 aria-[invalid=true]:ring-red-100";

function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string | undefined;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-[#1a2b56]">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

/** Today in the visitor's timezone, as YYYY-MM-DD for the date input's `min`. */
function today(): string {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

type FormState = {
  patientName: string;
  phone: string;
  age: string;
  city: City;
  address: string;
  preferredDate: string;
  preferredTime: string;
  preference: Preference;
};

export function Checkout() {
  const router = useRouter();
  const cart = useCart();
  const [isPending, startTransition] = useTransition();

  const [form, setForm] = useState<FormState>({
    patientName: "",
    phone: "",
    age: "",
    city: "Lahore",
    address: "",
    preferredDate: "",
    preferredTime: "",
    preference: "LAB",
  });
  const [errors, setErrors] = useState<Partial<Record<BookingField, string>>>({});
  const [formError, setFormError] = useState<string | null>(null);
  // Set once the booking is saved, so emptying the cart doesn't flash the
  // empty-cart screen while the confirmation page loads.
  const [placed, setPlaced] = useState(false);

  const set = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) {
      setErrors(({ [field]: _cleared, ...rest }) => rest);
    }
  };

  const errorProps = (field: BookingField) =>
    errors[field] ? { "aria-invalid": true, "aria-describedby": `${field}-error` } : {};

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);

    startTransition(async () => {
      const result = await createBooking({
        ...form,
        items: cart.items.map(({ id, quantity }) => ({ id, quantity })),
      });

      if (result.ok) {
        setPlaced(true);
        cart.clear();
        router.push(`/booking/${result.reference}`);
        return;
      }
      setErrors(result.fieldErrors ?? {});
      setFormError(result.message);
    });
  };

  if (placed) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center rounded-2xl bg-white px-6 py-16 text-center shadow-card">
        <Loader2 className="mb-4 size-8 animate-spin text-[#5bc55e]" />
        <p className="font-semibold text-[#1a2b56]">Booking placed. Loading your confirmation…</p>
      </div>
    );
  }

  if (!cart.ready) {
    return <div className="h-96 animate-pulse rounded-2xl bg-white/60" />;
  }

  if (cart.items.length === 0) {
    return (
      <div className="mx-auto max-w-md rounded-2xl bg-white px-6 py-16 text-center shadow-card">
        <span className="mx-auto mb-4 grid size-14 place-items-center rounded-full bg-surface-blue text-[#1a2b56]">
          <ShoppingCart className="size-6" />
        </span>
        <h1 className="text-xl font-bold text-[#1a2b56]">Your health cart is empty</h1>
        <p className="mt-2 text-sm text-slate-500">
          Browse our test directory and add the tests you need.
        </p>
        <Button variant="cta" size="lg" className="mt-6" asChild>
          <Link href="/tests">Browse lab tests</Link>
        </Button>
      </div>
    );
  }

  const confirmLabel =
    `Confirm ${cart.count} test${cart.count === 1 ? "" : "s"}` +
    (cart.subtotal > 0 ? ` · ${formatRate(cart.subtotal)}` : "");

  return (
    <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
      {/* Cart */}
      <div className="rounded-2xl bg-white p-5 shadow-card md:p-6">
        <h1 className="mb-5 flex items-center gap-2 text-xl font-bold text-[#1a2b56]">
          My Health Cart
          <span className="grid min-w-6 place-items-center rounded-full bg-surface-blue px-1.5 text-xs font-bold leading-6">
            {cart.items.length}
          </span>
        </h1>

        <ul className="divide-y divide-slate-100">
          {cart.items.map((item) => (
            <li key={item.id} className="flex flex-wrap items-start gap-3 py-4 first:pt-0">
              <Image
                src="/assets/logo-tzdc.png"
                alt=""
                aria-hidden="true"
                width={44}
                height={44}
                className="size-11 shrink-0 rounded-full border border-slate-100 object-contain p-0.5"
              />

              <div className="min-w-0 flex-1">
                <Link
                  href={`/tests/${item.slug}`}
                  className="block text-sm font-semibold leading-snug text-[#1a2b56] hover:text-[#5bc55e]"
                >
                  {item.name}
                </Link>
                <p className="mt-0.5 text-xs text-slate-500">{item.category}</p>
                <p className="mt-1 text-sm text-slate-600">
                  {formatRate(item.rate)}
                  {item.rate !== null && item.quantity > 1 && (
                    <span className="text-slate-400"> × {item.quantity}</span>
                  )}
                </p>
              </div>

              <div className="ml-auto flex shrink-0 items-center gap-2">
                <div className="flex items-center rounded-lg border border-slate-200">
                  <button
                    type="button"
                    onClick={() => cart.setQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    aria-label={`Decrease quantity of ${item.name}`}
                    className="grid size-8 place-items-center text-slate-600 transition hover:bg-slate-50 disabled:opacity-40"
                  >
                    <Minus className="size-3.5" />
                  </button>
                  <span
                    className="w-7 text-center text-sm font-semibold text-[#1a2b56]"
                    aria-live="polite"
                  >
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => cart.setQuantity(item.id, item.quantity + 1)}
                    disabled={item.quantity >= MAX_QUANTITY}
                    aria-label={`Increase quantity of ${item.name}`}
                    className="grid size-8 place-items-center text-slate-600 transition hover:bg-slate-50 disabled:opacity-40"
                  >
                    <Plus className="size-3.5" />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => cart.remove(item.id)}
                  aria-label={`Remove ${item.name} from cart`}
                  className="grid size-8 place-items-center rounded-lg text-red-600 transition hover:bg-red-50"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>

        <Link
          href="/tests"
          className="mt-2 inline-block text-sm font-semibold text-[#5bc55e] hover:underline"
        >
          + Add more tests
        </Link>

        <div className="mt-5 border-t border-slate-100 pt-4 text-right">
          <p className="text-[#1a2b56]">
            Subtotal: <strong className="ml-1 text-lg">{formatRate(cart.subtotal)}</strong>
          </p>
          {cart.unpricedCount > 0 && (
            <p className="mt-1 text-xs text-slate-500">
              {cart.unpricedCount} test{cart.unpricedCount === 1 ? " has" : "s have"} no published
              price. Our team will quote it when confirming.
            </p>
          )}
        </div>
      </div>

      {/* Patient details */}
      <form onSubmit={onSubmit} noValidate className="rounded-2xl bg-white p-5 shadow-card md:p-6">
        <h2 className="mb-5 text-xl font-bold text-[#1a2b56]">Patient Details</h2>

        <div className="space-y-4">
          <Field id="patientName" label="Name" required error={errors.patientName}>
            <input
              id="patientName"
              autoComplete="name"
              placeholder="Enter your name"
              value={form.patientName}
              onChange={(e) => set("patientName", e.target.value)}
              className={inputClass}
              {...errorProps("patientName")}
            />
          </Field>

          <Field id="phone" label="Phone" required error={errors.phone}>
            <input
              id="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="03xx-xxxxxxx or 92 3xx-xxxxxxx"
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
              className={inputClass}
              {...errorProps("phone")}
            />
          </Field>

          <Field id="age" label="Age" required error={errors.age}>
            <input
              id="age"
              type="number"
              inputMode="numeric"
              min={0}
              max={120}
              placeholder="Enter your age"
              value={form.age}
              onChange={(e) => set("age", e.target.value)}
              className={inputClass}
              {...errorProps("age")}
            />
          </Field>

          <Field id="city" label="City" required error={errors.city}>
            <select
              id="city"
              value={form.city}
              onChange={(e) => set("city", e.target.value as City)}
              className={inputClass}
              {...errorProps("city")}
            >
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </Field>

          <fieldset>
            <legend className="mb-2 text-sm font-semibold text-[#1a2b56]">
              When do you need this service?
            </legend>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field id="preferredDate" label="Date (Optional)">
                <input
                  id="preferredDate"
                  type="date"
                  min={today()}
                  value={form.preferredDate}
                  onChange={(e) => set("preferredDate", e.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field id="preferredTime" label="Time (Optional)">
                <input
                  id="preferredTime"
                  type="time"
                  value={form.preferredTime}
                  onChange={(e) => set("preferredTime", e.target.value)}
                  className={inputClass}
                />
              </Field>
            </div>
          </fieldset>

          <fieldset>
            <legend className="mb-2 text-sm font-semibold text-[#1a2b56]">
              Select Your Preference
            </legend>
            <div className="flex flex-wrap gap-5">
              {(Object.keys(preferences) as Preference[]).map((key) => (
                <label
                  key={key}
                  className="inline-flex cursor-pointer items-center gap-2 text-sm text-slate-700"
                >
                  <input
                    type="radio"
                    name="preference"
                    value={key}
                    checked={form.preference === key}
                    onChange={() => set("preference", key)}
                    className="size-4 accent-[#1a2b56]"
                  />
                  {preferences[key]}
                </label>
              ))}
            </div>
          </fieldset>

          {form.preference === "HOME" && (
            <Field
              id="address"
              label="Address for sample collection"
              required
              error={errors.address}
            >
              <textarea
                id="address"
                rows={3}
                autoComplete="street-address"
                placeholder="House, street, area"
                value={form.address}
                onChange={(e) => set("address", e.target.value)}
                className={inputClass}
                {...errorProps("address")}
              />
            </Field>
          )}
        </div>

        {formError && (
          <p role="alert" className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            {formError}
          </p>
        )}

        <div className="mt-6 flex justify-end">
          <Button
            type="submit"
            size="lg"
            disabled={isPending}
            className="w-full bg-[#1a2b56] text-white hover:bg-[#23386e] sm:w-auto"
          >
            {isPending && <Loader2 className="animate-spin" />}
            {isPending ? "Booking…" : confirmLabel}
          </Button>
        </div>

        <p className="mt-5 text-xs leading-relaxed text-slate-500">
          Our team will call you to confirm your booking. For any query or complaint, call{" "}
          <a href={contact.phone.href} className="font-semibold text-[#1a2b56] hover:underline">
            {contact.phone.display}
          </a>{" "}
          or WhatsApp{" "}
          <a
            href={contact.whatsapp.href}
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-[#1a2b56] hover:underline"
          >
            {contact.whatsapp.display}
          </a>
          .
        </p>
      </form>
    </div>
  );
}
