import apiClient from './apiClient';

const API_ENDPOINT = 'Book'; // Substitua pelo seu endpoint da API

export const createBook = async (bookDetails) => {
    try {
        const response = await apiClient.post(
            `${API_ENDPOINT}`, // Ajuste o endpoint conforme necessário
            { bookDetails }
        );
        return response;
    } catch (error) {
        throw error;
    }
};