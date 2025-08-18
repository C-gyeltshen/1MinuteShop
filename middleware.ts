import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from './utils/superbase/middleware'
import { getValidSubdomain } from './utils/superbase/subdomain';

// RegExp for public files
const PUBLIC_FILE = /\.(.*)$/; // Files

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  // Skip public files and Next.js internal files
  if (PUBLIC_FILE.test(url.pathname) || url.pathname.includes('_next')) {
    return;
  }

  // Handle subdomain logic first
  const host = request.headers.get('host');
  console.log("host name : ", host)
  const subdomain = getValidSubdomain(host);
  console.log("subdomain : ", subdomain)
  
  
  if (subdomain) {
    // Subdomain available, rewrite the URL
    console.log(`>>> Rewriting: ${url.pathname} to /${subdomain}${url.pathname}`);
    url.pathname = `/${subdomain}${url.pathname}`;
    
    // Create a new request with the rewritten URL for session update
    const rewrittenRequest = new Request(url.toString(), {
      method: request.method,
      headers: request.headers,
      body: request.body,
    });
    
    // Update session with the rewritten request
    const sessionResponse = await updateSession(rewrittenRequest as NextRequest);
    
    // If session update returns a response (redirect), return it
    if (sessionResponse && sessionResponse.status !== 200) {
      return sessionResponse;
    }
    
    // Otherwise, return the rewrite
    return NextResponse.rewrite(url);
  } else {
    // No subdomain, just handle session management
    return await updateSession(request);
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - Static assets (svg, png, jpg, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}