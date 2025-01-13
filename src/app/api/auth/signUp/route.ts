import {prisma} from "@/lib/prisma";
import {createHash} from "node:crypto";

export async function POST(request: Request) {
    const body = await request.json();
    const {email, password, name} = body;

    const hash = createHash('sha256').update(password).digest('hex')

    const user = {email, password: hash, name}

    const exists = await prisma.user.findFirst({
        where: {email}
    });


    if (exists) {
        return Response.json({
            message: 'User with such email already exists!',
            toastStatus: 'error'
        }, {status: 409})
    }

    const result = await prisma.user.create({
        data: {...user}
    });

    if (!result) {
        return Response.json({
            message: 'Error occurred!',
            toastStatus: 'error'
        }, {status: 400})
    }

    return Response.json(user, {status: 201})

}