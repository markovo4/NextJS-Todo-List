"use client";
import Link from "next/link";
import {usePathname} from "next/navigation";
import clsx from "clsx";
import Api from "@/lib/api";

export const Nav = () => {
    const pathname = usePathname();
    const handleLogOut = async () => {
        try {
            const response = await Api.post('/api/auth/logout')
            if (response.status === 200) {
                window.location.href = "/auth"; // Redirect to login page after logout
            }
        } catch (error) {
            console.error("Logout failed", error);
        }
    }


    return (
        !(Object.values(Auth).includes(pathname as Auth)) &&
        <div className="bg-gray-500 h-[40px] flex items-center justify-between p-4">
            <div className='flex items-center  gap-3'>
                <Link
                    href={"/todoList"}
                    className={clsx(
                        pathname === Navigation.todoList ? "bg-gray-600 cursor-none" : "hover:bg-gray-600",
                        "h-[40px] flex items-center px-3 font-semibold"
                    )}
                >
                    TodoList
                </Link>
                <Link
                    href={"/"}
                    className={clsx(
                        pathname === Navigation.dashboard ? "bg-gray-600 cursor-none" : "hover:bg-gray-600",
                        "h-[40px] flex items-center px-3 font-semibold"
                    )}
                >
                    Dashboard
                </Link>
            </div>


            <div className='bg-red-700 h-[40px] px-3 font-semibold flex items-center'>
                <button onClick={handleLogOut}>
                    Log out
                </button>
            </div>
        </div>
    );
};

export const enum Navigation {
    dashboard = "/",
    todoList = "/todoList",
}

export enum Auth {
    mainAuth = "/auth",
    signIn = "/auth/signIn",
    signUp = "/auth/signup",
}