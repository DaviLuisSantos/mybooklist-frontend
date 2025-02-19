import apiClient from './apiClient';

const API_ENDPOINT = 'user';

export const loginUser = async (email, password) => {
    try {
        const response = await apiClient.post(
            `${API_ENDPOINT}/login`,
            { email, password }
        );
        return response;
    } catch (error) {
        throw error;
    }
};

export const createAccount = async (username, password, email) => {
    try {
        const response = await apiClient.post(
            `${API_ENDPOINT}/register`,
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

export const loginWithGoogle = async (username, password, email) => {
    try {
        const response = await apiClient.post(
            `${API_ENDPOINT}/google-login`,
            { username, password, email }
        );
        return response;
    } catch (error) {
        throw error;
    }
};

export const forgotPassword = async (email) => {
    try {
        const response = await apiClient.post(
            `${API_ENDPOINT}/forgot-password`,
            { email }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};