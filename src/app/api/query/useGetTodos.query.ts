import Api from "@/lib/api";
import {useQuery} from "@tanstack/react-query";
import {TSingleTodo} from "@/app/(pages)/todoList/page";

export type TodoQueryPayload = {
    todoId?: string | null;
};

export const useGetTodosQuery = ({todoId}: TodoQueryPayload = {}) => {
    const cleanupEmptyKeysUtil = (keysObject: Record<string, unknown> = {}): Record<string, string> => {
        const obj: Record<string, string> = {};
        for (const key in keysObject) {
            if (keysObject[key] != null) { // Handles both undefined and null
                obj[key] = keysObject[key];
            }
        }
        return obj;
    };

    return useQuery<TSingleTodo[], Error, TSingleTodo[]>({
        enabled: true,
        queryFn: () =>
            Api.get(`/api/todo/todos`, {
                params: cleanupEmptyKeysUtil({todoId}),
            }).then((res) => res.data),
        queryKey: ["todos", todoId],
    });
};

