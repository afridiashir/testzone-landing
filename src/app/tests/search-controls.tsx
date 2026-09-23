"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { Search, X } from "lucide-react";

/**
 * Search and category filter. State lives in the URL so results are
 * shareable, linkable and survive a refresh; the server component reads
 * the same params and does the querying.
 */
export function SearchControls({
  categories,
}: {
  categories: { category: string; count: number }[];
}) {
  const router = useRouter();
  const params = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const activeCategory = params.get("category") ?? "";
  const [value, setValue] = useState(params.get("q") ?? "");

  // Keep the box in step when the user navigates back or clears the filter.
  useEffect(() => {
    setValue(params.get("q") ?? "");
  }, [params]);

  function push(next: { q?: string; category?: string }) {
    const search = new URLSearchParams(params.toString());

    for (const [key, val] of Object.entries(next)) {
      if (val) search.set(key, val);
      else search.delete(key);
    }
    // Any new search or filter starts from the first page.
    search.delete("page");

    const qs = search.toString();
    startTransition(() => router.push(qs ? `/tests?${qs}` : "/tests", { scroll: false }));
  }

  // Debounce so a query runs once the user pauses, not on every keystroke.
  useEffect(() => {
    const current = params.get("q") ?? "";
    if (value === current) return;

    const timer = setTimeout(() => push({ q: value, category: activeCategory }), 300);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div className="mb-10">
      <div className="relative mb-5">
        <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search by test name, e.g. CBC, Vitamin D, HbA1c"
          aria-label="Search lab tests"
          className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-11 text-sm outline-none transition focus:border-[#5bc55e] focus:ring-2 focus:ring-green-100"
        />
        {value && (
          <button
            type="button"
            onClick={() => setValue("")}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => push({ q: value, category: "" })}
          className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition ${
            activeCategory === ""
              ? "border-[#1a2b56] bg-[#1a2b56] text-white"
              : "border-slate-200 bg-white text-slate-600 hover:border-green-200 hover:text-[#1a2b56]"
          }`}
        >
          All departments
        </button>
        {categories.map(({ category, count }) => (
          <button
            key={category}
            type="button"
            onClick={() =>
              push({ q: value, category: activeCategory === category ? "" : category })
            }
            className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition ${
              activeCategory === category
                ? "border-[#1a2b56] bg-[#1a2b56] text-white"
                : "border-slate-200 bg-white text-slate-600 hover:border-green-200 hover:text-[#1a2b56]"
            }`}
          >
            {category}
            <span className={activeCategory === category ? "text-white/60" : "text-slate-400"}>
              {" "}
              {count}
            </span>
          </button>
        ))}
      </div>

      {isPending && <p className="mt-4 text-xs text-slate-400">Searching…</p>}
    </div>
  );
}
