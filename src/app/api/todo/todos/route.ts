import {NextRequest, NextResponse} from "next/server";
import {getCookie} from "cookies-next";
import {verifyJWT} from "@/lib/jwt";
import {prisma} from "@/lib/prisma";

export async function GET(req: NextRequest) {
    const {searchParams} = new URL(req.url);

    try {
        const token = await getCookie("session", {req});
        const todoId = searchParams.get('todoId') || null;

        if (!token) {
            return NextResponse.json({message: "Unauthorized"}, {status: 401});
        }

        const user = await verifyJWT(token);

        if (!user) {
            return NextResponse.json({message: "Invalid token"}, {status: 403});
        }

        if (todoId) {
            const todo = await prisma.todo.findUnique({
                where: {id: todoId},
            });

            if (!todo) {
                return NextResponse.json({message: "Failed to retrieve Todos!"}, {status: 404});
            }

            return NextResponse.json({todo, message: "Todo Retrieved!"}, {status: 200});
        }

        const listOfTodos = await prisma.todo.findMany({
            where: {userId: user.userId},
        });

        if (!listOfTodos) {
            return NextResponse.json({message: "Failed to retrieve Todos!"}, {status: 404});
        }

        return NextResponse.json(listOfTodos, {status: 200});
    } catch (error) {
        console.error("Error fetching todos:", error);
        return NextResponse.json({
            message: "Failed to retrieve Todos!",
            error: (error as { message: string }).message
        }, {status: 500});
    }
}
