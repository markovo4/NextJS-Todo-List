"use client";

import {InputComponent} from "@/components/forms/helpers/Input.component";
import {ChangeEvent, useEffect, useState} from "react";
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
    const todoId = pathname.split("/").at(-1); // ✅ Correct way to get `todoId`

    const [currentTodo, setCurrentTodo] = useState<TSingleTodo | null>(null);
    const [formData, setFormData] = useState(initialValues);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    // 🔹 Fetch Todo When Component Mounts
    useEffect(() => {
        async function fetchTodo() {
            try {
                if (!todoId) return;

                const response = await Api.get(`/api/todo/todos/${todoId}`);
                setCurrentTodo(response.data);

                // ✅ Set form data with the fetched todo
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

    // 🔹 Handle Input Changes
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    // 🔹 Handle Form Submission (Update Todo)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!todoId) return;

        setUpdating(true);

        try {
            await updateTodo(todoId, formData);
            toast("Todo updated successfully", {type: "success"});
        } catch (error) {
            toast("Failed to update todo", {type: "error"});
            console.error(error);
        } finally {
            setUpdating(false);
        }
    };

    // 🔹 Show Loading State Until Data is Fetched
    if (loading) {
        return <p className="text-center text-lg font-bold">Loading...</p>;
    }

    return (
        <div className="flex justify-center pt-10 w-[300px] mx-auto">
            <h1 className="text-center text-3xl font-bold">Edit Todo</h1>
            <form
                className="flex flex-col items-center gap-3"
                onSubmit={handleSubmit}
            >
                <InputComponent
                    value={formData.title}
                    onChange={handleChange}
                    label="Title"
                    id="title"
                    type="text"
                    name="title"
                />

                <InputComponent
                    value={formData.description}
                    onChange={handleChange}
                    label="Description"
                    id="description"
                    type="text"
                    name="description"
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
                    disabled={updating}
                >
                    {updating ? "Updating..." : "Submit"}
                </button>
            </form>
        </div>
    );
};

export default EditTodoForm;

// 🔹 Define the Todo Type
export type TSingleTodo = {
    id: string;
    userId: string;
    title: string;
    description: string;
    completed: boolean;
};
