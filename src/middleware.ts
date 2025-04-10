import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

export default async function middleware(req: NextRequest) {
  intlMiddleware(req);

  const { pathname } = req.nextUrl;
  const isProtectedRoute = /^\/(ar|en)\/dashboard(\/.*)?$/.test(pathname);
  const isLoginRoutes = /^\/(ar|en)\/login$/.test(pathname);
  const isLoggedIn = !!req.cookies.get("token")?.value ;
console.log('isLoggedIn',isLoggedIn);
console.log('req.cookies.get("token")?.value',req.cookies.get("token")?.value);

  if (isProtectedRoute && !isLoggedIn) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = `/${req.nextUrl.locale || "en"}/login`;
    return NextResponse.redirect(loginUrl);
  }

  if (isLoginRoutes && isLoggedIn) {
    const dashboardUrl = req.nextUrl.clone();
    dashboardUrl.pathname = `/${req.nextUrl.locale || "en"}/dashboard`;
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/(ar|en)/:path*"],
};
