import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

export default async function middleware(req: NextRequest) {
  intlMiddleware(req);
const AppUrl=process.env.NEXT_PUBLIC_APP_URL 
  const { pathname } = req.nextUrl;
    const user = req.cookies.get("user")?.value;
  const parsedUser = user ? JSON.parse(user) : null;
  const isSuperAdmin = parsedUser?.roles?.length>0 &&( parsedUser?.roles[0].code === "super-admin" || parsedUser?.roles[0].name === "admin");
  if (pathname === "/") {
    return NextResponse.redirect(
      `${AppUrl}${req.nextUrl.locale || "en"}${isSuperAdmin ? "/dashboard" : "/dashboard/customers"}` //TODO
    );
  }
  if (pathname === `/${req.nextUrl.locale || "en"}`) {
    return NextResponse.redirect(
      `${AppUrl}${req.nextUrl.locale || "en"}${isSuperAdmin ? "/dashboard":"/dashboard/customers"}` //TODO
    );
  }

  const isProtectedRoute = /^\/(ar|en)\/dashboard(\/.*)?$/.test(pathname);
  const isLoginRoutes = /^\/(ar|en)\/login$/.test(pathname);
  const token = req.cookies.get("token")?.value;

  let isLoggedIn = false;

  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (payload.exp) {
        const expirationDate = new Date(payload.exp * 1000);
        isLoggedIn = expirationDate > new Date();
      }
    } catch (error) {
      console.error("Invalid token", error);
    }
  }

  if (isProtectedRoute && !isLoggedIn) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = `/${req.nextUrl.locale || "en"}/login`;
    return NextResponse.redirect(loginUrl);
  }

  if (isLoginRoutes && isLoggedIn) {
    const dashboardUrl = req.nextUrl.clone();
    dashboardUrl.pathname = `/${req.nextUrl.locale || "en"}${isSuperAdmin ? "/dashboard":"/dashboard/customers"}`;
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/(ar|en)/:path*"],
};
