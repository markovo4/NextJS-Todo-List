import {prisma} from "@/lib/prisma";
import {NextResponse} from "next/server";

export const POST = async (request: Request) => {
    const body = await request.json();
    const {todoId} = body;

    try {
        const todoToRemove = await prisma.todo.delete({
            where: {id: todoId},
        });

        if (!todoToRemove) {
            return Response.json({
                message: 'Failed to delete Todo!',
                toastStatus: 'error'
            }, {status: 400})
        }

        return NextResponse.json({
            message: `Successful Todo deletion ${todoToRemove.title}`,
            toastStatus: 'success'
        }, {status: 202})

    } catch (error) {
        console.error(error)
        return new Response("Failed to delete todo", {status: 500});
    }
}