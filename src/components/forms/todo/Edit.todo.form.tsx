"use client";

import {InputComponent} from "@/components/forms/helpers/Input.component";
import {ChangeEvent, useActionState, useEffect, useState} from "react";
import {updateTodo} from "@/app/api/actions"; // ✅ Correct action for updating
import {usePathname} from "next/navigation";
import {useQueryClient} from "@tanstack/react-query";
import {useGetTodosQuery} from "@/app/api/query/useGetTodos.query";

const initialValues = {
    title: "",
    description: "",
    completed: false,
};

const EditTodoForm = () => {
    const pathname = usePathname();
    const todoId = pathname.split("/").at(-1);
    const queryClient = useQueryClient();

    const todoToEdit = useGetTodosQuery({todoId});
    const [formData, setFormData] = useState(initialValues);
    const [loading, setLoading] = useState(true);
    const [isChecked, setIsChecked] = useState(formData.completed);

    const [state, action, pending] = useActionState(updateTodo, null)
    useEffect(() => {

        setFormData({
            title: todoToEdit.data?.todo.title || "",
            description: todoToEdit.data?.todo.description || "",
            completed: todoToEdit.data?.todo.completed,
        });

        setLoading(false);
    }, [todoToEdit?.data])


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, type, checked, value} = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? setIsChecked(checked || false) : value
        });
    };

    if (loading) {
        return <p className="text-center text-lg font-bold">Loading...</p>;
    }

    return (
        todoToEdit?.data && <div className='flex items-center flex-col '>
            <div className='bg-gray-500 w-[400px] h-[300px] flex justify-center items-center rounded-2xl'>
                <form
                    className="flex flex-col items-center gap-3"
                    action={action}
                >
                    <InputComponent
                        value={formData.title}
                        onChange={handleChange}
                        label="Title"
                        id="title"
                        type="text"
                        name="title"
                        errorMessage={state?.title}
                    />

                    <InputComponent
                        value={formData.description}
                        onChange={handleChange}
                        label="Description"
                        id="description"
                        type="text"
                        name="description"
                        errorMessage={state?.description}
                    />

                    <div className="w-full flex items-center gap-2">
                        <label htmlFor="completed" className="font-semibold flex items-center gap-2 cursor-pointer">
                            <input
                                id="completed"
                                type="checkbox"
                                name="completed"
                                className="w-5 h-5 cursor-pointer accent-blue-600" // Added styles
                                checked={isChecked}
                                onChange={handleChange}
                            />
                            Completed
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-800 w-full rounded-md text-white py-2"
                        disabled={pending}
                        onClick={() => queryClient.invalidateQueries({queryKey: ['todos']})}
                    >
                        {pending ? "Updating..." : "Submit"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditTodoForm;
