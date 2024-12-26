import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
        // Si no hi ha generat cap token significa que no hi ha cap sessio activa
        const url = req.nextUrl.clone();
        url.pathname = "/login";
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    // Definim les rutes proteguides
    matcher: [
        "/admin/:path*", 
        "/profile/:path*", 
        "/club/:path*"
    ], 
};
