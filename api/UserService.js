import apiClient from './apiClient';

const API_ENDPOINT = 'user'; // Substitua pelo seu endpoint da API

export const login = async (username, password) => {
    try {
        const response = await apiClient.post(
            `${API_ENDPOINT}/login`, // Ajuste o endpoint conforme necessário
            { username, password }
        );
        return response;
    } catch (error) {
        throw error;
    }
};

export const createAccount = async (username, password, email) => {
    try {
        const response = await apiClient.post(
            `${API_ENDPOINT}/register`, // Ajuste o endpoint conforme necessário
            { username, password, email }
        );
        if (response.status >= 200 && response.status < 300) {
            return true;
        }
        return false;
    } catch (error) {
        throw error;
    }
};

export const forgotPassword = async (email) => {
    try {
        const response = await apiClient.post(
            `${API_ENDPOINT}/forgot-password`, // Ajuste o endpoint conforme necessário
            { email }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};