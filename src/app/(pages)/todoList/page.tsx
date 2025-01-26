'use client'
import CreateTodoForm from "@/components/forms/todo/Create.todo.form";
import {useEffect, useState} from "react";
import Api from "@/lib/api";
import {toast} from "react-toastify";
import {getTodosQuery} from "@/app/api/query/useGetTodos.query";

const Todolist = () => {
    const [todos, setTodos] = useState<TSingleTodo[]>([]);
    console.log(todos)

    const handleDelete = async (todoId: string) => {
        try {
            await Api.post("/api/todo/delete", {todoId});
            toast("Todo deleted", {type: "success"});

            setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
        } catch (error) {
            toast("Failed to delete todo", {type: "error"});
        }
    };

    useEffect(() => {
        async function fetchTodos() {
            const data = await getTodosQuery();
            setTodos(data);
        }

        fetchTodos();
    }, []);


    return (
        <div>
            <h1>TodoList Page</h1>
            <div>
                <CreateTodoForm/>
            </div>
            <div>
                {/* Render the list of todos */}
                {todos?.length > 0 ? (
                    todos.map((todo) => (
                        <div key={todo.id} style={{border: "1px solid #ccc", padding: "10px", margin: "10px 0"}}>
                            <h3>{todo.title}</h3>
                            <p>{todo.description}</p>
                            <p>{`Status: ${todo.completed ? "Completed" : "Pending"}`}</p>
                            <button className={'bg-red-800 px-2 py-1 rounded-2xl text-sm'}
                                    onClick={() => handleDelete(todo.id)}>
                                Delete Todo
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No todos available. Please add one!</p>
                )}
            </div>
        </div>
    );
};

export default Todolist;

export type TSingleTodo = {
    id: string;
    userId: string;
    title: string;
    description: string;
    completed: boolean;
};

