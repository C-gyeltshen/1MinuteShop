import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(
  request: Request,
  { params }: { params: { subdomain: string } }
) {
  try {
    const { subdomain } = params;

    console.log("sub domain name :", subdomain)

    // First get the store by URL/subdomain
    const { data: store, error: storeError } = await supabase
      .from('stores')
      .select('id')
      .eq('domain_name', subdomain)
      .single();

    if (storeError || !store) {
      return NextResponse.json({ error: 'Store not found' }, { status: 404 });
    }

    // Then get products for that store
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('*')
      .eq('store_name', subdomain);

    if (productsError) {
      return NextResponse.json({ error: productsError.message }, { status: 500 });
    }

    return NextResponse.json(products);

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}