# Impulse (Dune) — Next.js Clone (Homepage)

A Next.js 14 / App Router + Tailwind CSS recreation of the Shopify **Impulse** theme,
**Dune** preset homepage — content and images pulled from the live demo store
(`impulse-theme-fashion.myshopify.com`).

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Structure

- `app/layout.jsx` — root layout (announcement bar, header, footer wrap every page)
- `app/page.jsx` — homepage, assembles all sections in the same order as the live store
- `components/` — Header (mega-nav + mobile drawer), Hero, ProductCard, ProductGridSection,
  TextPromo, PromoGrid, JournalSection, Footer, AnnouncementBar
- `data/products.js` — product names/prices/images + nav structure captured from the live store.
  Swap this for a real Shopify Storefront API call whenever you're ready to go live.

## Design tokens

Colors (`tailwind.config.js`) are pulled straight from Dune's own product copy —
oat, sand, taupe, sage, camel, charcoal — since exact hex values aren't exposed
by the public theme listing page (it blocks scraping). Adjust `tailwind.config.js`
if you have the real theme's color swatches from the Shopify admin/customizer.

## Next steps

- Product detail page (`app/products/[handle]/page.jsx`)
- Collection/listing page (`app/collections/[handle]/page.jsx`)
- Cart drawer state (currently static markup in Header, no cart logic wired up)
- Connect `data/products.js` to Shopify's Storefront API for live inventory
