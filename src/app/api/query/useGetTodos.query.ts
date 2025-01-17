import {Api} from "@/app/api/api";
import {getSession} from "@/lib/sessions";
import {JWTPayload} from "jose";

export const getTodosQuery = async () => {
    const session: null | JWTPayload = await getSession();
    const response = await Api.post(`/api/todo/todos`, {session});
    return response.data;

}

