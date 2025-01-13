"use server";

import {z} from "zod";
import {redirect} from "next/navigation";
import {signInValidationSchema} from "@/components/forms/validationSchemas/signIn.validationSchema";
import {signUpValidationSchema} from "@/components/forms/validationSchemas/signUp.validationSchema";
import {login} from "@/lib/sessions";
import {Api} from "@/app/api/api";

export async function regUser(_prevState: unknown, data: FormData) {
    const {email, password, name} = Object.fromEntries(data.entries()) as Record<string, string>;
    try {
        const validatedData = signUpValidationSchema.parse({email, password, name});
        const response = await Api.post("/api/auth/signUp", validatedData);
        if (response.status === 201) {
            redirect('/auth/signIn')

        }
    } catch (e: unknown) {
        if (e instanceof z.ZodError) {
            const errors = e.flatten().fieldErrors;
            return {
                email: errors.email?.[0] || undefined,
                password: errors.password?.[0] || undefined,
                name: errors.name?.[0] || undefined,
                toast: 'Bad Attempt',
                toastStatus: 'info'
            };
        }
        return {
            email: "Unexpected error",
            password: "Unexpected error",
            name: "Unexpected error",
            toast: e.message || "Registration failed",
            toastStatus: e.toastStatus || 'error'
        };
    }
}

export async function logUser(_prevState: unknown, data: FormData) {
    const {email, password} = Object.fromEntries(data.entries()) as Record<string, string>;
    try {
        const validatedData = signInValidationSchema.parse({email, password});
        const response = await Api.post("/api/auth/signIn", validatedData);

        if (response.status === 200) {
            return {
                toast: 'Successful Log in',
                toastStatus: 'success'
            };
        }
    } catch (e: unknown) {
        if (e instanceof z.ZodError) {
            const errors = e.flatten().fieldErrors;
            return {
                email: errors.email?.[0] || 'undefined',
                password: errors.password?.[0] || 'undefined',
                toast: 'Bad Attempt',
                toastStatus: 'info'
            };
        }

        return {
            email: "Unexpected error",
            password: "Unexpected error",
            toast: e.message || 'Server Error',
            toastStatus: e.status || 'error'
        };
    }
    await login({email, password})
    redirect('/todoList')
}
