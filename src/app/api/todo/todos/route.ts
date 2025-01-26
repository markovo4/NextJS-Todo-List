import {NextRequest, NextResponse} from "next/server";
import {getCookie} from "cookies-next";
import {verifyJWT} from "@/lib/jwt";
import {prisma} from "@/lib/prisma";

export async function GET(req: NextRequest) {
    try {
        // 🔹 Get session token from cookies
        const token = await getCookie("session", {req});

        if (!token) {
            return NextResponse.json({message: "Unauthorized"}, {status: 401});
        }

        // 🔹 Verify JWT token
        const user = await verifyJWT(token);
        
        if (!user) {
            return NextResponse.json({message: "Invalid token"}, {status: 403});
        }

        // 🔹 Fetch todos from the database
        const listOfTodos = await prisma.todo.findMany({
            where: {userId: user.userId},
        });

        if (!listOfTodos) {
            return NextResponse.json({message: "Failed to retrieve Todos!"}, {status: 404});
        }

        return NextResponse.json(listOfTodos, {status: 200});
    } catch (error) {
        console.error("Error fetching todos:", error);
        return NextResponse.json({message: "Failed to retrieve Todos!", error: error.message}, {status: 500});
    }
}
