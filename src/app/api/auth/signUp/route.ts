import {prisma} from "@/lib/prisma";
import {createHash} from "node:crypto";

export async function POST(request: Request) {
    const body = await request.json();
    const {email, password, name, lastName} = body;

    const hash = createHash('sha256').update(password).digest('hex')

    const exists = await prisma.user.findFirst({
        where: {email}
    });

    if (exists) {
        return Response.json({
            message: 'User with such email already exists!',
            toastStatus: 'error'
        }, {status: 409})
    }

    const user = await prisma.user.create({
        data: {email, password: hash, name, lastName}
    });

    if (!user) {
        return Response.json({
            message: 'Error occurred!',
            toastStatus: 'error'
        }, {status: 400})
    }

    const userId = user.id;

    return new Response(JSON.stringify({userId}), {
        status: 201,
        headers: {"Content-Type": "application/json"},
    });

}