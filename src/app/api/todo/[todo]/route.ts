import {getCookie} from "cookies-next";
import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/lib/prisma";

export const GET = async (req: NextRequest) => {
    try {
        // ✅ Correct way to get session token
        const token = req.cookies.get("session")?.value || getCookie("session", {req});

        if (!token) {
            return NextResponse.json({message: "Unauthorized"}, {status: 401});
        }

        // ✅ Extract `todoId` from query parameters
        const todoId = req.nextUrl.searchParams.get("todoId");

        if (!todoId) {
            return NextResponse.json({message: "Missing todoId in query"}, {status: 400});
        }

        // ✅ Ensure `todoId` is a number (if `id` is an integer in the DB)
        const parsedTodoId = isNaN(Number(todoId)) ? todoId : Number(todoId);

        // ✅ Fetch a specific todo from the database
        const todo = await prisma.todo.findUnique({
            where: {id: parsedTodoId}, // ✅ Correct field name (assuming `id` is the correct column)
        });

        if (!todo) {
            return NextResponse.json({message: "Todo not found!"}, {status: 404});
        }

        return NextResponse.json(todo, {status: 200});
    } catch (error) {
        console.error("Error fetching todo:", error);
        return NextResponse.json(
            {message: "Failed to retrieve todo!", error: error.message},
            {status: 500}
        );
    }
};
