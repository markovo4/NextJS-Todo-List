import {prisma} from "@/lib/prisma";
import {createHash} from "node:crypto";
import {setCookie} from "cookies-next";
import {generateJWT} from "@/lib/jwt";
import {NextRequest, NextResponse} from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const {email, password} = body;
        const hash = createHash("sha256").update(password).digest("hex");

        const user = await prisma.user.findFirst({where: {email, password: hash}});

        if (!user) {
            return NextResponse.json({
                message: "Wrong email or password!",
                toastStatus: "error",
            }, {status: 404});
        }

        const token = await generateJWT(user.id);
        const res = NextResponse.json({userId: user.id});

        setCookie("session", token, {
            req,
            res,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60, // 1 day
        });

        return res;
    } catch (error) {
        return NextResponse.json({
            message: "Login failed",
            error: (error as { message: string }).message
        }, {status: 500});
    }
}
