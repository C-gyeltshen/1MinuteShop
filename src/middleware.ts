import { NextRequest, NextResponse } from "next/server";

const BackendUrl = process.env.NEXT_PUBLIC_API_URL

export async function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  const pathname = request.nextUrl.pathname;

  // 1. Extract subdomain
  const parts = hostname.split(".");
  const isSubdomain = parts.length > 2 || (parts.length === 2 && parts[0] !== "www");

  if (isSubdomain && parts[0] !== "www") {
    const subdomain = parts[0];

    try {
      // 2. Call your backend to check if the store exists
      const response = await fetch(`${BackendUrl}/stores/check-subdomain`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subDomain: subdomain }),
      });

      // 3. If store exists, rewrite the URL
      if (response.ok) {
        const url = request.nextUrl.clone();
        url.pathname = `/store/${subdomain}${pathname}`;
        console.log(`store exist with subDomain ${subdomain}`)
        return NextResponse.rewrite(url);
      }
      
      // 4. If store doesn't exist, we just fall through 
      // (This will show your main website or a 404)
      console.log(`Store ${subdomain} does not exist.`);
    } catch (error) {
      console.error("Error checking subdomain:", error);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - .well-known (Chrome devtools / system requests) <--- ADD THIS
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.well-known|manifest.json|robots.txt).*)",
  ],
};