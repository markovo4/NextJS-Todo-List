import Api from "@/lib/api";

export const getTodosQuery = async () => {
    const response = await Api.get(`/api/todo/todos`);
    return response.data;

}

