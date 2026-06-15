import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

const authPaths = new Set([
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
]);
const COOKIES_NAME = 'authjs.session-token';

export default async function proxy(request: NextRequest) {
  const c = await cookies();
  const cookieToken = c?.get(COOKIES_NAME)?.value;
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
  // NOSONAR — Next.js requires a plain string here (template literals not parsed by the build system for middleware matcher)
  matcher:
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|data|.*\\.(?:png|jpg|jpeg|gif|webp|avif|svg)).*)',
};
