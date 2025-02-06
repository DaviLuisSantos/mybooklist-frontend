import apiClient from './apiClient';

const API_ENDPOINT = 'book'; 

export const createBook = async (bookDetails) => {
    try {
        const response = await apiClient.post(
            `${API_ENDPOINT}/create`, 
            { ...bookDetails }
        );
        return response;
    } catch (error) {
        console.log(error);
    }
};