# KRIL · Kinikh Rural Indigenous Livelihood

Storefront for KRIL, a KINIKH Group enterprise: honey, cold-pressed oils,
handicrafts and village dairy from rural and indigenous producers.

## Development

You need Node.js and npm.

```sh
npm install
npm run dev      # http://localhost:8080
npm run build    # production build (Cloudflare Workers via nitro)
npm run preview
```

## Project notes

- Site settings (contacts, WhatsApp, `FISHERY_URL`, `heroSlides`) live in `src/lib/site.ts` and products in `src/lib/products.ts` — single editable sources.
- Cart state lives in `src/lib/cart.tsx` (context + localStorage read in `useEffect`) to stay SSR-safe.
- The home service gallery is isolated in `ShopByService` with scoped service CSS; posters and product previews are derived from the existing single sources to avoid catalog duplication.
- All catalog grids use `ProductCard` and `ProductSection` with scoped product CSS and the product `Button` variant so alignment and controls stay consistent; the all-products route uses the same catalog source.

## Built with

- TanStack Start
- TypeScript
- React
- Tailwind CSS
