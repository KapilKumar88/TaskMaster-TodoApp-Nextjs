import { NextResponse } from "next/server";
import { auth } from "./auth";

const authPaths = ["/login", "/signup", "/forgot-password", "/reset-password"];

export default auth((request) => {
  if (!request.auth && !authPaths.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (request.auth && authPaths.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
});

export const config = {
  /*
   * Match all request paths except for the ones starting with:
   * - api (API routes)
   * - _next/static (static files)
   * - _next/image (image optimization files)
   * - favicon.ico, sitemap.xml, robots.txt (metadata files)
   */
  matcher:
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|data|.*\\.(?:png|jpg|jpeg|gif|webp|avif|svg)).*)",
};
