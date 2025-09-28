import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { getToken } from "next-auth/jwt";

import { env } from "@/lib/env/server";

import { JWTExtended } from "./(auth)/_types/auth";

export async function middleware(req: NextRequest) {
  const token: JWTExtended | null = await getToken({
    req,
    secret: env.NEXTAUTH_SECRET,
  });

  if (token?.user?.accessToken) {
    const decoded: { exp: number } = JSON.parse(
      Buffer.from(token.user.accessToken.split(".")[1], "base64").toString()
    );

    if (Date.now() >= decoded.exp * 1000) {
      // Token expired, redirect ke login
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"], // atur route yg mau dicek
};
