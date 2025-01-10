'use client';
import {logUser} from "@/app/auth/actions";
import React, {useActionState, useState} from "react";
import clsx from "clsx";
import {initialValues} from "@/components/forms/auth/SignUp.form";


const SignInForm = () => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setFormData({...formData, [name]: value})
    }

    const [formData, setFormData] = useState(initialValues)
    const [state, action, pending] = useActionState(logUser, null)

    return (
        <form className={'flex flex-col items-center gap-3'} action={action}>
            <div className={'flex flex-col'}>
                <label htmlFor={'email'}>Email</label>
                <input
                    className={'bg-white rounded-md  text-black px-1'}
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
                    className={'bg-white rounded-md  text-black px-1'}
                    type={'password'}
                    id={'password'}
                    name={'password'}
                    value={formData.password}
                    onChange={handleChange}
                />
                <small className={'text-red-700 font-bold text-xs mt-1'}>{state?.password}</small>

            </div>

            <button type={'submit'}
                    className={clsx(pending ? 'bg-gray-500' : 'bg-blue-100', 'text-black w-[200px] rounded-md mt-2')}>
                Submit
            </button>
        </form>
    )
}

export default SignInForm;