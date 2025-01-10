import {prisma} from "@/lib/prisma";
import {createHash} from "node:crypto";
import {NextResponse} from "next/server";

export async function POST(request: Request) {
    const body = await request.json();
    const {email, password} = body;
    const hash = createHash('sha256').update(password).digest('hex');
    const user = {email, password: hash}
    const result = await prisma.user.findFirst({
        where: {...user}
    })

    if (!result) {
        return Response.json({
                message: {
                    email: 'No Such email exists',
                    password: 'No Such password exists'
                }
            },
            {status: 404})
    }

    NextResponse.redirect(new URL('/todoList', request.url))

    return Response.json(user, {status: 201})
}