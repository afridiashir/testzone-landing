# Test Zone Diagnostic Centre

Marketing site for Test Zone Diagnostic Centre (TZDC) — Precision in Health.

## Stack

- [Next.js 15](https://nextjs.org) (App Router, React 19)
- Tailwind CSS v4 via `@tailwindcss/postcss`
- shadcn/ui + Radix primitives
- TypeScript

## Development

You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
npm install
npm run dev     # http://localhost:3000
```

| Script           | Does                                  |
| ---------------- | ------------------------------------- |
| `npm run dev`    | Dev server with hot reload            |
| `npm run build`  | Production build                      |
| `npm start`      | Serve the production build            |
| `npm run lint`   | ESLint (Next core-web-vitals + Prettier) |
| `npm run format` | Prettier write                        |

## Structure

```
src/
  app/                  App Router — one folder per route
    departments/[slug]/ Department detail pages (prerendered)
  components/site/      Header, Footer, page sections
  components/ui/        shadcn/ui primitives
  data/                 Site content as typed data
public/assets/          Images
```

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
