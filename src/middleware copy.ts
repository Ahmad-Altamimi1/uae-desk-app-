import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

const protectedRoutes = ["/dashboard"];
const publicRoutes = ["/", "/login"];

function isProtectedRoute(pathname: string) {
  return protectedRoutes.some((route) => pathname.startsWith(route));
}

function isPublicRoute(pathname: string) {
  return publicRoutes.some((route) => pathname.startsWith(route));
}

export default async function middleware(req: NextRequest) {
  // Run next-intl middleware first (locale handling)
  const intlResponse = intlMiddleware(req);

  // Clone URL object from request
  const { pathname } = req.nextUrl;

  // Optional: Your own logic for protected routes
  if (isProtectedRoute(pathname)) {
    const isLoggedIn = req.cookies.get("token"); // Example logic
    if (!isLoggedIn) {
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = `/${req.nextUrl.locale || "en"}/login`;
      return NextResponse.redirect(loginUrl);
    }
    }
  }

  // Return the response from intlMiddleware (or modified one)
  return intlResponse;
}

export const config = {
  matcher: ["/", "/(ar|en)/:path*"],
};
