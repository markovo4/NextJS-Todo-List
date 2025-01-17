import CreateTodoForm from "@/components/forms/todo/Create.todo.form";
import {getTodosQuery} from "@/app/api/query/useGetTodos.query";

const Todolist = async () => {
    try {
        // Fetch todos
        const data: TSingleTodo[] = await getTodosQuery();

        return (
            <div>
                <h1>TodoList Page</h1>
                <div>
                    <CreateTodoForm/>
                </div>
                <div>
                    {/* Render the list of todos */}
                    {data?.length > 0 ? (
                        data.map((todo) => (
                            <div key={todo.id} style={{border: "1px solid #ccc", padding: "10px", margin: "10px 0"}}>
                                <h3>{todo.title}</h3>
                                <p>{todo.description}</p>
                                <p>{`Status: ${todo.completed ? "Completed" : "Pending"}`}</p>
                            </div>
                        ))
                    ) : (
                        <p>No todos available. Please add one!</p>
                    )}
                </div>
            </div>
        );
    } catch (error) {
        console.error("Error fetching todos:", error);
        return (
            <div>
                <h1>TodoList Page</h1>
                <p>Failed to load todos. Please try again later.</p>
            </div>
        );
    }
};

export default Todolist;

export type TSingleTodo = {
    id: string;
    userId: string;
    title: string;
    description: string;
    completed: boolean;
};
