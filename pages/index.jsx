import Head from 'next/head';
import { useState, useContext, useEffect } from 'react';
import AddBookCard from '../components/Library/AddBookCard';
import BookSection from '../components/Library/BookSection';
import withAuth from '../withAuth';
import { BooksContext } from '../contexts/UserBookContext';
import { UserContext } from '../contexts/UserContext';
import Bar from '@/components/Bar';

const Library = () => {
    const { books, loading, error, setBooks, loadBooks } = useContext(BooksContext);
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (books.length === 0 && !loading && !error) {
            loadBooks();
        }
    }, []); // Dependência vazia para garantir que seja executado apenas uma vez

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
            <span className="ml-2 sm:ml-4 text-lg sm:text-xl  text-gray-700">Carregando livros...</span>
        </div>
    );

    const ErrorIndicator = ({ message }) => (
        <div className="text-center py-10 text-red-500">
            <h2 className="text-2xl mb-2">Ocorreu um erro!</h2>
            <p className="text-lg">{message}</p>
        </div>
    );

    const orderedStatuses = ['Completo', 'Lendo', 'Não Iniciado'];

    return (
        <div>
            <Head>
                <title>Library</title>
                <meta name="description" content="Minha biblioteca de livros" />
            </Head>
            <Bar />
            <main className="container mx-auto p-4">
                {user && (<h1 className="text-3xl font-bold mb-6">Minha Biblioteca - {user}</h1>)}

                {loading ? (
                    <LoadingIndicator />
                ) : error ? (
                    <ErrorIndicator message={error} />
                ) : (
                    <>
                        {orderedStatuses.map((status, index) => (
                            <BookSection
                                key={index}
                                title={status}
                                books={groupedBooks[status] || []}
                            />
                        ))}
                        <AddBookCard onAddBook={handleAddBook} />
                    </>
                )}
            </main>
        </div>
    );
};

export default withAuth(Library);