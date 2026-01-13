// middleware.ts (at root of your project)
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";

  // Extract subdomain
  const parts = hostname.split(".");
  const isSubdomain =
    parts.length > 2 || (parts.length === 2 && parts[0] !== "www");
  console.log("is subdomain", isSubdomain);

  if (isSubdomain && parts[0] !== "www") {
    const subdomain = parts[0];

    // Rewrite to a dynamic store page while keeping the subdomain in the URL
    const url = request.nextUrl.clone();
    url.pathname = `/store/${subdomain}${url.pathname}`;
    return NextResponse.rewrite(url);
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
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
