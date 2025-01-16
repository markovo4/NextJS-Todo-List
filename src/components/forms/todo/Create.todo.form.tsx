'use client'

import {InputComponent} from "@/components/forms/helpers/Input.component";
import {ChangeEvent, useActionState, useEffect, useState} from "react";
import {createTodo} from "@/app/auth/actions";
import {toast} from "react-toastify";

const initialValues = {
    title: '',
    description: '',
    completed: false,
}

const CreateTodoForm = () => {
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
        }
    }, [pending, state]);


    return (
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

            <button type="submit">
                Submit
            </button>

        </form>
    )

}

export default CreateTodoForm;