import {Api} from "@/app/api/api";
import {useQuery} from "@tanstack/react-query";

export const useGetTodosQuery = () => {

    return useQuery<void, Error, TSingleTodo[]>({
        enabled: true,
        queryFn: () => Api.get('/api/todo/todos').then((res) => res.data),
        queryKey: ['todos'],
    });
}

export type TSingleTodo = {
    id: string;
    userId: string;
    title: string;
    description: string;
    completed: boolean;
}