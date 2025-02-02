import apiClient from './apiClient';

const API_ENDPOINT = 'userBook';

export const createUserBook = async (bookDetails) => {
    try {
        const response = await apiClient.post(
            `${API_ENDPOINT}/create`,
            { ...bookDetails }
        );
        return response;
    } catch (error) {
        throw error;
    }
}
export const getUserBooks = async () => {
    try {
        const response = await apiClient.post(
            `${API_ENDPOINT}/getAll`
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}