import axios from 'axios';

export const searchAmazonBooks = async (searchTerm) => {
    try {
        const response = await axios.get(`/api/amazonProxy`, {
            params: { searchTerm: encodeURIComponent(searchTerm) },
            timeout: 10000,
        });
        return response.data;
    } catch (error) {
        if (error.code === 'ECONNABORTED') {
            console.error('A requisição foi abortada devido ao tempo limite.');
        } else {
            console.error('Erro ao pesquisar na Amazon:', error);
        }
        throw error;
    }
};

export const fetchBookDetailsFromAmazon = async (bookUrl) => {
    try {
        const response = await axios.get(bookUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
            },
            timeout: 10000,
        });

        if (response.status !== 200) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const html = response.data;
        const $ = cheerio.load(html);

        const categoryElement = $('#wayfinding-breadcrumbs_feature_div span.a-list-item:nth-last-child(2) a.a-link-normal.a-color-tertiary');
        const category = categoryElement.text().trim() || 'Não Categorizado';

        return { category };

    } catch (error) {
        if (error.code === 'ECONNABORTED') {
            console.error('A requisição foi abortada devido ao tempo limite.');
        } else {
            console.error('Erro ao requisitar detalhes do livro na Amazon:', error);
        }
        throw error;
    }
};