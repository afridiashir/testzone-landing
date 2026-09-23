# Test Zone Diagnostic Centre

Marketing site for Test Zone Diagnostic Centre (TZDC) — Precision in Health.

## Stack

- [Next.js 15](https://nextjs.org) (App Router, React 19)
- [Prisma 6](https://www.prisma.io) with SQLite (lab test catalogue)
- Tailwind CSS v4 via `@tailwindcss/postcss`
- shadcn/ui + Radix primitives
- TypeScript

## Development

You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
npm install
cp .env.example .env
npm run db:push   # create the SQLite database
npm run db:seed   # load the lab test catalogue from the rate list
npm run dev       # http://localhost:3000
```

| Script              | Does                                       |
| ------------------- | ------------------------------------------ |
| `npm run dev`       | Dev server with hot reload                 |
| `npm run build`     | Production build                           |
| `npm start`         | Serve the production build                 |
| `npm run lint`      | ESLint (Next core-web-vitals + Prettier)   |
| `npm run format`    | Prettier write                             |
| `npm run db:push`   | Apply the Prisma schema to the database    |
| `npm run db:seed`   | Seed lab tests from `prisma/lab-tests.csv` |
| `npm run db:reset`  | Drop, recreate and re-seed                 |
| `npm run db:studio` | Browse the database in Prisma Studio       |

## Structure

```
prisma/
  schema.prisma         LabTest model
  lab-tests.csv         Rate list — the seed's source of truth
  seed.ts               CSV -> database
src/
  app/                  App Router — one folder per route
    departments/[slug]/ Department detail pages (prerendered)
    tests/              Test directory (search, filter, paginate)
    tests/[slug]/       Test detail pages
  components/site/      Header, Footer, page sections
  components/ui/        shadcn/ui primitives
  data/                 Site content as typed data
  lib/                  Prisma client and test queries
public/assets/          Images
```

## Lab test catalogue

The ~720 tests on `/tests` live in the database, seeded from
`prisma/lab-tests.csv`. To update prices, replace that file with a fresh rate
list export (same `Test Name,Rate,Test Type,Reporting Day` columns) and run
`npm run db:seed`. The seed upserts by slug, so prices update in place and
tests dropped from the list are removed.

Two things the seed derives, because the rate list does not supply them:

- **Department** — the list's own "Test Type" column reads "Test Zone
  Diagnostic Center" on every row, so categories come from keyword rules in
  `prisma/seed.ts`. Those rules are worth reviewing against how TZDC actually
  organises its departments.
- **Price on request** — a rate of `0` is stored as null and displayed as
  "Price on request", never "PKR 0".

SQLite needs no setup and the database file is gitignored. For a hosted
database, change `provider` in `prisma/schema.prisma` to `postgresql` and
point `DATABASE_URL` at your server; no model changes are needed.

Content lives in `src/data/` rather than being inlined in components:

- `departments.ts` — department pages, transcribed from the TZDC Company
  Profile 2025. Adding an entry creates its page, its card on `/departments`
  and its entry in the nav dropdown.
- `vaccines.ts` — vaccination list. Empty by default, which makes
  `/vaccination` render an enquiry state instead of an unverified list.
- `contact.ts` — phone, WhatsApp, email and address. Single source of truth.

## History

This project was started with [Lovable](https://lovable.dev) on TanStack Start
and was later migrated to Next.js. The Lovable editor integration depended on
`@lovable.dev/vite-tanstack-config` and does not carry over.
