import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";
const protectedRoutes = ["/(ar|en)/dashboard/*"];
const PublicRoutes = ["/(ar|en)/", "/(ar|en)/login"];
const LoginRoutes = ["/(ar|en)/login"];
const intlMiddleware = createMiddleware(routing);
export default async function middleware(req: NextRequest) {
  intlMiddleware(req);

  const { pathname } = req.nextUrl;
  const isProtectedRoute = protectedRoutes.includes(pathname);
  const isPublicRoute = PublicRoutes.includes(pathname);
  const isLoggedIn = req.cookies.get("token");

  if (isProtectedRoute && !isLoggedIn) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = `/${req.nextUrl.locale || "en"}/login`;
    return NextResponse.redirect(loginUrl);
  }
  if (isProtectedRoute && !isLoggedIn) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = `/${req.nextUrl.locale || "en"}/login`;
    return NextResponse.redirect(loginUrl);
  }
}
export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(ar|en)/:path*"],
};
