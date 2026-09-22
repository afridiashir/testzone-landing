import { Link } from "@tanstack/react-router";
import { Mail, Phone, Menu, Activity, X, Clock } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/departments", label: "Departments" },
  { to: "/vaccination", label: "Vaccination" },
  { to: "/specialists", label: "Specialists" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-navy-deep text-navy-foreground/80">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-1 px-4 py-2 text-xs sm:text-[13px]">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
            <a href="tel:+18005550132" className="inline-flex items-center gap-2 hover:text-green">
              <Phone className="size-3.5" /> +1 (800) 555-0132
            </a>
            <a
              href="mailto:care@meridianlabs.com"
              className="inline-flex items-center gap-2 hover:text-green"
            >
              <Mail className="size-3.5" /> care@meridianlabs.com
            </a>
          </div>
          <span className="inline-flex items-center gap-2">
            <Clock className="size-3.5" /> Collection centres open 24/7
          </span>
        </div>
      </div>

      <div className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="grid size-10 place-items-center rounded-lg bg-navy text-navy-foreground">
              <Activity className="size-5 text-green" />
            </span>
            <span className="leading-tight">
              <span className="block text-lg font-bold text-navy">Meridian</span>
              <span className="block text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Diagnostics
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                activeOptions={{ exact: link.to === "/" }}
                activeProps={{ className: "text-navy font-semibold" }}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-navy"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Button variant="outlineNavy" size="lg" asChild>
              <Link to="/contact">View Reports</Link>
            </Button>
            <Button variant="cta" size="lg" asChild>
              <Link to="/contact">Book Home Sampling</Link>
            </Button>
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="grid size-10 place-items-center rounded-md border border-border text-navy lg:hidden"
          >
            {open ? <Menu className="size-5" /> : <X className="size-5 rotate-90" />}
          </button>
        </div>

        {open && (
          <div className="border-t border-border bg-background px-4 py-4 lg:hidden">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  activeOptions={{ exact: link.to === "/" }}
                  activeProps={{ className: "bg-surface text-navy" }}
                  className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-4 flex flex-col gap-2">
              <Button variant="outlineNavy" size="lg" asChild>
                <Link to="/contact" onClick={() => setOpen(false)}>
                  View Reports
                </Link>
              </Button>
              <Button variant="cta" size="lg" asChild>
                <Link to="/contact" onClick={() => setOpen(false)}>
                  Book Home Sampling
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
