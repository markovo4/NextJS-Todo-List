'use client'

import {InputComponent} from "@/components/forms/helpers/Input.component";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";

const initialValues = {
    title: '',
    description: '',
    completed: false,
}

export const CreateTodoForm = () => {
    const [formData, setFormData] = useState(initialValues);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log(formData);
    }

    useEffect(() => {

    })

    return (
        <form className={'flex flex-col items-center gap-3'} onSubmit={handleSubmit}>
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