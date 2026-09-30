# coco_dev

A multi-tenant e-commerce platform built with Next.js and Supabase. Store owners sign up, get a subdomain-based storefront, and manage products/orders from a dashboard — customers shop the storefront and check out directly.

> **Note:** this README describes the actual Next.js/Supabase application in this repo. An earlier version of this file described an unrelated Python "COCO dataset" toolkit — that content did not match the codebase and has been replaced.

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [How Subdomain Routing Works](#how-subdomain-routing-works)
- [Database Schema](#database-schema)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Contributing](#contributing)

## Overview

The app has three main surfaces:

1. **Marketing/landing site** — public homepage explaining the product, pricing, and how it works.
2. **Store owner dashboard** — authenticated area where a merchant manages products, orders, and store settings.
3. **Per-store storefront** — a customer-facing shop rendered dynamically based on the store's subdomain (e.g. `mystore.example.com`), including product browsing, cart, and a multi-step checkout.

## Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org) (App Router, Turbopack dev server)
- **UI:** React 19, Tailwind CSS v4, MUI, Radix UI primitives, Framer Motion, GSAP
- **Backend/Auth/DB:** [Supabase](https://supabase.com) (`@supabase/ssr`, `@supabase/supabase-js`) backed by Postgres
- **Language:** TypeScript
- **Data fetching:** SWR
- **Other:** `qrcode.react` (QR codes), `tsparticles` (landing page effects), `js-cookie`

## Features

- **Landing page** — hero, features, pricing, "how it works," and domain/subdomain sections (`src/app/(admin)`).
- **Auth** — login/register flows backed by Supabase Auth (`src/app/(auth)`, `src/app/shared/services/authServices.ts`).
- **Store owner dashboard** (`src/app/store/dashboard`) — dark glassmorphism UI with:
  - Products view (list, add, edit)
  - Orders view with status/payment updates and an order detail drawer
  - Live KPI/stats cards driven by real order data
  - Global search across products and orders
  - Settings (dashboard appearance, storefront theme, store profile, commerce settings)
- **Per-store storefront** (`src/app/store/[subdomain]`) — dynamically rendered per tenant:
  - Product listing, About Us, Contact Us pages
  - Cart drawer + cart context (`context/Cartcontext .tsx`)
  - Multi-step checkout (shipping info → payment → order summary) with a success page
- **Subdomain-based multi-tenancy** — middleware detects the request subdomain, verifies the store exists, and rewrites the request to the correct store route.

## Project Structure

```
src/
├── app/
│   ├── (admin)/            # Public marketing/landing site + admin-facing pages
│   │   ├── components/     # Hero, Features, Pricing, Navbar, Footer, etc.
│   │   ├── dashboard/       # (admin) dashboard entry
│   │   └── data/            # Static landing page content
│   ├── (auth)/             # Login/Register pages + auth-specific UI
│   ├── shared/
│   │   ├── components/      # Shared components (e.g. StoreOwnerProfile)
│   │   ├── services/         # authServices.ts, productServices.ts
│   │   └── store/             # Client-side auth store (authStore.tsx)
│   ├── store/
│   │   ├── [subdomain]/     # Dynamic per-tenant storefront
│   │   │   ├── components/   # NavBar, HeroSection, ProductSection, Checkout steps, Cart drawer, etc.
│   │   │   ├── context/       # Cart context/provider
│   │   │   ├── layout/         # StoreLayout
│   │   │   ├── helper/          # storeHelper.tsx
│   │   │   ├── checkout/         # Checkout page + layout
│   │   │   ├── success/           # Order success page
│   │   │   ├── aboutUs/            # About Us page
│   │   │   └── contactUs/           # Contact Us page
│   │   ├── dashboard/        # Store owner dashboard
│   │   │   ├── components/    # Sidebar, Header, ProductsView, OrdersView, SettingsView, cards, etc.
│   │   │   └── hooks/          # UseProducts, Useorders
│   │   └── success/          # Global success page
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Root page (landing)
└── middleware.ts            # Subdomain detection + rewrite logic

utils/superbase/             # Supabase client helpers (browser/server/admin/middleware)
db.sql                       # Reference Postgres schema (Supabase)
```

## How Subdomain Routing Works

`src/middleware.ts` inspects the incoming `Host` header on every request:

1. If the hostname has a subdomain other than `www`, it extracts that subdomain (e.g. `mystore` from `mystore.example.com`).
2. It calls a backend endpoint (`POST {NEXT_PUBLIC_API_URL}/stores/check-subdomain`) to verify the store exists.
3. If the store exists, the request is rewritten to `/store/{subdomain}{pathname}`, which resolves to the dynamic route in `src/app/store/[subdomain]`.
4. If the store doesn't exist (or the hostname has no subdomain), the request falls through to the normal route (landing page, dashboard, auth, etc.).

## Database Schema

`db.sql` contains a reference Postgres schema (for context only, not meant to be run directly) with the following tables:

- `stores` — tenant stores, keyed by unique `domain_name`/`url`
- `users` — app users linked to `auth.users` and optionally a `store_id`
- `products` — per-store product catalog (`store_name` references `stores.domain_name`)
- `carts` / `cart_items` — shopping cart and line items
- `orders` — orders linked to a cart and user, with payment screenshot support

## Getting Started

**Prerequisites:** Node.js 18+, a Supabase project, and a Postgres database matching `db.sql`.

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy the environment variables below into `.env.local` and fill in your own values.
3. Run the dev server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000).

To test subdomain routing locally, add entries to your hosts file (e.g. `mystore.localhost`) or use a tool like `ngrok`/`localtest.me`, and ensure `NEXT_PUBLIC_API_URL` points at a backend that implements `/stores/check-subdomain`.

## Environment Variables

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key (client-side) |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-side only — keep secret) |
| `NEXT_PUBLIC_API_URL` | Backend API base URL used by middleware for subdomain checks |
| `LOCAL_BE_URL` | Local backend URL override for development |
| `NODE_ENV` | Standard Node environment flag |

Never commit real `.env`/`.env.local` values — these files are already covered by `.gitignore` conventions, but double-check before pushing.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Next.js dev server (Turbopack) |
| `npm run build` | Build for production |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |
| `npm run generate-dummy-data` | Seed dummy data via `scripts/generateDummyData.mjs` (uses `.env.local`) — script referenced in `package.json`; add it under `scripts/` if missing |

## Contributing

1. Create a feature branch from `main`.
2. Make your changes and verify `npm run lint` and `npm run build` pass.
3. Open a pull request describing the change.
