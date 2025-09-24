import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image_url: string;
  store_id: string;
  created_at: string;
  modified_at: string;
}

export interface Store {
  id: string;
  name: string;
  url: string;
  created_at: string;
  modified_at: string;
}

export class ProductService {
  // Get products by store URL/subdomain
  static async getProductsByStoreUrl(storeUrl: string): Promise<Product[]> {
    try {
      // First get the store
      const { data: store, error: storeError } = await supabase
        .from('stores')
        .select('id')
        .eq('url', storeUrl)
        .single();

      if (storeError || !store) {
        throw new Error('Store not found');
      }

      // Then get products for that store
      const { data: products, error: productsError } = await supabase
        .from('products')
        .select('*')
        .eq('store_id', store.id);

      if (productsError) {
        throw new Error(productsError.message);
      }

      return products || [];
    } catch (error) {
      throw error;
    }
  }

  // Get store by URL/subdomain
  static async getStoreByUrl(storeUrl: string): Promise<Store | null> {
    try {
      const { data: store, error } = await supabase
        .from('stores')
        .select('*')
        .eq('url', storeUrl)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return store;
    } catch (error) {
      return null;
    }
  }

  // Get products by store name (alternative method)
  static async getProductsByStoreName(storeName: string): Promise<Product[]> {
    try {
      // Join query to get products by store name
      const { data: products, error } = await supabase
        .from('products')
        .select(`
          *,
          stores!inner(name)
        `)
        .eq('stores.name', storeName);

      if (error) {
        throw new Error(error.message);
      }

      return products || [];
    } catch (error) {
      throw error;
    }
  }
}