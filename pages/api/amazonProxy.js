import axios from 'axios';

export default async function handler(req, res) {
    const { searchTerm } = req.query;

    try {
        const response = await axios.get(`https://www.amazon.com/s`, {
            params: { k: searchTerm, i: 'stripbooks' },
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
            },
            timeout: 10000,
        });

        if (response.status !== 200) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        res.status(200).json(response.data);
    } catch (error) {
        if (error.code === 'ECONNABORTED') {
            console.error('A requisição foi abortada devido ao tempo limite.');
        } else {
            console.error('Erro ao pesquisar na Amazon:', error);
        }
        res.status(500).json({ error: 'Erro ao pesquisar na Amazon' });
    }
}