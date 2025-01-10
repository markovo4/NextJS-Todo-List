import {prisma} from "@/lib/prisma";
import {createHash} from "node:crypto";

export async function POST(request: Request) {
    const body = await request.json();
    const {email, password} = body;

    const hash = createHash('sha256').update(password).digest('hex')

    const user = {email, password: hash}
    console.log(hash)

    const result = await prisma.user.create({
        data: {...user}
    });

    if (!result) {
        return Response.json({
            message: {
                email: 'Error Occurred with Email:)',
                password: 'Error Occurred with Password:)'
            }
        }, {status: 400})
    }

    return Response.json(user, {status: 201})

}