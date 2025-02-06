import Head from 'next/head';
import { useState, useContext } from 'react';
import AddBookCard from '../components/Library/AddBookCard';
import BookSection from '../components/Library/BookSection';
import withAuth from '../withAuth';
import { BooksContext } from '../contexts/UserBookContext';
import { UserContext } from '../contexts/UserContext';
import Bar from '../components/Bar';

const Library = () => {
    const { books, setBooks, loading, error, updateBook } = useContext(BooksContext);
    const [sortBy, setSortBy] = useState('');

    const handleSort = (field) => {
        setSortBy(field);
        const sortedBooks = [...books].sort((a, b) => {
            if (a[field] < b[field]) return -1;
            if (a[field] > b[field]) return 1;
            return 0;
        });
        setBooks(sortedBooks);
    };

    const handleSaveBook = async (updatedBook) => {
        await updateBook(updatedBook);
    };

    const handleAddBook = (newBook) => {
        newBook.id = books.length ? books[books.length - 1].id + 1 : 1;
        setBooks([...books, newBook]);
    };

    const groupedBooks = books.reduce((acc, book) => {
        if (!acc[book.status]) {
            acc[book.status] = [];
        }
        acc[book.status].push(book);
        return acc;
    }, {});

    const LoadingIndicator = () => (
        <div className="fixed inset-0 flex justify-center items-center">
            <div className="animate-spin rounded-full h-16 w-16 sm:h-24 sm:w-24 md:h-32 md:w-32 border-t-4 border-b-4 border-blue-500"></div>
            <span className="ml-2 sm:ml-4 text-lg sm:text-xl text-gray-700">Carregando livros...</span>
        </div>
    );

    if (loading) {
        return <LoadingIndicator />;
    }

    if (error) {
        return <p>{error}</p>;
    }

    const orderedStatuses = ['Completo', 'Lendo', 'Não Iniciado'];

    return (
        <div>
            <Head>
                <title>Library</title>
                <meta name="description" content="Minha biblioteca de livros" />
            </Head>
            <Bar />
            <main className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4">Minha Biblioteca</h1>

                {orderedStatuses.map((status, index) => (
                    <BookSection
                        key={index}
                        title={status}
                        books={groupedBooks[status] || []}
                        onSave={handleSaveBook}
                    />
                ))}
                <AddBookCard onAddBook={handleAddBook} />
            </main>
        </div>
    );
};

export default withAuth(Library);