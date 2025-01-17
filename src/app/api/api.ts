import axios, {AxiosError} from "axios";

// Ensure you use localStorage for client-side authentication token
const Api = axios.create({
    withCredentials: true,
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    }
});

Api.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem('session'); // use localStorage on the client-side
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

Api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        const formattedError = {
            status: error.response?.status || 500,
            message: error.response?.data?.message || "An unexpected error occurred.",
            toastsStatus: 'error',
            ...(error.response?.data || {}),
        };
        console.error("Axios error:", formattedError);
        return Promise.reject(formattedError);
    }
);

export {Api};
