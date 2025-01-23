import { useState, useEffect } from 'react';
import Image from 'next/image';
import { searchGoogleBooks } from '../../api/googleBook';
import { searchOpenLibrary, fetchBookDetails } from '../../api/openLibrary';
import { searchAmazonBooks, fetchBookDetailsFromAmazon } from '../../api/amazonScraper';
import BookDetailsModal from './BookDetailsModal';
import { createBook } from '../../api/BookService';
import { createUserBook } from '../../api/UserBookService';

const SearchBookModal = ({ isOpen, onClose, onAddBook }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [apiSource, setApiSource] = useState('openLibrary');
    const [selectedBook, setSelectedBook] = useState(null);
    const [status, setStatus] = useState('Não Iniciado');
    const [startDate, setStartDate] = useState('');

    useEffect(() => {
        const fetchBooks = async () => {
            if (!searchTerm) {
                setSearchResults([]);
                return;
            }
            setLoading(true);
            try {
                let results;
                if (apiSource === 'openLibrary') {
                    results = await searchOpenLibrary(searchTerm);
                } else if (apiSource === 'amazon') {
                    results = await searchAmazonBooks(searchTerm);
                } else {
                    results = await searchGoogleBooks(searchTerm);
                }
                setSearchResults(results);
                setError('');
            } catch (err) {
                console.error('Error fetching books:', err);
                setError('Erro ao pesquisar os livros, tente novamente');
                setSearchResults([]);
            } finally {
                setLoading(false);
            }
        };
        fetchBooks();
    }, [searchTerm, apiSource]);

    const handleBookSelect = async (book) => {
        setLoading(true);
        try {
            let bookDetails;
            if (apiSource === 'openLibrary') {
                const data = await fetchBookDetails(book.key);
                bookDetails = {
                    title: data.title,
                    author: data.authors ? data.authors.map(author => author.author.name).join(', ') : 'Autor desconhecido',
                    cover: book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : '/images/no-cover.jpg',
                    genre: data.subjects ? data.subjects[0] : 'Não Categorizado',
                    description: data.description ? (typeof data.description === 'string' ? data.description : data.description.value) : 'Sem descrição disponível',
                    pages: data.number_of_pages || 'Desconhecido', // Adiciona o número de páginas
                };
            } else if (apiSource === 'amazon') {
                const data = await fetchBookDetailsFromAmazon(book.url);
                bookDetails = {
                    title: book.title,
                    author: book.author,
                    cover: book.cover,
                    genre: data.category,
                    description: data.description || 'Sem descrição disponível',
                    pages: data.pageCount || 'Desconhecido', // Adiciona o número de páginas
                };
            } else {
                bookDetails = {
                    title: book.volumeInfo.title,
                    author: book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Autor desconhecido',
                    cover: book.volumeInfo.imageLinks?.thumbnail || '/images/no-cover.jpg',
                    genre: book.volumeInfo.categories ? book.volumeInfo.categories[0] : 'Não Categorizado',
                    description: book.volumeInfo.description || 'Sem descrição disponível',
                    pages: book.volumeInfo.pageCount || 'Desconhecido', // Adiciona o número de páginas
                };
            }
            setSelectedBook(bookDetails);
        } catch (err) {
            console.error("Erro ao buscar os detalhes do livro:", err);
        } finally {
            setLoading(false);
        }
    };

    const resetModal = () => {
        setSearchTerm('');
        setSearchResults([]);
        setSelectedBook(null);
        setStatus('Não Iniciado');
        setStartDate('');
        setError('');
    };

    const handleAddBook = async () => {
        if (selectedBook) {
            const bookDetails = {
                ...selectedBook,
                status,
                startDate,
            };

            try {
                const response = await createBook(bookDetails);
                const response2 = await createUserBook({ bookId: response.data.bookId, status, startDate });

                if (response.status >= 200 && response.status < 300) {
                    onAddBook(bookDetails);
                    resetModal();
                    onClose();
                } else {
                    console.error('Erro ao adicionar o livro:', response.statusText);
                    setError('Erro ao adicionar o livro. Por favor, tente novamente.');
                }
            } catch (err) {
                console.error('Erro ao adicionar o livro:', err);
                setError('Erro ao adicionar o livro. Por favor, tente novamente.');
            }
        }
    };

    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 sm:p-8">
            <div className="bg-gray-700 rounded-lg p-8 max-w-2xl w-full max-h-full overflow-y-auto relative">
                <button className="absolute top-2 right-2 text-white text-2xl cursor-pointer rounded-lg" onClick={() => { resetModal(); onClose(); }}>×</button>
                <h2 className="text-2xl font-bold mb-4 text-white">Adicionar Livro</h2>
                <input
                    type="text"
                    placeholder="Pesquisar Livro"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-gray-800 text-white p-2 rounded-md w-full mb-4"
                />
                <div className="mb-4 flex items-center space-x-2">
                    <label className="text-white">Usar API:</label>
                    <select
                        value={apiSource}
                        onChange={(e) => setApiSource(e.target.value)}
                        className="bg-gray-800 text-white p-2 rounded-md"
                    >
                        <option value="openLibrary">Open Library</option>
                        <option value="google">Google Books</option>
                        <option value="amazon">Amazon</option>
                    </select>
                </div>
                {loading && <p className="text-white text-center">Carregando...</p>}
                {error && <p className="text-red-500 text-center">{error}</p>}
                <div className="overflow-y-auto max-h-96">
                    {searchResults.map((book, index) => (
                        <div
                            key={index}
                            className="p-4 border-b border-gray-500 flex items-center hover:bg-gray-600 cursor-pointer"
                            onClick={() => handleBookSelect(book)}
                        >
                            <div className="relative w-16 h-20 mr-4 flex-shrink-0">
                                <Image
                                    src={apiSource === 'openLibrary' ? (book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-S.jpg` : '/images/no-cover.jpg') : (apiSource === 'amazon' ? book.cover : (book.volumeInfo?.imageLinks?.thumbnail || '/images/no-cover.jpg'))}
                                    alt={apiSource === 'openLibrary' ? book.title : (apiSource === 'amazon' ? book.title : book.volumeInfo.title)}
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-white font-bold text-sm">{apiSource === 'openLibrary' ? book.title : (apiSource === 'amazon' ? book.title : book.volumeInfo.title)}</h3>
                                <p className="text-gray-300 text-sm">{apiSource === 'openLibrary' ? (book.author_name?.join(', ') || 'Autor desconhecido') : (apiSource === 'amazon' ? book.author : (book.volumeInfo.authors?.join(', ') || 'Autor desconhecido'))}</p>
                            </div>
                        </div>
                    ))}
                    {searchResults.length === 0 && !loading && !error && (
                        <p className="text-gray-300 text-center">Nenhum livro encontrado.</p>
                    )}
                </div>
                <BookDetailsModal
                    isOpen={!!selectedBook}
                    onClose={() => setSelectedBook(null)}
                    selectedBook={selectedBook}
                    status={status}
                    setStatus={setStatus}
                    startDate={startDate}
                    setStartDate={setStartDate}
                    handleAddBook={handleAddBook}
                />
            </div>
        </div>
    );
};

export default SearchBookModal;