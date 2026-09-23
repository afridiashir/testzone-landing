import type { LabTest } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export type { LabTest };

/** Rates in the catalogue are Pakistani rupees. */
export function formatRate(rate: number | null): string {
  if (rate === null) return "Price on request";
  return `PKR ${rate.toLocaleString("en-PK")}`;
}

export async function getCategories(): Promise<{ category: string; count: number }[]> {
  const groups = await prisma.labTest.groupBy({
    by: ["category"],
    _count: { _all: true },
    orderBy: { category: "asc" },
  });
  return groups.map((g) => ({ category: g.category, count: g._count._all }));
}

export async function getTestCount(): Promise<number> {
  return prisma.labTest.count();
}

export async function getTestBySlug(slug: string): Promise<LabTest | null> {
  return prisma.labTest.findUnique({ where: { slug } });
}

export async function getAllTestSlugs(): Promise<string[]> {
  const tests = await prisma.labTest.findMany({ select: { slug: true } });
  return tests.map((t) => t.slug);
}

/** Other tests in the same category, for the detail page's "related" list. */
export async function getRelatedTests(test: LabTest, take = 8): Promise<LabTest[]> {
  return prisma.labTest.findMany({
    where: { category: test.category, NOT: { id: test.id } },
    orderBy: { name: "asc" },
    take,
  });
}

// Explicit `| undefined` because tsconfig sets exactOptionalPropertyTypes,
// and callers pass searchParams values straight through.
export type SearchTestsArgs = {
  query?: string | undefined;
  category?: string | undefined;
  page?: number | undefined;
  perPage?: number | undefined;
};

export type SearchTestsResult = {
  tests: LabTest[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
};

/**
 * The catalogue is ~700 rows, so it is paginated rather than shipped whole.
 * SQLite's `contains` is already case-insensitive for ASCII, and Prisma's
 * `mode: "insensitive"` is not supported on the SQLite connector.
 */
export async function searchTests({
  query,
  category,
  page = 1,
  perPage = 25,
}: SearchTestsArgs): Promise<SearchTestsResult> {
  const where = {
    ...(query ? { name: { contains: query } } : {}),
    ...(category ? { category } : {}),
  };

  const safePage = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;

  const [total, tests] = await Promise.all([
    prisma.labTest.count({ where }),
    prisma.labTest.findMany({
      where,
      orderBy: { name: "asc" },
      skip: (safePage - 1) * perPage,
      take: perPage,
    }),
  ]);

  return {
    tests,
    total,
    page: safePage,
    perPage,
    totalPages: Math.max(1, Math.ceil(total / perPage)),
  };
}
