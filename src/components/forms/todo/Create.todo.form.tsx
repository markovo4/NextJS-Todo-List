'use client'

import {InputComponent} from "@/components/forms/helpers/Input.component";
import {ChangeEvent, useActionState, useEffect, useState} from "react";
import {createTodo} from "@/app/api/actions";
import {toast} from "react-toastify";
import {useQueryClient} from "@tanstack/react-query";
import clsx from "clsx";

const initialValues = {
    title: '',
    description: '',
    completed: false,
}

const CreateTodoForm = () => {
    const queryClient = useQueryClient();
    const notify = () => toast(`${state?.toast}`, {type: state?.toastStatus});

    const [formData, setFormData] = useState(initialValues);

    const [state, action, pending] = useActionState(createTodo, null)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }

    useEffect(() => {
        if (!pending && state?.toast) {
            notify();
            queryClient.invalidateQueries({queryKey: ['todos']})
        }

    }, [pending, state]);


    return (
        <div className='flex items-center flex-col '>
            <div className='bg-gray-500 w-[400px] h-[300px] flex justify-center items-center rounded-2xl'>
                <form className={'flex flex-col items-center gap-3'} action={action}>
                    <InputComponent
                        value={formData.title}
                        onChange={handleChange}
                        label={'title'}
                        id={"title"}
                        type={"text"}
                        name={"title"}/>

                    <InputComponent
                        value={formData.description}
                        onChange={handleChange}
                        label={"description"}
                        id={"description"}
                        type={"text"}
                        name={"description"}/>

                    <button
                        type="submit"
                        className={clsx(pending ? 'bg-gray-500' : 'bg-blue-100', 'hover:bg-gray-300 transition text-black w-[224px] rounded-md mt-2 py-1')}
                        disabled={pending}
                    >
                        {pending ? "Creating..." : "Submit"}
                    </button>

                </form>
            </div>
        </div>
    )

}

export default CreateTodoForm;