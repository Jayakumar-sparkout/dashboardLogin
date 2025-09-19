import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const publicPaths = ["/login", "/"];
  const protectedRoutes = ["/dashboard"];
  const unAuth = ["/emailverify", "/resetpassword", "/forgotVerify"];
  const Tokenauth = request.cookies.get("auth")?.value;

  let isProtected = false;
  for (let i = 0; i < protectedRoutes.length; i++) {
    if (protectedRoutes[i] === path) {
      isProtected = true;
      break;
    }
  }

  let isPublic = false;
  for (let i = 0; i < publicPaths.length; i++) {
    if (publicPaths[i] === path) {
      isPublic = true;
      break;
    }
  }

  let isUnAuth = false;
  for (let i = 0; i < unAuth.length; i++) {
    if (unAuth[i] === path) {
      isUnAuth = true;
      break;
    }
  }

  if (Tokenauth && isUnAuth) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!Tokenauth && isProtected) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (Tokenauth && isPublic) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/dashboard",
    "/resetpassword",
    "/emailverify",
    "/forgotVerify",
  ],
};
