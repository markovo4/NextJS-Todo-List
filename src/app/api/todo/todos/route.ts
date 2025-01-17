export const POST = async (request: Request) => {
    try {
        const body = await request.json();
        const {session} = body;
        const {user} = session;
        const listOfTodos = await prisma?.todo.findMany({
            where: {userId: user.userId}
        });

        if (!listOfTodos) {
            return Response.json({
                message: 'Failed to retrieve Todos!',
                toastStatus: 'error'
            }, {status: 404})
        }
        return new Response(JSON.stringify(listOfTodos),
            {
                status: 200,
                headers: {"Content-Type": "application/json"},
            })
    } catch (error) {
        console.error(error);
        return new Response('Failed to retrieve Todos!', {status: 500})
    }
}