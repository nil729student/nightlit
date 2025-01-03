import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
        const url = req.nextUrl.clone();
        url.pathname = "/login";
        return NextResponse.redirect(url);
    }

    const { role } = token;

    const url = req.nextUrl.clone();

    if (url.pathname.startsWith("/admin") && role !== "ADMIN") {
        url.pathname = "/unauthorized";
        return NextResponse.redirect(url);
    }

    if (url.pathname.startsWith("/club") && role !== "OWNER" && role !== "ADMIN") {
        url.pathname = "/unauthorized";
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/admin/:path*", 
        "/profile/:path*", 
        "/club/:path*"
    ], 
};
