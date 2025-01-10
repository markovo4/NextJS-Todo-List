"use server";

import {z} from "zod";
import {redirect} from "next/navigation";

// Validation schema for incoming data
const schemaSignUp = z.object({
    email: z.string().email("Invalid email format").nonempty("Email is required"),
    password: z.string().nonempty("Password is required").min(6, "Password must be at least 6 characters"),
    name: z.string().nonempty("Password is required").min(6, "Name must be at least 6 characters")
});

const schema = z.object({
    email: z.string().email("Invalid email format").nonempty("Email is required"),
    password: z.string().nonempty("Password is required").min(6, "Password must be at least 6 characters"),
});

export async function regUser(_prevState: unknown, data: FormData) {
    try {
        // Extract and validate data from FormData
        const {email, password, name} = Object.fromEntries(data.entries()) as Record<string, string>;

        const validatedData = schemaSignUp.parse({email, password, name});

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
                message: {
                    email: errorData.message.email || "An error occurred with the email",
                    password: errorData.message.password || "An error occurred with the password",
                    name: errorData.message.name || "An error occurred with the name"
                },
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
            };
        }

        // Handle generic errors
        console.error("Unexpected error:", e);
        return {
            email: "Unexpected error occurred during registration",
            password: "Unexpected error occurred during registration",
            name: "Unexpected error occurred during registration",
        };
    }

    redirect('/auth/signIn')
}

export async function logUser(_prevState: unknown, data: FormData) {
    try {
        // Extract and validate data from FormData
        const {email, password} = Object.fromEntries(data.entries()) as Record<string, string>;

        const validatedData = schema.parse({email, password});

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
            };
        }

    } catch (e) {
        if (e instanceof z.ZodError) {
            // Handle validation errors
            const errors = e.flatten().fieldErrors;
            return {
                email: errors.email?.[0] || undefined,
                password: errors.password?.[0] || undefined,
            };
        }

        console.error("Unexpected error:", e);
        return {
            email: "Unexpected error occurred during registration",
            password: "Unexpected error occurred during registration",
        };
    }

    redirect('/todoList')
}
