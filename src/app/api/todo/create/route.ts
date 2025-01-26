import {prisma} from "@/lib/prisma";
import {getCookie} from "cookies-next";
import {NextRequest, NextResponse} from "next/server";
import {verifyJWT} from "@/lib/jwt";

export const POST = async (req: NextRequest) => {
    const body = await req.json();
    const {title, description} = body;

    const token = await getCookie('session', {req});

    if (!token) {
        return NextResponse.json({message: "Unauthorized"}, {status: 401})
    }

    const user = await verifyJWT(token);

    if (!user) {
        return NextResponse.json({message: "Invalid token"}, {status: 403});
    }

    const todo = {userId: user.userId, title, description, completed: false}

    const result = await prisma.todo.create({
        data: {...todo}
    });

    if (!result) {
        return Response.json({
            message: 'Failed to create Todo!',
            toastStatus: 'error'
        }, {status: 400})
    }

    return Response.json({
        message: 'Todo Created successfully!',
        toastStatus: 'success'
    }, {status: 201})

}