import axios from 'axios';

export const searchGoogleBooks = async (searchTerm) => {
    try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes`, {
            params: {
                q: searchTerm,
            },
            timeout: 10000, // 10 segundos de timeout
        });

        return response.data.items || [];
    } catch (error) {
        if (error.code === 'ECONNABORTED') {
            console.error('A requisição foi abortada devido ao tempo limite.');
        } else {
            console.error('Erro ao pesquisar no Google Books:', error);
        }
        throw error;
    }
};