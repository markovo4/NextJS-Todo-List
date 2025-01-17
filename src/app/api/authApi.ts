import axios, {AxiosError} from 'axios';

const authApi = axios.create();

authApi.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL

authApi.interceptors.response.use(undefined, async (error: AxiosError<{ error?: Error }>) => {

    return Promise.reject(error)
});

export {authApi};