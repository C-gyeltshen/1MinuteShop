// middleware.ts - with detailed logging
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  const pathname = request.nextUrl.pathname;

  console.log("=== MIDDLEWARE TRIGGERED ===");
  console.log("Full URL:", request.nextUrl.toString());
  console.log("Hostname:", hostname);
  console.log("Pathname:", pathname);

  // Extract subdomain
  const parts = hostname.split(".");
  console.log("Hostname parts:", parts);

  const isSubdomain =
    parts.length > 2 || (parts.length === 2 && parts[0] !== "www");
  console.log("Is subdomain:", isSubdomain);

  if (isSubdomain && parts[0] !== "www") {
    const subdomain = parts[0];
    console.log("Detected subdomain:", subdomain);

    // Rewrite to a dynamic store page while keeping the subdomain in the URL
    const url = request.nextUrl.clone();
    url.pathname = `/store/${subdomain}${pathname}`;
    console.log("Rewriting to:", url.pathname);
    return NextResponse.rewrite(url);
  }

  console.log("No subdomain detected, continuing...");
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|manifest.json|robots.txt).*)",
  ],
};