import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarClock, CheckCircle2, Home, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { contact } from "@/data/contact";
import { preferences, type Preference } from "@/data/booking";
import { formatRate } from "@/lib/format";
import { prisma } from "@/lib/prisma";

type PageProps = { params: Promise<{ reference: string }> };

export const metadata: Metadata = {
  title: "Booking Confirmed — Test Zone Diagnostic Centre",
  robots: { index: false },
};

function formatWhen(date: string | null, time: string | null): string {
  if (!date && !time) return "Any time — we'll agree a slot when we call";
  const parts: string[] = [];
  if (date) {
    parts.push(
      new Date(`${date}T00:00:00`).toLocaleDateString("en-PK", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    );
  }
  if (time) {
    const [h = 0, m = 0] = time.split(":").map(Number);
    const d = new Date(2000, 0, 1, h, m);
    parts.push(d.toLocaleTimeString("en-PK", { hour: "numeric", minute: "2-digit" }));
  }
  return parts.join(", ");
}

/**
 * Shown after checkout. Anyone holding the reference can open this page, so
 * it deliberately leaves out the phone number and address.
 */
export default async function BookingPage({ params }: PageProps) {
  const { reference } = await params;
  const booking = await prisma.booking.findUnique({
    where: { reference: reference.toUpperCase() },
    include: { items: { orderBy: { id: "asc" } } },
  });
  if (!booking) notFound();

  const unpriced = booking.items.filter((item) => item.rate === null).length;
  const isHome = booking.preference === "HOME";
  const firstName = booking.patientName.split(/\s+/)[0];

  const whatsappText = encodeURIComponent(
    `Hello, I have booked lab tests on the Test Zone website. My booking reference is ${booking.reference}.`,
  );

  return (
    <section className="min-h-[70vh] bg-surface py-10 md:py-14">
      <div className="container mx-auto max-w-2xl px-4">
        <div className="rounded-2xl bg-white p-6 shadow-card md:p-8">
          <div className="text-center">
            <CheckCircle2 className="mx-auto mb-3 size-12 text-[#5bc55e]" />
            <h1 className="text-2xl font-bold text-[#1a2b56]">
              Thank you{firstName ? `, ${firstName}` : ""}. Your booking is placed.
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Our team will call you shortly to confirm the details.
            </p>

            <div className="mx-auto mt-5 inline-flex flex-col rounded-xl border border-dashed border-[#5bc55e] bg-green-50 px-6 py-3">
              <span className="text-xs uppercase tracking-widest text-slate-500">
                Booking reference
              </span>
              <span className="font-mono text-2xl font-bold tracking-wider text-[#1a2b56]">
                {booking.reference}
              </span>
            </div>
          </div>

          <dl className="mt-8 grid grid-cols-1 gap-4 rounded-xl bg-slate-50 p-5 text-sm sm:grid-cols-2">
            <div className="flex items-start gap-2.5">
              {isHome ? (
                <Home className="mt-0.5 size-4 shrink-0 text-slate-400" />
              ) : (
                <MapPin className="mt-0.5 size-4 shrink-0 text-slate-400" />
              )}
              <div>
                <dt className="text-xs text-slate-500">Service</dt>
                <dd className="font-semibold text-[#1a2b56]">
                  {preferences[booking.preference as Preference] ?? booking.preference} ·{" "}
                  {booking.city}
                </dd>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <CalendarClock className="mt-0.5 size-4 shrink-0 text-slate-400" />
              <div>
                <dt className="text-xs text-slate-500">Preferred time</dt>
                <dd className="font-semibold text-[#1a2b56]">
                  {formatWhen(booking.preferredDate, booking.preferredTime)}
                </dd>
              </div>
            </div>
          </dl>

          <h2 className="mb-3 mt-8 font-bold text-[#1a2b56]">Tests booked</h2>
          <ul className="divide-y divide-slate-100 rounded-xl border border-slate-200">
            {booking.items.map((item) => (
              <li
                key={item.id}
                className="flex items-start justify-between gap-4 px-4 py-3 text-sm"
              >
                <span className="text-[#1a2b56]">
                  {item.name}
                  {item.quantity > 1 && <span className="text-slate-400"> × {item.quantity}</span>}
                </span>
                <span
                  className={`shrink-0 font-semibold ${item.rate === null ? "text-slate-400" : "text-[#1a2b56]"}`}
                >
                  {item.rate === null ? formatRate(null) : formatRate(item.rate * item.quantity)}
                </span>
              </li>
            ))}
            <li className="flex items-center justify-between gap-4 bg-slate-50 px-4 py-3">
              <span className="font-semibold text-[#1a2b56]">Subtotal</span>
              <span className="text-lg font-bold text-[#1a2b56]">
                {formatRate(booking.subtotal)}
              </span>
            </li>
          </ul>
          {unpriced > 0 && (
            <p className="mt-2 text-xs text-slate-500">
              {unpriced} test{unpriced === 1 ? " has" : "s have"} no published price and will be
              quoted when we call.
            </p>
          )}

          <p className="mt-6 text-xs leading-relaxed text-slate-500">
            Payment is taken at the lab or on sample collection. Rates are from the 2026 rate list
            and are confirmed on the call.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Button variant="cta" size="lg" asChild>
              <a
                href={`${contact.whatsapp.href}?text=${whatsappText}`}
                target="_blank"
                rel="noreferrer"
              >
                Message us on WhatsApp
              </a>
            </Button>
            <Button variant="outlineNavy" size="lg" asChild>
              <a href={contact.phone.href}>
                <Phone /> {contact.phone.display}
              </a>
            </Button>
          </div>

          <p className="mt-6 text-center text-sm">
            <Link href="/tests" className="font-semibold text-[#5bc55e] hover:underline">
              Book more tests
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
