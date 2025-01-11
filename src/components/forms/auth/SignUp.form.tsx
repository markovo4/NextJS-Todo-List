'use client';

import {regUser} from "@/app/auth/actions";
import React, {useActionState, useEffect, useState} from "react";
import clsx from "clsx";
import {toast} from "react-toastify";

export const initialValues = {
    email: '',
    password: '',
    name: '',
};

const SignUpForm = () => {
    const notify = () => toast(`${state?.toast}`, {type: state?.toastStatus});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const [formData, setFormData] = useState(initialValues);
    const [state, action, pending] = useActionState(regUser, null);

    // Monitor the pending state and call notify when it becomes false
    useEffect(() => {
        if (!pending && state?.toast) {
            notify();
        }
    }, [pending, state]);

    return (
        <form className={'flex flex-col items-center gap-3'} action={action}>
            <div className={'flex flex-col'}>
                <label htmlFor={'email'}>Email</label>
                <input
                    className={'bg-white rounded-md text-black px-1'}
                    type={'email'}
                    id={'email'}
                    name={'email'}
                    value={formData.email}
                    onChange={handleChange}
                />
                <small className={'text-red-700 font-bold text-xs mt-1'}>{state?.email}</small>
            </div>
            <div className={'flex flex-col'}>
                <label htmlFor={'password'}>Password</label>
                <input
                    className={'bg-white rounded-md text-black px-1'}
                    type={'password'}
                    id={'password'}
                    name={'password'}
                    value={formData.password}
                    onChange={handleChange}
                />
                <small className={'text-red-700 font-bold text-xs mt-1'}>{state?.password}</small>
            </div>
            <div className={'flex flex-col'}>
                <label htmlFor={'name'}>Name</label>
                <input
                    className={'bg-white rounded-md text-black px-1'}
                    type={'text'}
                    id={'name'}
                    name={'name'}
                    value={formData.name}
                    onChange={handleChange}
                />
                <small className={'text-red-700 font-bold text-xs mt-1'}>{state?.name}</small>
            </div>
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
