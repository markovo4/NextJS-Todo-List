import {prisma} from "@/lib/prisma";

export async function POST(request: Request) {
    const body = await request.json();
    const {email, password} = body;

    const user = {email, password}

    await prisma.user.create({
        data: {...user}
    });

    return Response.json(user, {status: 201})

}