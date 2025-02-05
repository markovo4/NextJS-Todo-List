'use client'
import CreateTodoForm from "@/components/forms/todo/Create.todo.form";
import Api from "@/lib/api";
import {toast} from "react-toastify";
import Link from "next/link";
import {useQueryClient} from "@tanstack/react-query";
import {useGetTodosQuery} from "@/app/api/query/useGetTodos.query";

const Todolist = () => {
    const data = useGetTodosQuery();
    const queryClient = useQueryClient();

    const handleDelete = async (todoId: string) => {
        try {
            await Api.post("/api/todo/delete", {todoId});
            toast("Todo deleted", {type: "success"});
            await queryClient.invalidateQueries({queryKey: ["todos"]});
        } catch (err) {
            toast("Failed to delete todo", {type: "error"});
        }
    };

    const handleCheckboxToggle = async (todoId: string, newStatus: boolean) => {
        try {
            await Api.put("/api/todo/edit", {todoId, completed: newStatus});
            await queryClient.invalidateQueries({queryKey: ["todos"]});
            toast(`Todo marked as ${newStatus ? "Completed" : "Pending"}`, {type: "success"});
        } catch (err) {
            toast("Failed to update todo", {type: "error"});
        }
    };


    return (
        data?.data && <div className='flex flex-col gap-10 pt-10'>
            <h1 className='text-center text-3xl font-bold'>TodoList</h1>
            <div>
                <CreateTodoForm/>
            </div>
            <div className='flex flex-wrap gap-3 justify-center'>
                {/* Render the list of todos */}
                {data?.data?.length > 0 ? (
                    data?.data.map((todo) => (
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
                                            onClick={() => queryClient.invalidateQueries({queryKey: ["todos"]})}
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

