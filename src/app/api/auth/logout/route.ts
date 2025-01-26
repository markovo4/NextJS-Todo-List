import {NextRequest, NextResponse} from "next/server";
import {deleteCookie} from "cookies-next";

export async function POST(req: NextRequest) {
    const res = NextResponse.json({message: "Logged out"});
    deleteCookie("session", {req, res});
    return res;
}
