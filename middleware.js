import { NextResponse } from "next/server";

// Edge middleware can't use Node's crypto the same way our lib/auth.js does,
// so this does a lightweight presence check and lets each protected page/API
// route perform the full signature+expiry check server-side before returning
// data. This still stops casual/direct navigation to /admin without a cookie.
export function middleware(request) {
  const isLoginPage = request.nextUrl.pathname === "/admin/login";
  const hasCookie = request.cookies.get("wds_admin_session");

  if (!isLoginPage && !hasCookie) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
