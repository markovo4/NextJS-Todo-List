import {prisma} from "@/lib/prisma";

export const PUT = async (request: Request) => {
    const body = await request.json();
    const {todoId, title, description, checked} = body;

    try {
        const updatedTodo = await prisma.todo.update({
            where: {id: todoId},
            data: {title, description, checked},
        });

        if (!updatedTodo) {
            return Response.json({
                message: 'Failed to update Todo!',
                toastStatus: 'error'
            }, {status: 400})
        }
    } catch (error) {
        console.error(error)
        return new Response("Failed to update todo", {status: 500});
    }
}