"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, Phone, Menu, X, Clock, MessageCircle, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { contact } from "@/data/contact";
import { departments } from "@/data/departments";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/departments", label: "Departments" },
  { href: "/vaccination", label: "Vaccination" },
  { href: "/specialists", label: "Specialists" },
  { href: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // "/" only matches exactly; every other link also matches its sub-routes,
  // so /departments stays lit while on /departments/hematology.
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-navy-deep text-navy-foreground/80">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-1 px-4 py-2 text-xs sm:text-[13px]">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
            <a
              href={contact.phone.href}
              className="inline-flex items-center gap-2 hover:text-green"
            >
              <Phone className="size-3.5" /> {contact.phone.display}
            </a>
            <a
              href={contact.whatsapp.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 hover:text-green"
            >
              <MessageCircle className="size-3.5" /> {contact.whatsapp.display}
            </a>
            <a
              href={contact.email.href}
              className="inline-flex items-center gap-2 hover:text-green"
            >
              <Mail className="size-3.5" /> {contact.email.display}
            </a>
          </div>
          <span className="inline-flex items-center gap-2">
            <Clock className="size-3.5" /> Collection centres open 24/7
          </span>
        </div>
      </div>

      <div className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
          <Link href="/" className="flex items-center gap-2.5">
            {/* Decorative: the adjacent text already names the brand. */}
            <Image
              width={256}
              height={256}
              src="/assets/logo-tzdc.png"
              alt=""
              aria-hidden="true"
              className="size-11 shrink-0 object-contain"
            />
            <span className="leading-tight">
              <span className="block text-lg font-bold text-navy">Test Zone</span>
              <span className="block text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Diagnostic Centre
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) =>
              link.href === "/departments" ? (
                // Opens on hover and on keyboard focus, so the submenu is
                // reachable without a pointer.
                <div key={link.href} className="group relative">
                  <Link
                    href={link.href}
                    className={`inline-flex items-center gap-1 text-sm font-medium transition-colors hover:text-navy ${
                      isActive(link.href) ? "font-semibold text-navy" : "text-muted-foreground"
                    }`}
                  >
                    {link.label}
                    <ChevronDown className="size-3.5 transition-transform group-hover:rotate-180" />
                  </Link>

                  <div className="invisible absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 pt-3 opacity-0 transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <div className="overflow-hidden rounded-xl border border-border bg-background py-2 shadow-lg">
                      {departments.map((dept) => (
                        <Link
                          key={dept.slug}
                          href={`/departments/${dept.slug}`}
                          className={`block px-4 py-2.5 text-sm transition-colors hover:bg-surface hover:text-navy ${
                            pathname === `/departments/${dept.slug}`
                              ? "bg-surface font-semibold text-navy"
                              : "text-muted-foreground"
                          }`}
                        >
                          {dept.shortName}
                        </Link>
                      ))}
                      <div className="mt-1 border-t border-border pt-1">
                        <Link
                          href="/departments"
                          className="block px-4 py-2.5 text-sm font-semibold text-green transition-colors hover:bg-surface"
                        >
                          All departments &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-navy ${
                    isActive(link.href) ? "font-semibold text-navy" : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ),
            )}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Button variant="outlineNavy" size="lg" asChild>
              <Link href="/contact">View Reports</Link>
            </Button>
            <Button variant="cta" size="lg" asChild>
              <Link href="/contact">Book Home Sampling</Link>
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
                <div key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`block rounded-md px-3 py-2 text-sm font-medium ${
                      isActive(link.href) ? "bg-surface text-navy" : "text-muted-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>

                  {link.href === "/departments" && (
                    <div className="ml-3 border-l border-border pl-3">
                      {departments.map((dept) => (
                        <Link
                          key={dept.slug}
                          href={`/departments/${dept.slug}`}
                          onClick={() => setOpen(false)}
                          className={`block rounded-md px-3 py-2 text-sm ${
                            pathname === `/departments/${dept.slug}`
                              ? "font-semibold text-navy"
                              : "text-muted-foreground"
                          }`}
                        >
                          {dept.shortName}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
            <div className="mt-4 flex flex-col gap-2">
              <Button variant="outlineNavy" size="lg" asChild>
                <Link href="/contact" onClick={() => setOpen(false)}>
                  View Reports
                </Link>
              </Button>
              <Button variant="cta" size="lg" asChild>
                <Link href="/contact" onClick={() => setOpen(false)}>
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
