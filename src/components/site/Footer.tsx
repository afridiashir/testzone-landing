import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { contact } from "@/data/contact";

const columns = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "Departments", href: "/departments" },
      { label: "Vaccination", href: "/vaccination" },
      { label: "Specialists", href: "/specialists" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Home Sampling", href: "/contact" },
      { label: "Vaccination", href: "/vaccination" },
      { label: "Full Test Directory", href: "/departments" },
      { label: "Corporate Health Panels", href: "/departments" },
      { label: "Doctor Consultation", href: "/specialists" },
      { label: "Online Reports", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/contact" },
      { label: "Terms of Service", href: "/contact" },
      { label: "Patient Rights", href: "/about" },
      { label: "Quality Policy", href: "/about" },
      { label: "Accreditations", href: "/about" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white p-1">
                <Image
                  width={256}
                  height={256}
                  src="/assets/logo-tzdc.png"
                  alt=""
                  aria-hidden="true"
                  className="size-full object-contain"
                />
              </span>
              <span className="leading-tight">
                <span className="block text-lg font-bold">Test Zone</span>
                <span className="block text-[11px] uppercase tracking-[0.18em] text-navy-foreground/60">
                  Diagnostic Centre
                </span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-navy-foreground/70">
              An accredited pathology and diagnostic network delivering precise results with
              compassionate, on-time care.
            </p>
            <ul className="mt-5 space-y-3 text-sm text-navy-foreground/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-green" />{" "}
                {contact.headOffice.address}
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="size-4 shrink-0 text-green" />
                <a href={contact.phone.href} className="transition-colors hover:text-green">
                  {contact.phone.display}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageCircle className="size-4 shrink-0 text-green" />
                <a
                  href={contact.whatsapp.href}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-green"
                >
                  {contact.whatsapp.display}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="size-4 shrink-0 text-green" />
                <a href={contact.email.href} className="transition-colors hover:text-green">
                  {contact.email.display}
                </a>
              </li>
            </ul>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold uppercase tracking-wider">{col.title}</h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-navy-foreground/70 transition-colors hover:text-green"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-navy-foreground/10">
        <div className="mx-auto max-w-7xl px-4 py-5 text-center text-xs text-navy-foreground/60">
          © {new Date().getFullYear()} {contact.organisation}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
