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
        <form className={'flex flex-col items-center gap-3'} action={action}>
            <InputComponent
                type={'email'}
                id={'email'}
                name={'email'}
                value={formData.email}
                onChange={handleChange}
                label={"email"}
                errorMessage={state?.email}
            />

            <InputComponent
                type={'password'}
                id={'password'}
                name={'password'}
                value={formData.password}
                onChange={handleChange}
                label={"password"}
                errorMessage={state?.password}
            />

            <InputComponent
                type={'text'}
                id={'name'}
                name={'name'}
                value={formData.name}
                onChange={handleChange}
                label={"name"}
                errorMessage={state?.name}
            />

            <button
                type={'submit'}
                className={clsx(pending ? 'bg-gray-500' : 'bg-blue-100', 'text-black w-[200px] rounded-md mt-2')}
                disabled={pending}
            >
                Submit
            </button>
        </form>
    );
};

export default SignUpForm;
