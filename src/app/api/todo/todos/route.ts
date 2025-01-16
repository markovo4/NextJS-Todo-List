export const GET = async () => {
    try {
        const listOfTodos = await prisma?.todo.findMany();

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