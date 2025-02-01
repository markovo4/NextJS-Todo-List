import {getCookie} from "cookies-next";
import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/lib/prisma";

export const GET = async (req: NextRequest) => {
    try {
        const token = req.cookies.get("session")?.value || getCookie("session", {req});

        if (!token) {
            return NextResponse.json({message: "Unauthorized"}, {status: 401});
        }
        const todoId = req.nextUrl.searchParams.get('todo');

        if (!todoId) {
            return NextResponse.json({message: "Missing todoId in query"}, {status: 400});
        }
        const todo = await prisma.todo.findUnique({
            where: {id: todoId},
        });
        if (!todo) {
            return NextResponse.json({message: "Todo not found!"}, {status: 404});
        }
        return NextResponse.json(todo, {status: 200});
    } catch (error) {
        console.error("Error fetching todo:", error);
        return NextResponse.json(
            {message: "Failed to retrieve todo!", error: (error as { message: string }).message},
            {status: 500}
        );
    }
};
