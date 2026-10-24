# KRIL · Kinikh Rural Indigenous Livelihood

Storefront for KRIL, a KINIKH Group enterprise: honey, cold-pressed oils,
handicrafts and village dairy from rural and indigenous producers.

Built with Next.js (App Router), React, TypeScript and Tailwind CSS.

## Getting started

Requires Node.js 20.9 or newer.

```sh
npm install
cp .env.example .env.local   # then set NEXT_PUBLIC_SITE_URL
npm run dev                  # http://localhost:3000
```

## Scripts

| Command             | What it does                                   |
| ------------------- | ---------------------------------------------- |
| `npm run dev`       | Start the dev server                           |
| `npm run build`     | Production build (all pages are pre-rendered)  |
| `npm run start`     | Serve the production build                     |
| `npm run lint`      | ESLint (Next.js core-web-vitals + TypeScript)  |
| `npm run typecheck` | TypeScript, no emit                            |
| `npm run test`      | Vitest unit tests                              |
| `npm run format`    | Prettier                                       |

## Environment

| Variable               | Required in production | Purpose                                                                   |
| ---------------------- | ---------------------- | ------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Yes                    | Public origin, e.g. `https://www.example.com`. Used for canonical links, Open Graph URLs, `robots.txt` and `sitemap.xml`. It is read at build time, so rebuild after changing it. |

## Deployment

The site is fully static apart from image optimisation, so it runs anywhere Next.js does:

- **Vercel**: import the repo and set `NEXT_PUBLIC_SITE_URL`.
- **Node server**: `npm ci && npm run build && npm run start` (set `PORT` to change the port).
- **Cloudflare Workers**: use the [OpenNext Cloudflare adapter](https://opennext.js.org/cloudflare).

## Project structure

```
src/
  app/           routes (App Router), metadata, sitemap, robots, error and 404 pages
  components/    site components; components/ui holds shadcn/ui primitives
  lib/           site settings, product catalog, cart, order message helpers
  assets/        images imported by components (optimised by next/image)
public/          favicons, Open Graph image, hero video
```

## Project notes

- Site settings (contacts, WhatsApp, `FISHERY_URL`, `heroSlides`) live in `src/lib/site.ts` and products in `src/lib/products.ts` — single editable sources.
- Cart state lives in `src/lib/cart.tsx` (context + localStorage read in `useEffect`) to stay SSR-safe.
- The home service gallery is isolated in `ShopByService` with scoped service CSS; posters and product previews are derived from the existing single sources to avoid catalog duplication.
- All catalog grids use `ProductCard` and `ProductSection` with scoped product CSS and the product `Button` variant so alignment and controls stay consistent; the all-products route uses the same catalog source.
- Page metadata goes through `pageMeta()` in `src/lib/metadata.ts`, which repeats the shared Open Graph fields (Next replaces rather than merges them per page).
- Old URLs `/fishery` and `/agro` permanently redirect (see `next.config.ts`).
