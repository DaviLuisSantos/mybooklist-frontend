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
        console.log(error);
    }
}

export const getUserBooks = async () => {
    try {
        const response = await apiClient.post(
            `${API_ENDPOINT}/getAll`
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const updateUserBook = async (bookDetails) => {
    try {
        const response = await apiClient.put(
            `${API_ENDPOINT}/update`,
            { ...bookDetails }
        );
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const deleteUserBook = async (bookId) => {
    try {
        const response = await apiClient.delete(
            `${API_ENDPOINT}/delete/${bookId}`
        );
        return response;
    } catch (error) {
        console.log(error);
    }
};