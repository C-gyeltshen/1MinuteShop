# Plan for Subdomain Shop Hosting on laso.la

## 1. Subdomain Structure

- Each shop will be accessible at: `shopname.laso.la`
- The main domain (`laso.la`) will serve the main site or landing page.

## 2. Middleware for Subdomain Detection

- Use `middleware.ts` to detect the subdomain from the request’s `host` header.
- If a subdomain (other than `www` or blank) is present, set it in a custom header or cookie for use in the app.

## 3. Shop Creation After Registration

- After a user registers, automatically create a shop record in your database with a unique shop name (subdomain).
- Optionally, redirect the user to their new shop’s subdomain (e.g., `myshop.laso.la`).

## 4. Routing and Data Fetching

- In your `[subdomain]/page.tsx` or a similar dynamic route, fetch shop data based on the detected subdomain.
- Use the subdomain value (from header/cookie or Next.js context) to query the database for the correct shop’s data.

## 5. Shop Front Display

- Render the shop’s front page with its unique data (name, description, products, etc.) for every subdomain.

## 6. Vercel & DNS Configuration

- Set up a wildcard DNS record (`*.laso.la`) pointing to Vercel.
- In Vercel dashboard, add `*.laso.la` as a wildcard domain for your project.

## 7. Security & Edge Cases

- Prevent reserved subdomains (like `www`, `api`, etc.) from being used as shop names.
- Handle non-existent shops gracefully (show 404 or a custom error page).

---

**Next Steps:**

1. Implement subdomain detection in `middleware.ts`.
2. Update registration flow to create a shop and assign a subdomain.
3. Create dynamic shop front page that loads data based on subdomain.
4. Test with multiple shops and subdomains.