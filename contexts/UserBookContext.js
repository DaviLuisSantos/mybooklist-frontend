import React, { createContext, useState, useEffect } from 'react';
import { getUserBooks } from '../api/UserBookService';

export const BooksContext = createContext();

export const BooksProvider = ({ children }) => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadBooks = async () => {
            try {
                const fetchedBooks = await getUserBooks();
                const livros = fetchedBooks.map(book => ({
                    title: book.book.title,
                    author: book.book.author,
                    cover: book.book.cover,
                    genre: book.book.genre,
                    description: book.book.description,
                    pages: book.book.pages,
                    isbn: book.book.isbn,
                    status: book.status,
                    startDate: new Date(book.dateStarted).toLocaleDateString('en-US', {
                        month: '2-digit',
                        day: '2-digit',
                        year: 'numeric'
                    }),
                }));
                setBooks(livros);
            } catch (error) {
                console.error('Erro ao carregar livros:', error);
                setError('Erro ao carregar livros. Por favor, tente novamente.');
            } finally {
                setLoading(false);
            }
        };

        loadBooks();
    }, []);

    return (
        <BooksContext.Provider value={{ books, setBooks, loading, error }}>
            {children}
        </BooksContext.Provider>
    );
};