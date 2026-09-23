// Client-safe formatting helpers. Kept apart from lab-tests.ts, which imports
// the Prisma client and so can only run on the server.

/** Rates in the catalogue are Pakistani rupees. */
export function formatRate(rate: number | null): string {
  if (rate === null) return "Price on request";
  return `PKR ${rate.toLocaleString("en-PK")}`;
}
