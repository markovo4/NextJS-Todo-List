'use client';
import {useFormik} from "formik";
import signInValidationSchema from "@/components/forms/signIn/signIn.validationSchema";

const initialValues = {
    email: '',
    password: '',
}

const SignInForm = () => {

    const submitHandler = (values: typeof initialValues) => {
        console.log(values);
        resetForm()
    }

    const formik = useFormik({
        initialValues,
        onSubmit: submitHandler,
        validationSchema: signInValidationSchema
    });

    const {values, handleChange, handleSubmit, resetForm, errors} = formik;
    return (
        <form className={'flex flex-col items-center gap-3'} onSubmit={handleSubmit}>
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

export default SignInForm;