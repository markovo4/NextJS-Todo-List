import {prisma} from "@/lib/prisma";

export const PUT = async (request: Request) => {
    try {
        const body = await request.json();
        const {todoId, title, description, completed} = body;

        // Validate todoId and completed (completed should be a boolean if provided)
        if (!todoId) {
            return new Response(JSON.stringify({
                message: "Invalid input parameters",
                toastStatus: "error"
            }), {status: 400});
        }

        // Prepare update data, only include fields that are provided
        const updateData: Record<string, unknown> = {};
        if (typeof title === "string") updateData.title = title;
        if (typeof description === "string") updateData.description = description;
        updateData.completed = completed;


        // Ensure there's at least one field to update
        if (Object.keys(updateData).length === 0) {
            return new Response(JSON.stringify({
                message: "No valid fields provided for update",
                toastStatus: "error"
            }), {status: 400});
        }

        const updatedTodo = await prisma.todo.update({
            where: {id: todoId},
            data: updateData
        });

        return new Response(JSON.stringify({
            message: "Todo updated successfully!",
            todo: updatedTodo,
            toastStatus: "success"
        }), {status: 200});

    } catch (error: unknown) {
        console.error("Error updating todo:", error);

        return new Response(JSON.stringify({
            message: "Failed to update todo",
            error: error instanceof Error ? error.message : "Unknown error",
            toastStatus: "error"
        }), {status: 500});
    }
};
