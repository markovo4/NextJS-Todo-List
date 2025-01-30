"use client";

import {InputComponent} from "@/components/forms/helpers/Input.component";
import {ChangeEvent, useActionState, useEffect, useState} from "react";
import {updateTodo} from "@/app/api/actions"; // ✅ Correct action for updating
import {toast} from "react-toastify";
import Api from "@/lib/api";
import {usePathname} from "next/navigation";

const initialValues = {
    title: "",
    description: "",
    completed: false,
};

const EditTodoForm = () => {
    const pathname = usePathname();
    const todoId = pathname.split("/").at(-1);

    const [formData, setFormData] = useState(initialValues);
    const [loading, setLoading] = useState(true);

    const [state, action, pending] = useActionState(updateTodo, null)

    useEffect(() => {
        async function fetchTodo() {
            try {
                if (!todoId) return;

                const response = await Api.get(`/api/todo/todo?todo=${todoId}`);

                setFormData({
                    title: response.data.title || "",
                    description: response.data.description || "",
                    completed: response.data.completed || false,
                });

                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch todo", error);
                toast("Failed to fetch todo", {type: "error"});
                setLoading(false);
            }
        }

        fetchTodo();
    }, [todoId]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, type, checked, value} = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked || false : value
        });
    };

    if (loading) {
        return <p className="text-center text-lg font-bold">Loading...</p>;
    }

    return (
        <div className='flex items-center flex-col '>
            <h1 className='text-center text-3xl font-bold py-20'>Edit Todo</h1>
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
                                checked={formData.completed}
                                onChange={handleChange}
                            />
                            Completed
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-800 w-full rounded-md text-white py-2"
                        disabled={pending}
                    >
                        {pending ? "Updating..." : "Submit"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditTodoForm;

export type TSingleTodo = {
    id: string;
    userId: string;
    title: string;
    description: string;
    completed: boolean;
};
