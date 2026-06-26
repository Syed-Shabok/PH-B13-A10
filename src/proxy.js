import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  // Fetch the session using the native request headers
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  //  Define your exact Auth and Protected routes
  const isAuthRoute =
    pathname === "/auth/signin" || pathname === "/auth/signup";
  const isDashboardRoute = pathname.startsWith("/dashboard");

  // Protects specific ticket pages (e.g., /all-tickets/6a3b...) but leaves the main list public
  const isTicketDetailsRoute =
    pathname.startsWith("/all-tickets/") &&
    pathname.length > "/all-tickets/".length;

  const isProtectedRoute = isDashboardRoute || isTicketDetailsRoute;

  //  Prevent unauthenticated users from accessing protected routes
  if (isProtectedRoute && !session) {
    const loginUrl = new URL("/auth/signin", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Prevent already authenticated users from accessing the sign-in or sign-up pages
  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 5. Let the request proceed normally
  return NextResponse.next();
}

// 6. Apply the matcher to optimize Edge function execution
export const config = {
  matcher: [
    "/dashboard/:path*",

    // Protects "/all-tickets/123" but leaves public "/all-tickets" alone
    "/all-tickets/:path+",

    // Your specific auth routes
    "/auth/signin",
    "/auth/signup",
  ],
};
