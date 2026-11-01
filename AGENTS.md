<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Commands

- `npm run dev` — dev server (Turbopack, default in Next 16).
- `npm run build` — production build.
- `npm run lint` — ESLint 9 flat config (`eslint.config.mjs`); runs bare `eslint` on the cwd.
- `npx tsc --noEmit` — typecheck; there is no `typecheck` script. Only run this after `next dev`/`next build` has run at least once: route prop types (`LayoutProps`, `PageProps`, used in `src/app/layout.tsx`) are generated into `.next/{dev/,}types/`, which is in `tsconfig.json` `include`, so tsc fails on a cold checkout.
- No tests and no CI exist in this repo.

## Framework gotchas

- `next.config.ts` enables `cacheComponents`, `partialPrefetching`, and `reactCompiler`. Consequences:
  - Dynamic/uncached data must be inside a `<Suspense>` boundary; cached data uses `"use cache"` — otherwise the build fails. See `node_modules/next/dist/docs/01-app/01-getting-started/08-caching.md`.
  - React Compiler handles memoization — do not add manual `useMemo`/`useCallback`/`memo` for render perf.
- App Router lives in `src/app`. This is a single-page app today (`src/app/page.tsx` is currently a blank placeholder); assets for upcoming UI are in `public/Images/`.

## Styling & components

- Tailwind **v4** with no `tailwind.config` file: theme tokens and CSS variables are defined in `src/app/globals.css` (`@theme inline`). Dark mode is class-based (`@custom-variant dark` → `.dark`).
- shadcn/ui with the `base-nova` style, built on `@base-ui/react` (not Radix) — component APIs may differ from familiar shadcn/Radix code. Add new components with `npx shadcn@latest add <name>`; existing ones are in `src/components/ui`. Alias config is in `components.json`; `@/*` maps to `src/*`.
- `globals.css` imports `tailwindcss`, `tw-animate-css`, and `shadcn/tailwind.css` — keep this import order when editing.
- Font: layout.tsx loads Josefin Sans into the variable `--font-geist-sans` (misleading inherited name — it is not Geist; keep the variable name, theme references it via `--font-sans`).
