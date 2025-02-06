import axios from "axios";
import Cookies from 'js-cookie';

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://localhost:7045/api/",
    timeout: 60000, 
    headers: {
        "Content-Type": "application/json",
    },
});

apiClient.interceptors.request.use(
    (config) => {

        if (typeof window !== 'undefined') {
            const token = Cookies.get("Authorization");
            const key = Cookies.get("key");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
                config.headers.key = key;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
       
        if (error.response?.status === 401) {
            if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
                localStorage.removeItem("Authorization");
                localStorage.removeItem("key");
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);


export default apiClient;