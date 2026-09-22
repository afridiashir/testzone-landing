// Vaccination service content for Test Zone Diagnostic Centre.
//
// The TZDC Company Profile 2025 publishes NO vaccination content, so nothing
// here is transcribed from it and nothing has been invented. Fill `vaccines`
// in with TZDC's real list and the /vaccination page renders it automatically —
// while the array is empty the page shows an enquiry state instead of an
// unverified vaccine list.

export type Vaccine = {
  /** Trade or common name, e.g. "Meningococcal ACWY". */
  name: string;
  /** Optional alternate name shown in smaller text under the name. */
  alsoKnownAs?: string;
  /** Grouping used as a section heading, e.g. "Travel", "Childhood", "Adult". */
  category: string;
  /** Who it is for, e.g. "Hajj & Umrah pilgrims, travellers to the Gulf". */
  forWhom?: string;
  /** Dosing schedule, e.g. "Single dose, at least 10 days before travel". */
  schedule?: string;
  /** Anything else worth stating — validity period, certificate issued, etc. */
  notes?: string;
};

/**
 * Populated by TZDC. Add entries and the page builds its own category sections
 * from the `category` field — no page edits needed.
 */
export const vaccines: Vaccine[] = [];

/** Category order on the page. Any category not listed here is appended. */
export const categoryOrder: string[] = ["Travel", "Childhood", "Adult", "Occupational"];

export function vaccinesByCategory(): { category: string; items: Vaccine[] }[] {
  const seen = new Map<string, Vaccine[]>();

  for (const vaccine of vaccines) {
    const bucket = seen.get(vaccine.category);
    if (bucket) bucket.push(vaccine);
    else seen.set(vaccine.category, [vaccine]);
  }

  return [...seen.entries()]
    .sort(([a], [b]) => {
      const ai = categoryOrder.indexOf(a);
      const bi = categoryOrder.indexOf(b);
      // Unlisted categories sort after listed ones, then alphabetically.
      if (ai === -1 && bi === -1) return a.localeCompare(b);
      if (ai === -1) return 1;
      if (bi === -1) return -1;
      return ai - bi;
    })
    .map(([category, items]) => ({ category, items }));
}
