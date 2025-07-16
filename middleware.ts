import { betterFetch } from "@better-fetch/fetch";
import type { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

type Session = typeof auth.$Infer.Session;

export async function middleware(request: NextRequest) {
    const { data: session } = await betterFetch<Session>("/api/auth/get-session", {
        baseURL: request.nextUrl.origin,
        headers: {
            cookie: request.headers.get("cookie") || "",
        },
    });

    const path = request.nextUrl.pathname;

    const isAuthPage = ["/login", "/register", "/forgot-password", "/reset-password"].includes(path);
    const isPublicPage = path === "/" || isAuthPage;

    if (!session) {
        // Guest: can only access public pages
        if (!isPublicPage) {
            return NextResponse.redirect(new URL("/", request.url));
        }
    } else {
        // Logged in user can't access auth pages
        if (isAuthPage) {
            return NextResponse.redirect(new URL("/", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|api|sitemap.xml|robots.txt).*)"
    ]
};
