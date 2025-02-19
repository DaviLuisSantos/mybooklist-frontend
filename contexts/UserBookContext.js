import React, { createContext, useState, useEffect, useContext } from 'react';
import { getUserBooks, updateUserBook, deleteUserBook } from '../api/UserBookService';
import Cookies from 'js-cookie';

export const BooksContext = createContext();

// Função para transformar os dados dos livros recebidos da API
const transformBookData = (fetchedBooks) => {
    console.log(fetchedBooks, "trans")
    return fetchedBooks.map(book => ({
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
};

export const BooksProvider = ({ children }) => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Função para carregar os livros do usuário
    const loadBooks = async () => {
        try {
            setLoading(true);
            const fetchedBooks = await getUserBooks();
            if (fetchedBooks) {
                const transformedBooks = transformBookData(fetchedBooks);
                setBooks(transformedBooks);
            }
        } catch (err) {
            console.error('Erro ao carregar livros:', err);
            setError('Erro ao carregar livros. Por favor, verifique sua conexão e tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const token = Cookies.get("Authorization");
        if (token) {
            loadBooks();
        } else {
            setLoading(false);
        }

        const handleTokenChange = () => {
            const newToken = Cookies.get("Authorization");
            if (newToken) {
                loadBooks();
            }
        };

        // Adiciona um listener para mudanças nos cookies
        window.addEventListener('cookiechange', handleTokenChange);

        // Limpa o listener quando o componente é desmontado
        return () => {
            window.removeEventListener('cookiechange', handleTokenChange);
        };
    }, []);

    // Função para atualizar um livro
    const updateBook = async (updatedBook) => {
        try {
            await updateUserBook(updatedBook);
            // Atualiza o estado local `books`
            setBooks(prevBooks =>
                prevBooks.map(book =>
                    book.id === updatedBook.id ? { ...book, ...updatedBook } : book
                )
            );

        } catch (err) {
            console.error(`Erro ao atualizar livro ${updatedBook.title}:`, err);
            setError(`Erro ao atualizar o livro "${updatedBook.title}". Por favor, verifique sua conexão e tente novamente.`);
        }
    };

    // Função para deletar um livro
    const deleteBook = async (bookId) => {
        try {
            await deleteUserBook(bookId);
            // Atualiza o estado local `books`
            setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId));
        } catch (err) {
            console.error(`Erro ao deletar livro ${bookId}:`, err);
            setError(`Erro ao deletar o livro. Por favor, verifique sua conexão e tente novamente.`);
        }
    };

    return (
        <BooksContext.Provider value={{ books, setBooks, loading, error, updateBook, deleteBook, loadBooks }}>
            {children}
        </BooksContext.Provider>
    );
};