"use server";
import {prisma} from "@/lib/prisma";
import {User} from "@prisma/client";
import {redirect} from "next/navigation";

export async function regUser(data: FormData) {
    const {email, password} = Object.fromEntries(data) as Omit<User, "id">;

    const user = await prisma.user.create({
        data: {
            email,
            password
        }
    });
    console.log(user)
}

export async function logUser(data: FormData) {
    const {email, password} = Object.fromEntries(data) as User;

    const user = await prisma.user.findFirst({
        where: {
            email,
            password
        }
    });

    if (user) {
        return redirect('/todoList')
    } else {
        return redirect('/auth')
    }
}