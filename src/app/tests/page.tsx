import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { CalendarClock, FlaskConical } from "lucide-react";
import { AddToCartButtons } from "@/components/cart/AddToCartButtons";
import { PageHero } from "@/components/site/Sections";
import { getCategories, getTestCount, searchTests, formatRate } from "@/lib/lab-tests";
import { SearchControls } from "./search-controls";

const title = "Lab Test Directory & Rates — Test Zone Diagnostic Centre";
const description =
  "Browse the full Test Zone Diagnostic Centre test directory with 2026 rates — pathology, molecular, microbiology, histopathology and radiology.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description },
};

type PageProps = {
  searchParams: Promise<{ q?: string; category?: string; page?: string }>;
};

function Pagination({
  page,
  totalPages,
  makeHref,
}: {
  page: number;
  totalPages: number;
  makeHref: (page: number) => string;
}) {
  if (totalPages <= 1) return null;

  // A compact window around the current page rather than 29 page links.
  const pages = new Set<number>([1, totalPages, page, page - 1, page + 1]);
  const visible = [...pages].filter((p) => p >= 1 && p <= totalPages).sort((a, b) => a - b);

  return (
    <nav className="mt-10 flex flex-wrap items-center justify-center gap-2" aria-label="Pagination">
      {page > 1 && (
        <Link
          href={makeHref(page - 1)}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 transition hover:border-green-200 hover:text-[#1a2b56]"
        >
          Previous
        </Link>
      )}

      {visible.map((p, i) => (
        <span key={p} className="flex items-center gap-2">
          {i > 0 && visible[i - 1] !== p - 1 && <span className="text-slate-300">…</span>}
          <Link
            href={makeHref(p)}
            aria-current={p === page ? "page" : undefined}
            className={`rounded-lg border px-3.5 py-2 text-sm transition ${
              p === page
                ? "border-[#1a2b56] bg-[#1a2b56] font-semibold text-white"
                : "border-slate-200 text-slate-600 hover:border-green-200 hover:text-[#1a2b56]"
            }`}
          >
            {p}
          </Link>
        </span>
      ))}

      {page < totalPages && (
        <Link
          href={makeHref(page + 1)}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 transition hover:border-green-200 hover:text-[#1a2b56]"
        >
          Next
        </Link>
      )}
    </nav>
  );
}

export default async function TestsPage({ searchParams }: PageProps) {
  const { q, category, page: pageParam } = await searchParams;
  const page = Number.parseInt(pageParam ?? "1", 10) || 1;

  const [categories, totalTests, result] = await Promise.all([
    getCategories(),
    getTestCount(),
    searchTests({ query: q, category, page }),
  ]);

  const makeHref = (target: number) => {
    const search = new URLSearchParams();
    if (q) search.set("q", q);
    if (category) search.set("category", category);
    if (target > 1) search.set("page", String(target));
    const qs = search.toString();
    return qs ? `/tests?${qs}` : "/tests";
  };

  const from = (result.page - 1) * result.perPage + 1;
  const to = Math.min(result.page * result.perPage, result.total);

  return (
    <>
      <PageHero
        eyebrow="Test directory"
        title="Lab Tests & Rates"
        text={`Browse all ${totalTests} tests offered at Test Zone Diagnostic Centre, with current rates. Search by name or filter by department.`}
      />

      <section className="bg-white py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <Suspense fallback={<div className="mb-10 h-32" />}>
            <SearchControls categories={categories} />
          </Suspense>

          {result.total === 0 ? (
            <div className="rounded-xl border border-slate-200 bg-slate-50 py-16 text-center">
              <p className="font-semibold text-[#1a2b56]">No tests matched that search.</p>
              <p className="mt-2 text-sm text-slate-500">
                Try a shorter term, or{" "}
                <Link href="/tests" className="font-semibold text-[#5bc55e] hover:underline">
                  browse all tests
                </Link>
                .
              </p>
            </div>
          ) : (
            <>
              <p className="mb-4 text-sm text-slate-500">
                Showing <strong className="text-[#1a2b56]">{from}</strong>–
                <strong className="text-[#1a2b56]">{to}</strong> of{" "}
                <strong className="text-[#1a2b56]">{result.total}</strong> tests
                {category ? ` in ${category}` : ""}
                {q ? ` matching “${q}”` : ""}
              </p>

              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {result.tests.map((test) => (
                  <li
                    key={test.id}
                    className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-card transition hover:border-green-200"
                  >
                    <span className="mb-3 self-start rounded-full bg-surface-blue px-2.5 py-1 text-[11px] font-semibold text-[#1a2b56]">
                      {test.category}
                    </span>

                    <Link
                      href={`/tests/${test.slug}`}
                      className="font-semibold leading-snug text-[#1a2b56] hover:text-[#5bc55e]"
                    >
                      {test.name}
                    </Link>

                    {test.reportingDay && (
                      <span className="mt-2 inline-flex items-center gap-1.5 text-xs text-slate-500">
                        <CalendarClock className="size-3.5 text-slate-400" />
                        {test.reportingDay}
                      </span>
                    )}

                    <div className="mt-auto pt-5">
                      <p
                        className={`mb-3 text-lg font-bold ${
                          test.rate === null ? "text-base text-slate-400" : "text-[#1a2b56]"
                        }`}
                      >
                        {formatRate(test.rate)}
                      </p>
                      <AddToCartButtons
                        test={{
                          id: test.id,
                          slug: test.slug,
                          name: test.name,
                          category: test.category,
                          rate: test.rate,
                        }}
                      />
                    </div>
                  </li>
                ))}
              </ul>

              <Pagination page={result.page} totalPages={result.totalPages} makeHref={makeHref} />
            </>
          )}

          <p className="mt-10 flex items-start gap-2 rounded-lg bg-slate-50 p-4 text-xs leading-relaxed text-slate-500">
            <FlaskConical className="mt-0.5 size-4 shrink-0 text-[#5bc55e]" />
            Rates are from the 2026 Test Zone Diagnostic Centre rate list and may change. Our team
            calls to confirm the current price and any sample requirements after you book.
          </p>
        </div>
      </section>
    </>
  );
}
