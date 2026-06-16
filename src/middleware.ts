import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const authPaths = new Set([
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
]);
const COOKIES_NAME = 'authjs.session-token';

export default async function middleware(request: NextRequest) {
  // NextAuth uses __Secure- prefix on HTTPS (production) and no prefix on HTTP (local)
  const cookieToken =
    request.cookies.get('__Secure-' + COOKIES_NAME)?.value ??
    request.cookies.get(COOKIES_NAME)?.value;
  if (
    !cookieToken &&
    !authPaths.has(request.nextUrl.pathname) &&
    request.nextUrl.pathname !== '/'
  ) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (
    cookieToken &&
    authPaths.has(request.nextUrl.pathname) &&
    request.nextUrl.pathname !== '/'
  ) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  /*
   * Match all request paths except for the ones starting with:
   * - api (API routes)
   * - _next/static (static files)
   * - _next/image (image optimization files)
   * - favicon.ico, sitemap.xml, robots.txt (metadata files)
   */
  matcher:
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|data|.*\\.(?:png|jpg|jpeg|gif|webp|avif|svg)).*)', // NOSONAR — Next.js requires a plain string literal here; template literals break the build system's static middleware-matcher parsing
};
