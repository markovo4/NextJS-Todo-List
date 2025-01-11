import {prisma} from "@/lib/prisma";
import {createHash} from "node:crypto";

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
                message: 'Wrong email or password!',
                toastStatus: 'error'
            },
            {status: 404})
    }

    return Response.json(user, {status: 200})
}