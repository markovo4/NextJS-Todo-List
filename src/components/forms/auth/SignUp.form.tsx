'use client';

import {regUser} from "@/app/api/actions";
import React, {useActionState, useEffect, useState} from "react";
import clsx from "clsx";
import {toast, TypeOptions} from "react-toastify";
import {useRouter} from "next/navigation";
import {InputComponent} from "@/components/forms/helpers/Input.component";

export const initialValues = {
    email: '',
    password: '',
    name: '',
    lastName: '',
};

const SignUpForm = () => {
    const notify = () => toast(`${state?.toast}`, {type: state?.toastStatus as TypeOptions});
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const [formData, setFormData] = useState(initialValues);
    const [state, action, pending] = useActionState(regUser, null);

    useEffect(() => {
        if (!pending && state?.toast) {
            notify();
        }

        if (state?.redirect) {
            return router.push(state.redirect);
        }
    }, [pending, state]);

    console.log(state)

    return (
        <form className={'flex flex-col items-center'} action={action}>
            <InputComponent
                type={'text'}
                id={'name'}
                name={'name'}
                value={formData.name}
                onChange={handleChange}
                label={"Name"}
                errorMessage={state?.name}
            />

            <InputComponent
                type={'text'}
                id={'lastName'}
                name={'lastName'}
                value={formData.lastName}
                onChange={handleChange}
                label={"Last Name"}
                errorMessage={state?.lastName}
            />
            
            <InputComponent
                type={'text'}
                id={'email'}
                name={'email'}
                value={formData.email}
                onChange={handleChange}
                label={"E-mail"}
                errorMessage={state?.email}
            />

            <InputComponent
                type={'password'}
                id={'password'}
                name={'password'}
                value={formData.password}
                onChange={handleChange}
                label={"Password"}
                errorMessage={state?.password}
            />

            <button
                type={'submit'}
                className={clsx(pending ? 'bg-gray-500' : 'bg-blue-100', 'hover:bg-gray-300 transition text-black w-[224px] rounded-md mt-2 py-1')}
                disabled={pending}
            >
                Submit
            </button>
        </form>
    );
};

export default SignUpForm;
