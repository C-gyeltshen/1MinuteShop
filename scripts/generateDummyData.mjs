import { faker } from "@faker-js/faker";
import { createClient } from "@supabase/supabase-js";

// Create a direct Supabase client for script usage
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // Use service role key for admin operations
);

// Helper function to sanitize store URLs
function sanitizeStoreUrl(storeName) {
  return storeName
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^a-z0-9-]/g, "") // Remove special characters except hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, ""); // Remove leading/trailing hyphens
}

// Helper function to generate random product categories
const productCategories = [
  "Electronics",
  "Clothing",
  "Books",
  "Home & Garden",
  "Sports",
  "Beauty",
  "Toys",
  "Automotive",
  "Food",
  "Health",
];

async function generateDummyData() {
  try {
    console.log("Starting dummy data generation...");

    // First, let's clear existing data (optional - you can comment this out if you want to keep existing data)
    console.log("Getting existing data...");

    // Get existing users from the users table
    const { data: existingUsers, error: getUsersError } = await supabase
      .from("users")
      .select("*");

    if (getUsersError) {
      console.error("Error getting existing users:", getUsersError);
    }

    console.log(`Found ${existingUsers?.length || 0} existing users`);

    // Step 1: Create Auth Users first (only if we don't have enough)
    const authUsers = [];
    const userEmails = [];
    const targetAuthUsers = 50;
    const usersToCreate = Math.max(
      0,
      targetAuthUsers - (existingUsers?.length || 0)
    );

    console.log(`Creating ${usersToCreate} new auth users...`);

    for (let i = 0; i < usersToCreate; i++) {
      const email = faker.internet.email().toLowerCase();
      const password = "password123"; // Simple password for dummy data
      const fullName = faker.person.fullName();

      const { data: authData, error: authError } =
        await supabase.auth.admin.createUser({
          email,
          password,
          email_confirm: true,
          user_metadata: {
            full_name: fullName,
          },
        });

      if (authError) {
        console.error("Error creating auth user:", authError);
        continue;
      }

      authUsers.push(authData.user);
      userEmails.push(email);
      console.log(`Created auth user ${i + 1}/${usersToCreate}: ${email}`);
    }

    // Step 2: Create Stores (check for existing stores first)
    console.log("Creating stores...");
    const { data: existingStores, error: getStoresError } = await supabase
      .from("stores")
      .select("*");

    const stores = existingStores || [];
    const targetStores = 20;
    const storesToCreate = Math.max(0, targetStores - stores.length);

    console.log(
      `Found ${stores.length} existing stores, creating ${storesToCreate} new ones...`
    );

    for (let i = 0; i < storesToCreate; i++) {
      let attempts = 0;
      let storeCreated = false;

      while (attempts < 5 && !storeCreated) {
        const storeName = faker.company.name();
        const sanitizedName = sanitizeStoreUrl(storeName);

        const storeData = {
          name: storeName,
          url: `https://${sanitizedName}.laso.la`,
        };

        const { data, error } = await supabase
          .from("stores")
          .insert(storeData)
          .select()
          .single();

        if (error) {
          if (error.code === "23505") {
            // Duplicate key error
            attempts++;
            console.log(
              `Store name conflict, retrying... (attempt ${attempts})`
            );
            continue;
          } else {
            console.error("Error creating store:", error);
            break;
          }
        }

        stores.push(data);
        storeCreated = true;
        console.log(
          `Created store ${stores.length}/${targetStores}: ${storeName}`
        );
      }
    }

    console.log(`Final store count: ${stores.length} stores available`);

    // Step 3: Create Users (profiles) and link some to stores
    console.log("Creating user profiles...");
    console.log(`Auth users available: ${authUsers.length}`);
    console.log(`Existing users found: ${existingUsers?.length || 0}`);

    let users = [...(existingUsers || [])]; // Start with existing users

    // First, let's get the current users from the database since they might have been created by triggers
    const { data: currentUsers, error: getCurrentUsersError } = await supabase
      .from("users")
      .select("*");

    if (getCurrentUsersError) {
      console.error("Error getting current users:", getCurrentUsersError);
    } else {
      users = currentUsers || [];
      console.log(`Current users in database: ${users.length}`);
    }

    // Update existing users that don't have store_id assigned
    if (stores.length > 0) {
      const usersWithoutStores = users.filter((user) => !user.store_id);
      console.log(`Users without store_id: ${usersWithoutStores.length}`);

      for (let i = 0; i < usersWithoutStores.length; i++) {
        const user = usersWithoutStores[i];
        const storeIndex = i % stores.length; // Distribute stores among users
        const storeId = stores[storeIndex]?.id;

        const { data, error } = await supabase
          .from("users")
          .update({ store_id: storeId })
          .eq("email", user.email)
          .select()
          .single();

        if (error) {
          console.error(
            `Error updating user ${user.email} with store_id:`,
            error
          );
          continue;
        }

        console.log(`Updated user ${user.email} with store_id: ${storeId}`);

        // Update our local users array
        const userIndex = users.findIndex((u) => u.email === user.email);
        if (userIndex !== -1) {
          users[userIndex] = data;
        }
      }
    }

    // For any remaining auth users that don't have profiles, create them
    for (let i = 0; i < authUsers.length; i++) {
      const authUser = authUsers[i];

      // Check if user already exists in our users array
      const existingUser = users.find((u) => u.email === authUser.email);
      if (existingUser) {
        console.log(`User ${authUser.email} already exists in database`);
        continue;
      }

      let storeId = null;

      // Only assign store if stores are available
      if (stores.length > 0) {
        const storeIndex = users.length % stores.length; // Distribute stores among users
        storeId = stores[storeIndex]?.id || null;
      }

      const userData = {
        id: authUser.id,
        email: authUser.email,
        name: authUser.user_metadata.full_name,
        store_id: storeId,
      };

      const { data, error } = await supabase
        .from("users")
        .insert(userData)
        .select()
        .single();

      if (error) {
        if (error.code === "23505") {
          // Duplicate key error
          console.log(`User ${authUser.email} already exists, skipping...`);
          continue;
        } else {
          console.error("Error creating user profile:", error);
          continue;
        }
      }

      users.push(data);
      console.log(`Created user profile ${users.length}: ${authUser.email}`);
    }

    // If we still don't have enough users, we'll work with what we have
    if (users.length === 0) {
      console.error("No users available to create other data");
      return;
    }

    // Step 4: Create Products (check existing first)
    console.log("Creating products...");

    const { data: existingProducts, error: getProductsError } = await supabase
      .from("products")
      .select("*");

    let products = existingProducts || [];
    const targetProducts = 100;

    // Check if we have stores available
    if (stores.length === 0) {
      console.log("No stores available, skipping new product creation...");
    } else {
      const productsToCreate = Math.max(0, targetProducts - products.length);

      console.log(
        `Found ${products.length} existing products, creating ${productsToCreate} new ones...`
      );

      for (let i = 0; i < productsToCreate; i++) {
        const store = stores[Math.floor(Math.random() * stores.length)];
        const category =
          productCategories[
            Math.floor(Math.random() * productCategories.length)
          ];

        const productData = {
          name: `${category} - ${faker.commerce.productName()}`,
          description: faker.commerce.productDescription(),
          price: parseFloat(faker.commerce.price({ min: 10, max: 1000 })),
          quantity: faker.number.int({ min: 0, max: 100 }),
          image_url: faker.image.url({ width: 400, height: 400 }),
          store_id: store.id,
        };

        const { data, error } = await supabase
          .from("products")
          .insert(productData)
          .select()
          .single();

        if (error) {
          console.error("Error creating product:", error);
          continue;
        }

        products.push(data);
        console.log(
          `Created product ${products.length}/${targetProducts}: ${productData.name}`
        );
      }
    }

    // Step 5: Create Carts
    console.log("Creating carts...");
    const { data: existingCarts, error: getCartsError } = await supabase
      .from("carts")
      .select("*");

    const carts = existingCarts || [];
    const targetCarts = 30;
    const cartsToCreate = Math.max(0, targetCarts - carts.length);

    console.log(
      `Found ${carts.length} existing carts, creating ${cartsToCreate} new ones...`
    );

    for (let i = 0; i < cartsToCreate; i++) {
      const user = users[Math.floor(Math.random() * users.length)];

      const cartData = {
        user_email: user.email,
        total_amount: 0, // Will be updated when cart items are added
      };

      const { data, error } = await supabase
        .from("carts")
        .insert(cartData)
        .select()
        .single();

      if (error) {
        console.error("Error creating cart:", error);
        continue;
      }

      carts.push(data);
      console.log(
        `Created cart ${carts.length}/${targetCarts} for user: ${user.email}`
      );
    }

    // Step 6: Create Cart Items and update cart totals
    console.log("Creating cart items...");
    const { data: existingCartItems, error: getCartItemsError } = await supabase
      .from("cart_items")
      .select("*");

    const cartItems = existingCartItems || [];
    const targetCartItems = 80;
    const cartItemsToCreate = Math.max(0, targetCartItems - cartItems.length);

    console.log(
      `Found ${cartItems.length} existing cart items, creating ${cartItemsToCreate} new ones...`
    );

    for (let i = 0; i < cartItemsToCreate; i++) {
      if (carts.length === 0 || products.length === 0) {
        console.log("No carts or products available for cart items");
        break;
      }

      const cart = carts[Math.floor(Math.random() * carts.length)];
      const product = products[Math.floor(Math.random() * products.length)];
      const quantity = faker.number.int({ min: 1, max: 5 });

      const cartItemData = {
        cart_id: cart.id,
        product_id: product.id,
        quantity: quantity,
      };

      const { data, error } = await supabase
        .from("cart_items")
        .insert(cartItemData)
        .select()
        .single();

      if (error) {
        console.error("Error creating cart item:", error);
        continue;
      }

      cartItems.push(data);

      // Update cart total
      const itemTotal = product.price * quantity;
      await supabase
        .from("carts")
        .update({
          total_amount: cart.total_amount + itemTotal,
          modified_at: new Date().toISOString(),
        })
        .eq("id", cart.id);

      cart.total_amount += itemTotal; // Update local copy

      console.log(`Created cart item ${cartItems.length}/${targetCartItems}`);
    }

    // Step 7: Create Orders
    console.log("Creating orders...");
    const { data: existingOrders, error: getOrdersError } = await supabase
      .from("orders")
      .select("*");

    const orders = existingOrders || [];
    const targetOrders = 20;
    const ordersToCreate = Math.max(0, targetOrders - orders.length);

    console.log(
      `Found ${orders.length} existing orders, creating ${ordersToCreate} new ones...`
    );

    for (let i = 0; i < ordersToCreate; i++) {
      if (carts.length === 0) {
        console.log("No carts available for orders");
        break;
      }

      const cart = carts[Math.floor(Math.random() * carts.length)];

      const orderData = {
        user_email: cart.user_email,
        cart_id: cart.id,
        payment_screenshot: faker.image.url({ width: 600, height: 400 }),
      };

      const { data, error } = await supabase
        .from("orders")
        .insert(orderData)
        .select()
        .single();

      if (error) {
        console.error("Error creating order:", error);
        continue;
      }

      orders.push(data);
      console.log(`Created order ${orders.length}/${targetOrders}`);
    }

    console.log("\n=== DUMMY DATA GENERATION COMPLETE ===");
    console.log(`✅ Total auth users: ${authUsers.length} new`);
    console.log(`✅ Total stores: ${stores.length}`);
    console.log(`✅ Total user profiles: ${users.length}`);
    console.log(`✅ Total products: ${products.length}`);
    console.log(`✅ Total carts: ${carts.length}`);
    console.log(`✅ Total cart items: ${cartItems.length}`);
    console.log(`✅ Total orders: ${orders.length}`);
    console.log(
      `\nGrand total records: ${
        stores.length +
        users.length +
        products.length +
        carts.length +
        cartItems.length +
        orders.length
      }`
    );
  } catch (error) {
    console.error("Error generating dummy data:", error);
  }
}

// Run the script
generateDummyData()
  .then(() => {
    console.log("Script completed");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Script failed:", error);
    process.exit(1);
  });
