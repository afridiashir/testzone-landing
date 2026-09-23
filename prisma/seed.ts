/**
 * Seeds the lab test catalogue from prisma/lab-tests.csv.
 *
 * Idempotent: re-running upserts by slug, so dropping in a newer rate-list
 * export and re-seeding updates prices in place rather than duplicating rows.
 * Tests no longer present in the CSV are removed, so the catalogue always
 * matches the source of truth.
 */
import { PrismaClient } from "@prisma/client";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const prisma = new PrismaClient();

// The package is ESM, so __dirname is not defined.
const CSV_PATH = join(dirname(fileURLToPath(import.meta.url)), "lab-tests.csv");

/** Minimal RFC-4180 parser — the rate list quotes any field containing a comma. */
function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    if (inQuotes) {
      if (char === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += char;
      }
      continue;
    }

    if (char === '"') inQuotes = true;
    else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else if (char !== "\r") {
      field += char;
    }
  }

  if (field !== "" || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

/**
 * Departments are DERIVED from the test name. The rate list's own "Test Type"
 * column reads "Test Zone Diagnostic Center" on every row, so it carries no
 * category information at all.
 *
 * Rules are checked top to bottom, first match wins — order matters, because
 * e.g. "Bronchial Washing For AFB C/S" is microbiology, not cytology.
 * `department` links to a slug in src/data/departments.ts where one exists.
 */
const CATEGORY_RULES: { category: string; department?: string; match: RegExp }[] = [
  // Explicit overrides first, where a keyword rule below would misfile a test.
  // Bone marrow is listed under Hematology in the TZDC company profile, but
  // would otherwise match the histopathology "biopsy" keyword.
  {
    category: "Hematology",
    department: "hematology",
    match: /\bbone marrow\b/i,
  },
  // "profile" is a strong immunology signal, but the lipid and metabolic
  // panels are routine chemistry.
  {
    category: "Routine Clinical Chemistry",
    match: /\b(lipid profile|metabolic panel|bone health screen)\b/i,
  },
  {
    category: "Radiology & Imaging",
    match: /\b(ultrasound|barium|x-?ray|ap\+lat|erect|with contrast|plain)\b/i,
  },
  {
    category: "Molecular Biology",
    department: "molecular-biology",
    match:
      /\b(pcr|genotyping|mutation|gene fusion|genexpert|quantiferon|hla|chromosome|bcr-abl|jak-2)\b/i,
  },
  {
    category: "Microbiology",
    department: "microbiology",
    match: /\b(c\/s|culture|gram stain|zn stain|z\.n|afb|fungus|fungal|sensitivity)\b/i,
  },
  {
    category: "Histopathology & Cytopathology",
    department: "histopathology-cytopathology",
    match:
      /\b(immunohistochemistry|immunocytochemistry|histopathology|cytology|pap smear|fnac|biopsy|er\/pr|pas stain|special stain|block for review|slide for review|ihc)\b/i,
  },
  {
    category: "Hematology",
    department: "hematology",
    match:
      /\b(cbc|blood complete|haemoglobin|hemoglobin|hba1c|platelet|esr|coagulation|prothrombin|aptt|factor [ivx]+|blood group|coombs|cross match|reticulocyte|peripheral blood film|bone marrow|dlc|wbc|rbc|sickling|g6\s?pd|g6pdh|fibrinogen|d-dimer|malarial|bleeding time|clotting time|iron stain|le cell)\b/i,
  },
  {
    category: "Special Clinical Chemistry & Immunology",
    department: "special-clinical-chemistry-immunology",
    match:
      /\b(anti|abs|antibod|antigen|elisa|igg|igm|iga|ige|hormone|testosterone|estradiol|progesterone|prolactin|cortisol|thyroid|tsh|ft3|ft4|t3|t4|insulin|ana|anca|psa|cea|ca-?\d|afp|ferritin|folate|vitamin|b12|tumor|marker|serology|profile|screening|hbs|hcv|hiv|hbe|dengue|torch|brucella|rubella|toxoplasma|syphilis|vdrl|tpha|crp|procalcitonin|troponin|bnp|allergy|immunoglobulin|complement|c3|c4|beta|dhea|acth|renin|aldosterone|parathyroid|growth hormone|amh|shgb|calcitonin|erythropoietin)\b/i,
  },
];

const FALLBACK_CATEGORY = "Routine Clinical Chemistry";
const FALLBACK_DEPARTMENT = undefined;

function categorise(name: string): { category: string; departmentSlug: string | null } {
  for (const rule of CATEGORY_RULES) {
    if (rule.match.test(name)) {
      return { category: rule.category, departmentSlug: rule.department ?? null };
    }
  }
  return { category: FALLBACK_CATEGORY, departmentSlug: FALLBACK_DEPARTMENT ?? null };
}

/** "Blood Group & Rh Factor ( At Test Zone Diagnostic Center )" -> "Blood Group & Rh Factor" */
function cleanName(raw: string): string {
  return raw
    .replace(/\(\s*At Test Zone Diagnostic Cent(er|re)\s*\)/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

function slugify(name: string): string {
  return (
    name
      .toLowerCase()
      .replace(/&/g, " and ")
      .replace(/\+/g, " plus ")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80)
      .replace(/-+$/g, "") || "test"
  );
}

async function main() {
  const rows = parseCsv(readFileSync(CSV_PATH, "utf-8"));
  const [header, ...body] = rows;
  if (!header) throw new Error("lab-tests.csv is empty");

  const col = (name: string) => header.findIndex((h) => h.trim() === name);
  const iName = col("Test Name");
  const iRate = col("Rate");
  const iDay = col("Reporting Day");
  if (iName === -1 || iRate === -1) {
    throw new Error(`lab-tests.csv is missing required columns. Found: ${header.join(", ")}`);
  }

  const seen = new Set<string>();
  const records = [];

  for (const row of body) {
    const sourceName = (row[iName] ?? "").trim();
    if (!sourceName) continue;

    const name = cleanName(sourceName);
    if (!name) continue;

    // Slugs must be unique; disambiguate the rare collision rather than
    // silently dropping a test.
    let slug = slugify(name);
    if (seen.has(slug)) {
      let n = 2;
      while (seen.has(`${slug}-${n}`)) n++;
      slug = `${slug}-${n}`;
    }
    seen.add(slug);

    const rawRate = Number.parseInt((row[iRate] ?? "").trim(), 10);
    // 0 in the rate list means "no price published", not "free".
    const rate = Number.isFinite(rawRate) && rawRate > 0 ? rawRate : null;

    const reportingDay = (row[iDay] ?? "").trim() || null;
    const { category, departmentSlug } = categorise(name);

    records.push({ slug, name, rate, category, departmentSlug, reportingDay, sourceName });
  }

  console.log(`Parsed ${records.length} tests from lab-tests.csv`);

  for (const record of records) {
    await prisma.labTest.upsert({
      where: { slug: record.slug },
      update: record,
      create: record,
    });
  }

  // Drop anything that has fallen out of the rate list.
  const removed = await prisma.labTest.deleteMany({
    where: { slug: { notIn: records.map((r) => r.slug) } },
  });

  const byCategory = await prisma.labTest.groupBy({
    by: ["category"],
    _count: { _all: true },
  });

  console.log(`Seeded ${records.length} tests, removed ${removed.count} stale`);
  for (const group of byCategory.sort((a, b) => b._count._all - a._count._all)) {
    console.log(`  ${String(group._count._all).padStart(4)}  ${group.category}`);
  }

  const noPrice = await prisma.labTest.count({ where: { rate: null } });
  console.log(`  ${String(noPrice).padStart(4)}  (no published price)`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
