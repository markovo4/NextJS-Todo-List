'use client';

import {regUser} from "@/app/(pages)/auth/actions";
import React, {useActionState, useState} from "react";

export const initialValues = {
    email: '',
    password: '',
}

const SignUpForm = () => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setFormData({...formData, [name]: value})
    }

    const [formData, setFormData] = useState(initialValues)
    const [state, action, pending] = useActionState(regUser, null)

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
                <small className={'text-red-700 font-bold text-xs mt-1'}>{state?.message.email}</small>
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
                <small className={'text-red-700 font-bold text-xs mt-1'}>{state?.message.password}</small>

            </div>

            <button type={'submit'} className={'bg-blue-100 text-black w-[200px] rounded-md mt-2'}>
                Submit
            </button>
        </form>
    )
}

export default SignUpForm;