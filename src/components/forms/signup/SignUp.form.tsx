'use client';

import {useFormik} from "formik";
import Cookies from 'js-cookie';
import signUpValidationSchema from "@/components/forms/signup/signUp.validationSchema";
import {useRouter} from "next/navigation";

const initialValues = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
}

const SignUpForm = () => {

    const router = useRouter();

    const submitHandler = (values: typeof initialValues) => {
        Cookies.set('authorized', 'true');
        const token = Cookies.get('authorized');
        console.log(values)
        console.log(token)
        resetForm()
        router.push('/todoList')
    }

    const formik = useFormik({
        initialValues,
        onSubmit: submitHandler,
        validationSchema: signUpValidationSchema
    });
    const {values, handleChange, handleSubmit, resetForm, errors} = formik;

    return (
        <form className={'flex flex-col items-center gap-3'} onSubmit={handleSubmit}>
            <div className={'flex flex-col'}>
                <label htmlFor={'firstName'}>First name</label>
                <input
                    className={'bg-white rounded-md  text-black px-1'}
                    type={'firstName'}
                    id={'firstName'}
                    name={'firstName'}
                    value={values.firstName}
                    onChange={handleChange}
                />
                <small className={'text-red-700 font-bold text-xs mt-1'}>{errors.firstName}</small>
            </div>
            <div className={'flex flex-col'}>
                <label htmlFor={'lastName'}>Last name</label>
                <input
                    className={'bg-white rounded-md  text-black px-1'}
                    type={'lastName'}
                    id={'lastName'}
                    name={'lastName'}
                    value={values.lastName}
                    onChange={handleChange}
                />
                <small className={'text-red-700 font-bold text-xs mt-1'}>{errors.lastName}</small>
            </div>
            <div className={'flex flex-col'}>
                <label htmlFor={'email'}>Email</label>
                <input
                    className={'bg-white rounded-md  text-black px-1'}
                    type={'email'}
                    id={'email'}
                    name={'email'}
                    value={values.email}
                    onChange={handleChange}
                />
                <small className={'text-red-700 font-bold text-xs mt-1'}>{errors.email}</small>
            </div>
            <div className={'flex flex-col'}>
                <label htmlFor={'password'}>Password</label>
                <input
                    className={'bg-white rounded-md  text-black px-1'}
                    type={'password'}
                    id={'password'}
                    name={'password'}
                    value={values.password}
                    onChange={handleChange}
                />
                <small className={'text-red-700 font-bold text-xs mt-1'}>{errors.password}</small>

            </div>

            <button type={'submit'} className={'bg-blue-100 text-black w-[200px] rounded-md mt-2'}>
                Submit
            </button>
        </form>
    )
}

export default SignUpForm;