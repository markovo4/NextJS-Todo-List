import {QueryClient} from "@tanstack/react-query";

// Create a query client instance
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
            retry: 2, // Retry failed queries twice
        },
    },
});