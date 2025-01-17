'use client'
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "@/lib/queryClient";
import {FC, ReactNode} from "react";

export const ReactQueryProvider: FC<ReactQueryProviderProps> = ({children}) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}

export type ReactQueryProviderProps = {
    children: ReactNode
}