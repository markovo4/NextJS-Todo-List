"use server";

import {z} from "zod";
import {redirect} from "next/navigation";
import {signInValidationSchema} from "@/components/forms/validationSchemas/signIn.validationSchema";
import {signUpValidationSchema} from "@/components/forms/validationSchemas/signUp.validationSchema";
import {login} from "@/lib/sessions";

export async function regUser(_prevState: unknown, data: FormData) {
    const {email, password, name} = Object.fromEntries(data.entries()) as Record<string, string>;
    try {
        const validatedData = signUpValidationSchema.parse({email, password, name});

        // Send data to the server
        const response = await fetch("http://localhost:3000/api/auth/signUp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(validatedData),
        });

        // Handle server response
        if (!response.ok) {
            const errorData = await response.json();
            return {
                email: errorData.message.email || "An error occurred with the email",
                password: errorData.message.password || "An error occurred with the password",
                name: errorData.message.name || "An error occurred with the name",
                toast: errorData.message || null,
                toastStatus: errorData.toastStatus || 'info'
            };
        }
    } catch (e) {
        if (e instanceof z.ZodError) {
            // Handle validation errors
            const errors = e.flatten().fieldErrors;
            return {
                email: errors.email?.[0] || undefined,
                password: errors.password?.[0] || undefined,
                name: errors.name?.[0] || undefined,
                toast: 'Bad Attempt',
                toastStatus: 'info'
            };
        }

        // Handle generic errors
        console.error("Unexpected error:", e);
        return {
            email: "Unexpected error occurred during registration",
            password: "Unexpected error occurred during registration",
            name: "Unexpected error occurred during registration",
            toast: 'Server Error',
            toastStatus: 'error'
        };
    }

    await login({email, password})
    redirect('/auth/signIn')
}

export async function logUser(_prevState: unknown, data: FormData) {
    const {email, password} = Object.fromEntries(data.entries()) as Record<string, string>;
    try {
        const validatedData = signInValidationSchema.parse({email, password});

        // Send data to the server
        const response = await fetch("http://localhost:3000/api/auth/signIn", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(validatedData),
        });

        // Handle server response
        if (!response.ok) {
            const errorData = await response.json();
            return {
                email: errorData.email || "An error occurred with the email",
                password: errorData.password || "An error occurred with the password",
                toast: errorData.message || null,
                toastStatus: errorData.toastStatus || 'info'
            };
        }
    } catch (e) {
        if (e instanceof z.ZodError) {
            // Handle validation errors
            const errors = e.flatten().fieldErrors;
            return {
                email: errors.email?.[0] || 'undefined',
                password: errors.password?.[0] || 'undefined',
                toast: 'Bad Attempt',
                toastStatus: 'info'
            };
        }

        console.error("Unexpected error:", e);
        return {
            email: "Unexpected error occurred during registration",
            password: "Unexpected error occurred during registration",
            toast: 'Server Error',
            toastStatus: 'error'
        };
    }
    await login({email, password})
    redirect('/todoList')
}
