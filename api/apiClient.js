import axios from "axios";
import Cookies from 'js-cookie';
import { isTokenValid, removeToken, setToken, getToken } from '../utils/auth';

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
            const token = getToken();
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
        let errorMessage = "Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente mais tarde.";

        if (error.response?.status == 401) {
            if (typeof window !== 'undefined' ) {
                removeToken();
                window.location.href = "/login";
            }
        } else if (error.response?.status === 404) {
            errorMessage = "Recurso não encontrado.";
        } else if (error.response?.status === 500) {
            errorMessage = "Erro interno do servidor.";
        }

        // Exibir a mensagem de erro para o usuário
        if (typeof window !== 'undefined') {
            alert(errorMessage);
        }

        return Promise.reject(error);
    }
);

export default apiClient;