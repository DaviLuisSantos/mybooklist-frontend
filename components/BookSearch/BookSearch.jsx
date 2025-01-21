import { useState, useEffect } from 'react';
import BookList from './BookList';
import { searchGoogleBooks } from '../../api/googleBook';

function BookSearch() {
    const [query, setQuery] = useState('');
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [bookDetails, setBookDetails] = useState(null);

    useEffect(() => {
        if (query.length > 2) {
            const fetchBooks = async () => {
                setLoading(true);
                try {
                    const response = await searchGoogleBooks(query);
                    const data = await response.json();
                    setBooks(data.items || []);
                } catch (error) {
                    console.error('Error fetching books:', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchBooks();
        } else {
            setBooks([]);
        }
    }, [query]);

    const handleBookClick = async (book) => {
        setLoading(true);
        try {
            const response = await fetch('/api/bookDetails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(book),
            });
            const data = await response.json();
            setBookDetails(data);
            setSelectedBook(book);
        } catch (error) {
            console.error('Error fetching book details:', error);
        } finally {
            setLoading(false);
        }
    };

    const closeModal = () => {
        setSelectedBook(null);
        setBookDetails(null);
    };

    return (
        <div className="container mx-auto p-4">
            <form className="mb-4 relative">
                <input
                    type="text"
                    placeholder="Search for books"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {loading && <p className="absolute top-full left-0 mt-2 text-gray-500">Loading...</p>}
                {books.length > 0 && (
                    <div className="absolute top-full left-0 mt-2 w-full bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden z-10">
                        <BookList books={books.map(book => ({
                            id: book.id,
                            title: book.volumeInfo.title,
                            author: book.volumeInfo.authors?.join(', '),
                            genre: book.volumeInfo.categories?.join(', '),
                            cover: book.volumeInfo.imageLinks?.thumbnail,
                        }))} onBookClick={handleBookClick} />
                    </div>
                )}
            </form>
            {selectedBook && bookDetails && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg w-full">
                        <h2 className="text-2xl font-bold mb-4">{selectedBook.title}</h2>
                        <p className="italic text-gray-600 dark:text-gray-400 mb-2">{selectedBook.author}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-300 mb-4">{selectedBook.genre}</p>
                        {selectedBook.cover && (
                            <img src={selectedBook.cover} alt={`${selectedBook.title} cover`} className="w-32 h-48 object-cover rounded-md mb-4" />
                        )}
                        <p className="text-gray-700 dark:text-gray-300 mb-4">{bookDetails.description}</p>
                        <button
                            onClick={closeModal}
                            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default BookSearch;