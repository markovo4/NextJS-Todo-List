"use server";
import {User} from "@prisma/client";

export async function regUser(data: FormData) {
    const {email, password} = Object.fromEntries(data) as Omit<User, "id">;

    const res = await fetch('http://localhost:3000/api/auth/signUp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    })

    const dataJson = await res.json();

    console.log(dataJson);
}

// export async function logUser(data: FormData) {
//     const {email, password} = Object.fromEntries(data) as User;
//
//     const user = await prisma.user.findFirst({
//         where: {
//             email,
//             password
//         }
//     });
//
//     if (user) {
//         return redirect('/todoList')
//     } else {
//         return redirect('/auth')
//     }
// }