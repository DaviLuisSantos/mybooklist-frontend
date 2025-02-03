import React, { createContext, useState, useEffect, useContext } from 'react';
import { getUserBooks, updateUserBook } from '../api/UserBookService';
import { UserContext } from './UserContext';

export const BooksContext = createContext();

export const BooksProvider = ({ children }) => {
    const { user } = useContext(UserContext);
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadBooks = async () => {
            try {
                const fetchedBooks = await getUserBooks();
                if (fetchedBooks) {
                    const livros = fetchedBooks.map(book => ({
                        id: book.userBookId,
                        title: book.book.title,
                        author: book.book.author,
                        cover: book.book.cover,
                        genre: book.book.genre,
                        description: book.book.description,
                        pages: book.book.pages,
                        isbn: book.book.isbn,
                        status: book.status,
                        startDate: book.dateStarted,
                    }));
                    setBooks(livros);
                }
            } catch (error) {
                console.error('Erro ao carregar livros:', error);
                setError('Erro ao carregar livros. Por favor, tente novamente.');
            } finally {
                setLoading(false);
            }
        };

        loadBooks();
    }, [user]);

    const updateBook = async (updatedBook) => {
        try {
            await updateUserBook(updatedBook);
            const fetchedBooks = await getUserBooks();
            const livros = fetchedBooks.map(book => ({
                id: book.userBookId,
                title: book.book.title,
                author: book.book.author,
                cover: book.book.cover,
                genre: book.book.genre,
                description: book.book.description,
                pages: book.book.pages,
                isbn: book.book.isbn,
                status: book.status,
                startDate: book.dateStarted, // Formato yyyy-mm-dd
            }));
            setBooks(livros);
        } catch (error) {
            console.error('Erro ao atualizar livro:', error);
            setError('Erro ao atualizar livro. Por favor, tente novamente.');
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    return (
        <BooksContext.Provider value={{ books, setBooks, loading, error, updateBook }}>
            {children}
        </BooksContext.Provider>
    );
};