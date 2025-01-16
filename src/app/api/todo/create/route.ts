import {prisma} from "@/lib/prisma";

export const POST = async (request: Request) => {
    const body = await request.json();
    const {userId, title, description} = body;

    const todo = {userId, title, description, completed: false}

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