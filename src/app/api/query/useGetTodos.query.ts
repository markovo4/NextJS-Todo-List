import {Api} from "@/app/api/api";
import {getSession} from "@/lib/sessions";

export const useGetTodosQuery = async () => {
    const session = await getSession();

    const response = await Api.post(`/api/todo/todos`, {userId: session?.user.userId});
    return response.data;

}

export type TSingleTodo = {
    id: string;
    userId: string; s
    title: string;
    description: string;
    completed: boolean;
}
