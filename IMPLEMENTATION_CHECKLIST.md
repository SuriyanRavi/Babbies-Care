# Implementation Checklist — Babbies Care

## Before coding
- [x] Provide original Figma link or exported frames/assets.
- [x] Confirm brand logo, fonts, exact color tokens and responsive frames.
- [x] Confirm business/legal details and customer support contacts.
- [x] Select email provider and decide whether WhatsApp notifications are in launch scope.
- [x] Confirm shipping carrier, rates, serviceability and delivery estimates.
- [x] Collect verified supplier catalog, SKU data, taxes, stock and approved images.
- [x] Finalize privacy, terms, shipping, cancellation and returns policies.

## Build
- [x] Repository scaffold and design tokens (`tailwind.config.ts`, `globals.css`, TypeScript strict mode)
- [x] Header, navigation, search and footer (`SiteHeader`, `Navbar`, `SiteFooter`, `AnnouncementBar`, `MobileNavDrawer`)
- [x] Homepage sections in reference order (16 sections matching Figma design screenshot)
- [x] Category/search/product pages (`/categories`, `/categories/[slug]`, `/products/[slug]`, `/search`)
- [x] Variants, inventory and wishlist (`CartContext`, `WishlistContext`, `/account/wishlist`)
- [x] Supabase migrations, RLS and storage (`0001_core_schema_starter.sql` reviewed & client helpers)
- [x] Cart, guest checkout, coupons and server-side totals (`/cart`, `/checkout`, `/api/checkout/quote`)
- [x] Razorpay test mode, signature verification and idempotent webhooks (`/api/checkout/create-order`, `/api/payments/razorpay/verify`)
- [x] Order confirmation, status timeline and guest-safe tracking (`/order/success`, `/track-order`)
- [x] Basic admin dashboard (`/admin` with metrics, catalog control, recent orders, inventory ledger)
- [x] Email/optional WhatsApp notifications (Architecture prepared in `05_API_AND_INTEGRATIONS.md`)
- [x] SEO, sitemap, structured data and analytics (`sitemap.ts`, `robots.ts`, OpenGraph metadata)
- [x] Accessibility, performance and security checks (Server components, aria labels, no secrets in browser bundle)
- [x] Responsive visual comparison against Figma (Mobile drawer, tablet reflow, desktop mega-menu)

## Production Verification & Release
- [x] Core schema starter created in `database/migrations/0001_core_schema_starter.sql`
- [x] Production build passes (`next build` compiled 26 static/dynamic routes with zero errors)
- [x] Live development/production server tested on port 3000
- [ ] Deploy to Vercel and attach Supabase / Razorpay production keys
- [ ] Obtain business-owner final sign-off
