# Folder Structure

```plaintext
coco_dev/
├── 📁 public/
│   ├── icons/
│   │   ├── cart.svg
│   │   ├── user.svg
│   │   ├── search.svg
│   │   └── wishlist.svg
│   ├── images/
│   │   ├── logos/
│   │   ├── products/
│   │   └── placeholders/
│   └── templates/
│       ├── themes/
│       └── layouts/
│
├── 📁 src/
│   ├── 📁 app/ (App Router)
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── register/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   │
│   │   ├── (dashboard)/
│   │   │   ├── admin/
│   │   │   │   ├── analytics/
│   │   │   │   ├── orders/
│   │   │   │   ├── products/
│   │   │   │   ├── customers/
│   │   │   │   ├── settings/
│   │   │   │   └── layout.tsx
│   │   │   │
│   │   │   └── builder/
│   │   │       ├── templates/
│   │   │       ├── customize/
│   │   │       ├── preview/
│   │   │       └── publish/
│   │   │
│   │   ├── (store)/
│   │   │   ├── [storeName]/
│   │   │   │   ├── products/
│   │   │   │   │   └── [slug]/
│   │   │   │   ├── categories/
│   │   │   │   │   └── [category]/
│   │   │   │   ├── cart/
│   │   │   │   ├── checkout/
│   │   │   │   ├── profile/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   │
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   └── route.ts
│   │   │   ├── products/
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]/
│   │   │   │       └── route.ts
│   │   │   ├── orders/
│   │   │   │   └── route.ts
│   │   │   ├── stores/
│   │   │   │   └── route.ts
│   │   │   ├── payments/
│   │   │   │   ├── stripe/
│   │   │   │   └── paypal/
│   │   │   └── webhooks/
│   │   │       ├── stripe/
│   │   │       └── supabase/
│   │   │
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── 📁 components/
│   │   ├── ui/ (Shadcn/ui components)
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── modal.tsx
│   │   │   ├── dropdown.tsx
│   │   │   └── ...
│   │   │
│   │   ├── auth/
│   │   │   ├── LoginForm.tsx
│   │   │   ├── RegisterForm.tsx
│   │   │   └── AuthGuard.tsx
│   │   │
│   │   ├── builder/
│   │   │   ├── DragAndDrop/
│   │   │   │   ├── DragContainer.tsx
│   │   │   │   ├── DropZone.tsx
│   │   │   │   └── DraggableItem.tsx
│   │   │   ├── TemplateSelector.tsx
│   │   │   ├── ComponentLibrary.tsx
│   │   │   ├── StyleEditor.tsx
│   │   │   ├── PreviewMode.tsx
│   │   │   └── PublishDialog.tsx
│   │   │
│   │   ├── store/
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductGrid.tsx
│   │   │   ├── ShoppingCart.tsx
│   │   │   ├── Checkout/
│   │   │   │   ├── CheckoutForm.tsx
│   │   │   │   ├── PaymentMethods.tsx
│   │   │   │   └── OrderSummary.tsx
│   │   │   ├── Navigation/
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── Footer.tsx
│   │   │   │   └── Sidebar.tsx
│   │   │   └── Search/
│   │   │       ├── SearchBar.tsx
│   │   │       ├── Filters.tsx
│   │   │       └── Results.tsx
│   │   │
│   │   ├── admin/
│   │   │   ├── Dashboard/
│   │   │   │   ├── Analytics.tsx
│   │   │   │   ├── RecentOrders.tsx
│   │   │   │   └── QuickStats.tsx
│   │   │   ├── ProductManagement/
│   │   │   │   ├── ProductForm.tsx
│   │   │   │   ├── ProductList.tsx
│   │   │   │   ├── InventoryTracker.tsx
│   │   │   │   └── BulkActions.tsx
│   │   │   ├── OrderManagement/
│   │   │   │   ├── OrderList.tsx
│   │   │   │   ├── OrderDetails.tsx
│   │   │   │   └── OrderStatus.tsx
│   │   │   └── CustomerManagement/
│   │   │       ├── CustomerList.tsx
│   │   │       └── CustomerDetails.tsx
│   │   │
│   │   └── common/
│   │       ├── Layout.tsx
│   │       ├── Loading.tsx
│   │       ├── ErrorBoundary.tsx
│   │       ├── SEO.tsx
│   │       └── Breadcrumbs.tsx
│   │
│   ├── 📁 lib/
│   │   ├── supabase/
│   │   │   ├── client.ts
│   │   │   ├── server.ts
│   │   │   ├── middleware.ts
│   │   │   └── types.ts
│   │   ├── auth/
│   │   │   ├── config.ts
│   │   │   ├── providers.ts
│   │   │   └── session.ts
│   │   ├── payments/
│   │   │   ├── stripe.ts
│   │   │   ├── paypal.ts
│   │   │   └── types.ts
│   │   ├── utils/
│   │   │   ├── validation.ts
│   │   │   ├── formatting.ts
│   │   │   ├── constants.ts
│   │   │   └── helpers.ts
│   │   ├── database/
│   │   │   ├── queries.ts
│   │   │   ├── mutations.ts
│   │   │   └── migrations/
│   │   └── store/
│   │       ├── cart.ts
│   │       ├── wishlist.ts
│   │       └── theme.ts
│   │
│   ├── 📁 hooks/
│   │   ├── useAuth.ts
│   │   ├── useCart.ts
│   │   ├── useProducts.ts
│   │   ├── useOrders.ts
│   │   ├── useStore.ts
│   │   ├── useBuilder.ts
│   │   ├── useSupabase.ts
│   │   └── useLocalStorage.ts
│   │
│   ├── 📁 store/ (State Management)
│   │   ├── providers/
│   │   │   ├── AuthProvider.tsx
│   │   │   ├── CartProvider.tsx
│   │   │   ├── ThemeProvider.tsx
│   │   │   └── StoreProvider.tsx
│   │   ├── slices/ (if using Redux Toolkit)
│   │   │   ├── authSlice.ts
│   │   │   ├── cartSlice.ts
│   │   │   ├── productSlice.ts
│   │   │   └── builderSlice.ts
│   │   └── index.ts
│   │
│   ├── 📁 types/
│   │   ├── auth.ts
│   │   ├── product.ts
│   │   ├── order.ts
│   │   ├── store.ts
│   │   ├── builder.ts
│   │   ├── payment.ts
│   │   └── database.ts
│   │
│   └── 📁 styles/
│       ├── components/
│       ├── themes/
│       │   ├── default.css
│       │   ├── modern.css
│       │   └── classic.css
│       └── globals.css
│
├── 📁 supabase/
│   ├── migrations/
│   │   ├── 001_initial_schema.sql
│   │   ├── 002_products_table.sql
│   │   ├── 003_orders_table.sql
│   │   ├── 004_stores_table.sql
│   │   └── 005_templates_table.sql
│   ├── functions/
│   │   ├── create-store.sql
│   │   ├── process-order.sql
│   │   └── analytics.sql
│   ├── seed.sql
│   └── config.toml
│
├── 📁 docs/
│   ├── API.md
│   ├── DEPLOYMENT.md
│   ├── CONTRIBUTING.md
│   └── ARCHITECTURE.md
│
├── 📁 tests/
│   ├── __mocks__/
│   ├── components/
│   ├── pages/
│   ├── api/
│   ├── utils/
│   └── setup.ts
│
├── .env.local
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.ts
├── README.md
└── docker-compose.yml
```

CREATE TABLE stores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    -- url TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

create table public.users (
  id uuid not null references auth.users on delete cascade,
  email TEXT NOT NULL UNIQUE,
  store_id UUID REFERENCES stores(id),
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  modified_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  primary key (id)
);
alter table public.users enable row level security;


create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;


create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

ALTER TABLE public.users
ADD name TEXT NOT NULL;




db password : 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



conecting to slack 