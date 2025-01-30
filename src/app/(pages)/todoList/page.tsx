'use client'
import CreateTodoForm from "@/components/forms/todo/Create.todo.form";
import {useEffect, useState} from "react";
import Api from "@/lib/api";
import {toast} from "react-toastify";
import {getTodosQuery} from "@/app/api/query/useGetTodos.query";
import Link from "next/link";

const Todolist = () => {
    const [todos, setTodos] = useState<TSingleTodo[]>([]);

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

    const handleCheckboxToggle = async (todoId: string, newStatus: boolean) => {
        try {
            await Api.put("/api/todo/update", {todoId, completed: newStatus});

            setTodos((prevTodos) =>
                prevTodos.map((todo) =>
                    todo.id === todoId ? {...todo, completed: newStatus} : todo
                )
            );

            toast(`Todo marked as ${newStatus ? "Completed" : "Pending"}`, {type: "success"});
        } catch (error) {
            toast("Failed to update todo", {type: "error"});
        }
    };


    return (
        <div className='flex flex-col gap-10 pt-10'>
            <h1 className='text-center text-3xl font-bold'>TodoList</h1>
            <div>
                <CreateTodoForm/>
            </div>
            <div className='flex flex-wrap gap-3 justify-center'>
                {/* Render the list of todos */}
                {todos?.length > 0 ? (
                    todos.map((todo) => (
                        <div key={todo.id}
                             className='bg-blue-100 text-black p-5 w-[30%] rounded-md flex flex-col gap-3'>
                            <div className='flex gap-3'>
                                <p className='font-bold text-md'>Title:</p>
                                <h5 className='bg-blue-200 w-[100%] text-xl rounded-md px-2'>{todo.title}</h5>
                            </div>
                            <div className='flex gap-3'>
                                <p className='font-bold text-sm '>SubTitle:</p>
                                <p className='bg-blue-200 w-[100%] rounded-md px-2'>{todo.description}</p>
                            </div>


                            <div className='flex items-center gap-3'>
                                <label>Is completed?</label>
                                <input
                                    className='bg-white w-3 h-3'
                                    type="checkbox"
                                    checked={todo.completed}
                                    onChange={() => handleCheckboxToggle(todo.id, !todo.completed)}
                                />
                            </div>
                            <div className='flex items-center gap-5 text-amber-50 font-bold'>
                                <Link href={`/todoList/${todo.id}`}>
                                    <button className={'bg-cyan-600 px-2 py-1 rounded-md text-sm'}
                                    >
                                        Edit Todo
                                    </button>
                                </Link>


                                <button className={'bg-red-800 px-2 py-1 rounded-md text-sm'}
                                        onClick={() => handleDelete(todo.id)}>
                                    Delete Todo
                                </button>
                            </div>

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

