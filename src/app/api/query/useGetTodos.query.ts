import Api from "@/lib/api";
import {useQuery} from "@tanstack/react-query";

export const getTodosQuery = () => {
    return useQuery({
        queryKey: ["todos"], // ✅ Required for caching and invalidation
        queryFn: async () => {
            const res = await Api.get(`/api/todo/todos`);
            return res.data;
        },
    });
};
