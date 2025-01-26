import {NextRequest, NextResponse} from "next/server";
import {getCookie} from "cookies-next";

export async function middleware(req: NextRequest) {
    const session = await getCookie("session", {req});
    if (!session) {
        return NextResponse.redirect(new URL("/auth", req.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/todoList"],
};
