import axios from "axios";

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://localhost:7045/api/",
    timeout: 60000, // tempo limite de 60 segundos
    headers: {
        "Content-Type": "application/json",
    },
});

// Interceptor de requisição (opcional)
apiClient.interceptors.request.use(
    (config) => {
        // Adicione tokens de autenticação, se necessário
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem("Authorization");
            const key = localStorage.getItem("key");
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

/*
// Interceptor de resposta (opcional)
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        // Lide com erros globais, como redirecionamento ao login
        if (error.response?.status === 401) {
            if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);
*/

export default apiClient;