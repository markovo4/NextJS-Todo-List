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
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    if (loading) {
        return <p className="text-center text-lg font-bold">Loading...</p>;
    }

    return (
        <div className="flex justify-center pt-10 w-[300px] mx-auto">
            <h1 className="text-center text-3xl font-bold">Edit Todo</h1>
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

                <div className="flex items-center gap-2">
                    <label className="font-semibold">Completed:</label>
                    <input
                        type="checkbox"
                        checked={formData.completed}
                        onChange={() =>
                            setFormData({
                                ...formData,
                                completed: !formData.completed,
                            })
                        }
                    />
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
