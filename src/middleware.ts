import {NextRequest} from 'next/server';
import {updateSession} from "@/lib/sessions";

export async function middleware(request: NextRequest) {
    return await updateSession(request)
}

export const config = {
    matcher: ['/', '/todoList'],
};
