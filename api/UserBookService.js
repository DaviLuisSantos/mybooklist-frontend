import apiClient from './apiClient';

const API_ENDPOINT = 'UserBook';

export const createUserBook = async (bookDetails) => {
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
export const getUserBooks = async () => {
    try {
        const response = await apiClient.get(
            `${API_ENDPOINT}`
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}