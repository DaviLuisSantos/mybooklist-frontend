import apiClient from './apiClient';

const API_ENDPOINT = 'book'; // Substitua pelo seu endpoint da API

export const createBook = async (bookDetails) => {
    try {
        const response = await apiClient.post(
            `${API_ENDPOINT}/create`, // Ajuste o endpoint conforme necessário
            { ...bookDetails }
        );
        return response;
    } catch (error) {
        throw error;
    }
};