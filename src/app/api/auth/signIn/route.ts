import {prisma} from "@/lib/prisma";
import {createHash} from "node:crypto";

export async function POST(request: Request) {
    const body = await request.json();
    const {email, password} = body;
    const hash = createHash('sha256').update(password).digest('hex');
    const user = await prisma.user.findFirst({
        where: {email, password: hash}
    })
    
    if (!user) {
        return Response.json({
                message: 'Wrong email or password!',
                toastStatus: 'error'
            },
            {status: 404})
    }
    const userId = user.id;

    return new Response(JSON.stringify({userId}), {
        status: 200,
        headers: {"Content-Type": "application/json"},
    })
}