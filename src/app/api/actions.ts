"use client";

import {z} from "zod";
import {signInValidationSchema} from "@/components/forms/validationSchemas/signIn.validationSchema";
import {signUpValidationSchema} from "@/components/forms/validationSchemas/signUp.validationSchema";
import Api from "@/lib/api";
import {setCookie} from "cookies-next";

export const regUser = async (_prevState: unknown, data: FormData) => {
    const {name, lastName, email, password} = Object.fromEntries(data.entries()) as Record<string, string>;
    try {
        const validatedData = signUpValidationSchema.parse({name, email, password, lastName});
        const response = await Api.post("/api/auth/signUp", validatedData);
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
            return {
                email: errors.email?.[0] || undefined,
                password: errors.password?.[0] || undefined,
                name: errors.name?.[0] || undefined,
                lastName: errors.lastName?.[0] || undefined,
                toast: 'Bad Attempt',
                toastStatus: 'info',
                redirect: null
            };
        }
        if ((e as { status: number }).status === 409) {
            return {
                email: undefined,
                password: undefined,
                name: undefined,
                toast: 'User with such E-mail exists!',
                toastStatus: 'error',
                redirect: null
            };
        }
        return {
            email: undefined,
            password: undefined,
            name: undefined,
            toast: "Unexpected server error occurred!",
            toastStatus: 'error',
            redirect: null
        };
    }
}

export const logUser = async (_prevState: unknown, data: FormData) => {
    const {email, password} = Object.fromEntries(data.entries()) as Record<string, string>;

    try {
        const validatedData = signInValidationSchema.parse({email, password});
        const response = await Api.post("/api/auth/signIn", validatedData);

        if (response.status === 200) {
            const sessionToken = response.data.sessionToken; // Retrieve token from response body

            if (sessionToken) {
                // Store session token in httpOnly cookie
                setCookie("session", sessionToken, {
                    httpOnly: false, // `false` because client cannot set `httpOnly` cookies
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                    maxAge: 60 * 60 * 24, // 1 day
                });
            }

            return {
                toast: "Successful Log in",
                toastStatus: "success",
                redirect: "/todoList",
            };
        }
    } catch (e: unknown) {
        if (e instanceof z.ZodError) {
            const errors = e.flatten().fieldErrors;
            return {
                email: errors.email?.[0] || undefined,
                password: errors.password?.[0] || undefined,
                toast: "Bad Attempt",
                toastStatus: "info",
                redirect: null,
            };
        }
        if ((e as { status: number }).status === 404) {
            return {
                email: undefined,
                password: undefined,
                name: undefined,
                toast: 'Email or Password is Wrong!',
                toastStatus: 'error',
                redirect: null
            };
        }
        return {
            email: undefined,
            password: undefined,
            name: undefined,
            toast: "Unexpected server error occurred!",
            toastStatus: 'error',
            redirect: null
        };
    }
};

export const createTodo = async (_prevState: unknown, data: FormData) => {
    const {title, description} = Object.fromEntries(data.entries()) as Record<string, string>;

    try {
        const response = await Api.post('/api/todo/create', {title, description})

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
            toast: (e as { message: string }).message || 'Server Error',
            toastStatus: (e as { toastStatus: string }).toastStatus || 'error',
        };
    }
}

export const updateTodo = async (_prevState: unknown, data: FormData) => {
    const {title, description, completed} = Object.fromEntries(data.entries()) as Record<string, string>;

    const todoId = window.location.pathname.split('/').at(-1);
    try {
        const response = await Api.put('/api/todo/edit', {
            todoId,
            title,
            description,
            completed: !!completed
        })
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
                title: errors.title?.[0] || 'undefined',
                description: errors.description?.[0] || 'undefined',
                toast: 'Bad Attempt',
                toastStatus: 'info',
            };
        }

        return {
            title: "Unexpected error",
            description: "Unexpected error",
            toast: (e as { message: string }).message || 'Server Error',
            toastStatus: (e as { toastStatus: string }).toastStatus || 'error',
        };
    }
}