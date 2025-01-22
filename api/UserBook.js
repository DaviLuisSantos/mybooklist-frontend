import apiClient from './apiClient';

const API_ENDPOINT = 'UserBook';

export const createBook = async (bookDetails) => {
    try {
        const response = await apiClient.post(
            `${API_ENDPOINT}`,
            { ...bookDetails }
        );
        return response;
    } catch (error) {
        throw error;
    }
}