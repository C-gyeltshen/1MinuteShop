# Project Overview: coco_dev

## Purpose

`coco_dev` is a modern, full-stack e-commerce platform built with Next.js, React, TypeScript, and Supabase. It aims to provide a robust, customizable, and scalable solution for merchants to create and manage online stores, with features for authentication, product management, order processing, and analytics.

## Key Technologies

- **Frontend:** Next.js (App Router), React, Tailwind CSS, Framer Motion, GSAP, Shadcn/ui
- **Backend:** Supabase (Postgres, Auth, Functions), custom SQL, RESTful APIs
- **State Management:** Context API, custom hooks, and optionally Redux Toolkit
- **Other:** Stripe/Paypal integration, Docker, Slack integration (planned)

## Folder Structure

- `public/`: Static assets (icons, images, templates)
- `src/app/`: Main application code, including authentication, dashboard, store, and builder modules
- `src/components/`: UI components (buttons, modals, forms, etc.)
- `src/shared/`: Shared services and state stores
- `src/types/`: TypeScript types for merchants, products, orders, etc.
- `utils/superbase/`: Supabase client/server/middleware utilities
- `supabase/`: Database migrations, SQL functions, and configuration
- `docs/`: Documentation (API, deployment, architecture)
- `tests/`: Unit and integration tests

## Database Schema

- **Stores:** Merchants can create unique stores.
- **Users:** Authenticated users linked to stores.
- **Products:** Products with name, description, price, quantity, image, and store association.
- **Carts & Cart Items:** Shopping cart and items per user.
- **Orders:** Orders linked to users and carts, with payment info.
- **Triggers & Functions:** Automatic user creation and row-level security for users.

## Features Implemented

- User authentication (register, login, confirm)
- Store and product management (CRUD)
- Shopping cart and checkout flow
- Order management
- Admin dashboard (basic structure)
- Modular UI components (Navbar, Footer, Cards, etc.)
- Supabase integration for database and auth
- Initial database schema and migrations
- State management for auth, cart, and products

## Features In Progress / Planned

- Payment integration (Stripe, Paypal)
- Advanced analytics and reporting
- Storefront builder (drag-and-drop, templates)
- Customer management and order tracking
- Slack integration for notifications
- Theming and store customization
- API documentation and deployment guides

## Project Status (as of August 20, 2025)

- **Backend:** Core tables and relationships are set up. Auth triggers and RLS are enabled. Some SQL functions and migrations are present.
- **Frontend:** Main pages and layouts are scaffolded. Auth, product, and cart flows are partially implemented. UI components are modular and reusable.
- **Admin:** Dashboard and management pages are structured, with some components in place.
- **Testing:** Test setup exists, but coverage is likely incomplete.
- **Docs:** Basic documentation and folder structure are outlined.

## Next Steps

- Complete payment and order flows
- Finalize admin and builder features
- Expand test coverage
- Polish UI/UX and add theming
- Write deployment and API docs
- Integrate Slack and other external services
