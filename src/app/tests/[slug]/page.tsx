import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Building2, CalendarClock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { contact } from "@/data/contact";
import { getDepartment } from "@/data/departments";
import { formatRate, getRelatedTests, getTestBySlug } from "@/lib/lab-tests";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const test = await getTestBySlug(slug);
  if (!test) return {};

  const title = `${test.name} — Price & Details | Test Zone Diagnostic Centre`;
  const description =
    test.rate === null
      ? `${test.name} at Test Zone Diagnostic Centre (${test.category}). Contact us for the current price and sample requirements.`
      : `${test.name} at Test Zone Diagnostic Centre — ${formatRate(test.rate)}. ${test.category}. Free home sampling available.`;

  return { title, description, openGraph: { title, description } };
}

export default async function TestDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const test = await getTestBySlug(slug);
  if (!test) notFound();

  const [related, department] = await Promise.all([
    getRelatedTests(test),
    Promise.resolve(test.departmentSlug ? getDepartment(test.departmentSlug) : undefined),
  ]);

  const bookingMessage = encodeURIComponent(
    `Hello, I would like to book the following test at Test Zone Diagnostic Centre:\n\n${test.name}`,
  );

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-[#111c3a] via-[#1a2b56] to-[#121f40] pb-16 pt-14 text-white">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>

        <div className="container relative z-10 mx-auto max-w-5xl px-4">
          <Link
            href="/tests"
            className="mb-6 inline-flex items-center gap-2 text-sm text-blue-200/70 transition-colors hover:text-white"
          >
            <ArrowLeft className="size-4" /> All tests
          </Link>

          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-500/40 bg-green-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-green-400 backdrop-blur-sm">
            <Tag className="size-3.5" /> {test.category}
          </span>

          <h1 className="max-w-3xl text-3xl font-extrabold leading-tight tracking-tight md:text-4xl">
            {test.name}
          </h1>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <dl className="overflow-hidden rounded-xl border border-slate-200">
                <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-5 py-4">
                  <dt className="text-sm text-slate-500">Rate</dt>
                  <dd
                    className={`text-lg font-bold ${
                      test.rate === null ? "text-slate-400" : "text-[#1a2b56]"
                    }`}
                  >
                    {formatRate(test.rate)}
                  </dd>
                </div>

                <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-5 py-4">
                  <dt className="text-sm text-slate-500">Department</dt>
                  <dd className="text-sm font-semibold text-[#1a2b56]">
                    {department ? (
                      <Link
                        href={`/departments/${department.slug}`}
                        className="inline-flex items-center gap-1.5 hover:text-[#5bc55e]"
                      >
                        <Building2 className="size-3.5" />
                        {department.shortName}
                      </Link>
                    ) : (
                      test.category
                    )}
                  </dd>
                </div>

                <div className="flex items-center justify-between gap-4 px-5 py-4">
                  <dt className="text-sm text-slate-500">Reporting time</dt>
                  <dd className="inline-flex items-center gap-1.5 text-sm text-slate-600">
                    <CalendarClock className="size-3.5 text-slate-400" />
                    {test.reportingDay ?? "Confirm at booking"}
                  </dd>
                </div>
              </dl>

              {test.rate === null && (
                <p className="mt-5 border-l-2 border-[#5bc55e] bg-slate-50 py-3 pl-4 text-sm leading-relaxed text-slate-600">
                  The rate list does not publish a price for this test. Contact the lab for a
                  current quote.
                </p>
              )}

              <p className="mt-8 text-sm leading-relaxed text-slate-500">
                Rate taken from the 2026 Test Zone Diagnostic Centre rate list. Prices and sample
                requirements can change — please confirm when booking. Test Zone operates under ISO
                15189:2022 accreditation with reporting supervised by qualified consultants.
              </p>
            </div>

            <aside className="lg:col-span-1">
              <div className="rounded-xl bg-[#1a2b56] p-6 text-white lg:sticky lg:top-28">
                <h2 className="mb-2 text-lg font-bold">Book this test</h2>
                <p className="mb-5 text-sm leading-relaxed text-blue-200">
                  Free home sampling nationwide, or visit any of our 83 collection centres.
                </p>

                <div className="space-y-2.5">
                  <Button variant="cta" size="lg" className="w-full" asChild>
                    <a
                      href={`${contact.whatsapp.href}?text=${bookingMessage}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Book via WhatsApp
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full border-white/30 bg-transparent text-white hover:bg-white hover:text-[#1a2b56]"
                    asChild
                  >
                    <a href={contact.phone.href}>{contact.phone.display}</a>
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-slate-200 bg-slate-50 py-14">
          <div className="container mx-auto max-w-5xl px-4">
            <h2 className="mb-6 text-xl font-bold text-[#1a2b56]">
              Other tests in {test.category}
            </h2>

            <ul className="divide-y divide-slate-100 overflow-hidden rounded-xl border border-slate-200 bg-white">
              {related.map((other) => (
                <li key={other.id}>
                  <Link
                    href={`/tests/${other.slug}`}
                    className="group flex items-center justify-between gap-4 px-5 py-3.5 transition hover:bg-slate-50"
                  >
                    <span className="min-w-0 truncate text-sm font-medium text-[#1a2b56] group-hover:text-[#5bc55e]">
                      {other.name}
                    </span>
                    <span className="flex shrink-0 items-center gap-3">
                      <span
                        className={`text-sm font-semibold ${
                          other.rate === null ? "text-slate-400" : "text-slate-600"
                        }`}
                      >
                        {formatRate(other.rate)}
                      </span>
                      <ArrowRight className="size-4 text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-[#5bc55e]" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
