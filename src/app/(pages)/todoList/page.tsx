import CreateTodoForm from "@/components/forms/todo/Create.todo.form";
import {useGetTodosQuery} from "@/app/api/query/useGetTodos.query";

const Todolist = async () => {
    const data = await useGetTodosQuery();
    return (
        <div>
            <h1>TodoList Page</h1>
            <div>
                <CreateTodoForm/>
            </div>
            <div>
                {/* Render the list of todos */}
                {data && data?.map((todo) => (
                    <div key={todo.id}>
                        <h3>{todo.title}</h3>
                        <p>{todo.description}</p>
                        <p>{`Status: ${todo.completed}`}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Todolist;
