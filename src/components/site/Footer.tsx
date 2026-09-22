import { Link } from "@tanstack/react-router";
import { Activity, Mail, MapPin, Phone } from "lucide-react";

const columns = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", to: "/" as const },
      { label: "About Us", to: "/about" as const },
      { label: "Departments", to: "/departments" as const },
      { label: "Vaccination", to: "/vaccination" as const },
      { label: "Specialists", to: "/specialists" as const },
      { label: "Contact", to: "/contact" as const },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Home Sampling", to: "/contact" as const },
      { label: "Vaccination", to: "/vaccination" as const },
      { label: "Full Test Directory", to: "/departments" as const },
      { label: "Corporate Health Panels", to: "/departments" as const },
      { label: "Doctor Consultation", to: "/specialists" as const },
      { label: "Online Reports", to: "/contact" as const },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", to: "/contact" as const },
      { label: "Terms of Service", to: "/contact" as const },
      { label: "Patient Rights", to: "/about" as const },
      { label: "Quality Policy", to: "/about" as const },
      { label: "Accreditations", to: "/about" as const },
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
              <span className="grid size-10 place-items-center rounded-lg bg-navy-deep">
                <Activity className="size-5 text-green" />
              </span>
              <span className="leading-tight">
                <span className="block text-lg font-bold">Meridian</span>
                <span className="block text-[11px] uppercase tracking-[0.18em] text-navy-foreground/60">
                  Diagnostics
                </span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-navy-foreground/70">
              An accredited pathology and diagnostic network delivering precise results with
              compassionate, on-time care.
            </p>
            <ul className="mt-5 space-y-3 text-sm text-navy-foreground/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 text-green" /> 42 Grove Medical Park, Suite 300
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="size-4 text-green" /> +1 (800) 555-0132
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="size-4 text-green" /> care@meridianlabs.com
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
                      to={link.to}
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
          © {new Date().getFullYear()} Meridian Diagnostics. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
