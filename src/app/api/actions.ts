"use server";

import {z} from "zod";
import {signInValidationSchema} from "@/components/forms/validationSchemas/signIn.validationSchema";
import {signUpValidationSchema} from "@/components/forms/validationSchemas/signUp.validationSchema";
import {getSession, login} from "@/lib/sessions";
import {Api} from "@/app/api/api";
import {authApi} from "@/app/api/authApi";

export const regUser = async (_prevState: unknown, data: FormData) => {
    const {name, email, password} = Object.fromEntries(data.entries()) as Record<string, string>;
    try {
        const validatedData = signUpValidationSchema.parse({name, email, password});
        const response = await authApi.post("/api/auth/signUp", validatedData);
        if (response.status === 201) {
            return {
                toast: 'Registered Successfully',
                toastStatus: 'success',
                redirect: '/auth/signIn'
            }
        }
    } catch (e: unknown) {
        if (e instanceof z.ZodError) {
            const errors = e.flatten().fieldErrors;
            console.log(errors)
            return {
                email: errors.email?.[0] || undefined,
                password: errors.password?.[0] || undefined,
                name: errors.name?.[0] || undefined,
                toast: 'Bad Attempt',
                toastStatus: 'info',
                redirect: null
            };
        }
        return {
            email: "Unexpected error",
            password: "Unexpected error",
            name: "Unexpected error",
            toast: e.message || "Registration failed",
            toastStatus: e.toastStatus || 'error',
            redirect: null
        };
    }
}

export const logUser = async (_prevState: unknown, data: FormData) => {
    const {email, password} = Object.fromEntries(data.entries()) as Record<string, string>;
    try {
        const validatedData = signInValidationSchema.parse({email, password});
        const response = await authApi.post("/api/auth/signIn", validatedData);
        if (response.status === 200) {
            await login({email, password, userId: response.data.userId})
            return {
                toast: 'Successful Log in',
                toastStatus: 'success',
                redirect: '/todoList'
            };
        }
    } catch (e: unknown) {
        if (e instanceof z.ZodError) {
            const errors = e.flatten().fieldErrors;
            return {
                email: errors.email?.[0] || 'undefined',
                password: errors.password?.[0] || 'undefined',
                toast: 'Bad Attempt',
                toastStatus: 'info',
                redirect: null
            };
        }

        return {
            email: "Unexpected error",
            password: "Unexpected error",
            toast: e.message || 'Server Error',
            toastStatus: e.toastStatus || 'error',
            redirect: null
        };
    }
}

export const createTodo = async (_prevState: unknown, data: FormData) => {
    const session = await getSession()
    const {title, description} = Object.fromEntries(data.entries()) as Record<string, string>;

    try {
        const response = await Api.post('/api/todo/create', {userId: session?.user.userId, title, description})

        if (response.status === 201) {
            return {
                toast: 'Todo created Successfully!',
                toastStatus: 'success',
            }
        }

    } catch (e: unknown) {
        if (e instanceof z.ZodError) {
            const errors = e.flatten().fieldErrors;
            return {
                email: errors.email?.[0] || 'undefined',
                password: errors.password?.[0] || 'undefined',
                toast: 'Bad Attempt',
                toastStatus: 'info',
            };
        }

        return {
            email: "Unexpected error",
            password: "Unexpected error",
            toast: e.message || 'Server Error',
            toastStatus: e.toastStatus || 'error',
        };
    }
}
