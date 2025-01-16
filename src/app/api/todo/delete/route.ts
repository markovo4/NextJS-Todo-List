import {prisma} from "@/lib/prisma";

export const DELETE = async (request: Request) => {
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

    } catch (error) {
        console.error(error)
        return new Response("Failed to delete todo", {status: 500});
    }
}