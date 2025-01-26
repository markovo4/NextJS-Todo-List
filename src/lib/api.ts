import axios from "axios";
import {getCookie} from "cookies-next";

const getToken = () => {
    if (typeof window === 'undefined') {
        return getCookie('session', {req: undefined});
    }
    return null;
}

const Api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

Api.interceptors.request.use(
    async (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    },
    (error) => Promise.reject(error)
);

Api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.warn("Session expired, redirecting to login...");
        }
        if (typeof window !== 'undefined') {
            // window.location.href = '/auth/signIn'
        }
        return Promise.reject(error);
    }
)

export default Api;