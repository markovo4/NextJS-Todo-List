import {prisma} from "@/lib/prisma";

export const PUT = async (request: Request) => {
    try {
        const body = await request.json();
        const {todoId, title, description, completed} = body;
        console.log(1)
        if (!todoId || typeof title !== "string" || typeof description !== "string" || typeof completed !== "boolean") {
            return new Response(JSON.stringify({
                message: "Invalid input parameters",
                toastStatus: "error"
            }), {status: 400});
        }
        console.log(2)
        const updatedTodo = await prisma.todo.update({
            where: {id: todoId},
            data: {title, description, completed}
        });

        console.log(3)
        console.log(updatedTodo)

        return new Response(JSON.stringify({
            message: "Todo updated successfully!",
            todo: updatedTodo,
            toastStatus: "success"
        }), {status: 200});

    } catch (error: unknown) {
        console.error("Error updating todo:", error);

        return new Response(JSON.stringify({
            message: "Failed to update todo",
            error: error.message,
            toastStatus: "error"
        }), {status: 500});
    }
};
