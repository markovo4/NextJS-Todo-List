'use client'

import CreateTodoForm from "@/components/forms/todo/Create.todo.form";
import {useGetTodosQuery} from "@/app/api/query/useGetTodos.query";

const Todolist = () => {
    const {data: todos, isError, isLoading, error} = useGetTodosQuery();

    // Optional: handle the error state more explicitly
    if (isError) {
        console.error("Error fetching todos:", error);
        return <div>Error fetching todos.</div>;
    }

    // Optional: handle loading state
    if (isLoading) {
        return <div>Loading todos...</div>;
    }

    // Logs the todos when they are successfully fetched
    if (todos) {
        console.log(todos);
    }

    return (
        <div>
            <h1>TodoList Page</h1>
            <div>
                <CreateTodoForm/>
            </div>
            <div>
                {/* Render the list of todos */}
                {todos && todos.map((todo) => (
                    <div key={todo.id}>
                        <h3>{todo.title}</h3>
                        <p>{todo.description}</p>
                        <p>Status: {todo.completed ? 'Completed' : 'Pending'}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Todolist;
