import axios from 'axios';

export const searchOpenLibrary = async (searchTerm) => {
    try {
        const response = await axios.get(`https://openlibrary.org/search.json`, {
            params: { q: searchTerm },
            timeout: 10000, 
        });

        return response.data.docs || [];
    } catch (error) {
        if (error.code === 'ECONNABORTED') {
            console.error('A requisição foi abortada devido ao tempo limite.');
        } else {
            console.error('Erro ao pesquisar na Open Library:', error);
        }
        throw error;
    }
};

export const fetchBookDetails = async (bookKey) => {
    try {
        const response = await axios.get(
            `https://openlibrary.org/works/${bookKey.replace('/works/', '')}.json`,
            { timeout: 10000 }
        );
        return response.data;
    } catch (error) {
        if (error.code === 'ECONNABORTED') {
            console.error('A requisição foi abortada devido ao tempo limite.');
        } else {
            console.error('Erro ao requisitar os detalhes do livro:', error);
        }
        throw error;
    }
};