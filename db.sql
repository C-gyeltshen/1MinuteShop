-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.cart_items (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  cart_id uuid NOT NULL,
  product_id uuid NOT NULL,
  quantity integer NOT NULL CHECK (quantity > 0),
  CONSTRAINT cart_items_pkey PRIMARY KEY (id),
  CONSTRAINT cart_items_cart_id_fkey FOREIGN KEY (cart_id) REFERENCES public.carts(id),
  CONSTRAINT cart_items_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id)
);
CREATE TABLE public.carts (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  user_email text NOT NULL,
  total_amount numeric NOT NULL,
  created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
  modified_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT carts_pkey PRIMARY KEY (id),
  CONSTRAINT carts_user_email_fkey FOREIGN KEY (user_email) REFERENCES public.users(email)
);
CREATE TABLE public.orders (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  user_email text NOT NULL,
  cart_id uuid NOT NULL,
  payment_screenshot text,
  created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
  modified_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT orders_pkey PRIMARY KEY (id),
  CONSTRAINT orders_user_email_fkey FOREIGN KEY (user_email) REFERENCES public.users(email),
  CONSTRAINT orders_cart_id_fkey FOREIGN KEY (cart_id) REFERENCES public.carts(id)
);
CREATE TABLE public.products (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  description text NOT NULL,
  price numeric NOT NULL,
  quantity integer NOT NULL,
  image_url text NOT NULL,
  created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
  modified_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
  store_name text NOT NULL,
  CONSTRAINT products_pkey PRIMARY KEY (id),
  CONSTRAINT products_store_name_fkey FOREIGN KEY (store_name) REFERENCES public.stores(domain_name)
);
CREATE TABLE public.stores (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  name text NOT NULL UNIQUE,
  created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
  modified_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
  url text NOT NULL UNIQUE,
  domain_name text NOT NULL UNIQUE,
  CONSTRAINT stores_pkey PRIMARY KEY (id)
);
CREATE TABLE public.users (
  id uuid NOT NULL,
  email text NOT NULL UNIQUE,
  store_id uuid,
  created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
  modified_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
  name text NOT NULL,
  CONSTRAINT users_pkey PRIMARY KEY (email),
  CONSTRAINT users_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id),
  CONSTRAINT users_store_id_fkey FOREIGN KEY (store_id) REFERENCES public.stores(id)
);