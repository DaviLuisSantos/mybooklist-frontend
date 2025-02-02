import Head from 'next/head';
import { useState, useContext } from 'react';
import BookCard from '../components/Library/BookCard';
import AddBookCard from '../components/Library/AddBookCard';
import BookSection from '../components/Library/BookSection';
import withAuth from '../withAuth';
import { BooksContext } from '../contexts/UserBookContext';

const Library = () => {
    const { books, setBooks, loading, error } = useContext(BooksContext);
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

    const handleSaveBook = (updatedBook) => {
        setBooks(books.map(book => book.id === updatedBook.id ? updatedBook : book));
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

    if (loading) {
        return <p>Carregando livros...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <Head>
                <title>Library</title>
                <meta name="description" content="Minha biblioteca de livros" />
            </Head>
            <main className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4">Minha Biblioteca</h1>
                <div className="flex items-center mb-4">
                    <span className="mr-2 font-bold">Ordenar por:</span>
                    <select
                        className="bg-gray-800 text-white p-2 rounded-md"
                        onChange={(e) => handleSort(e.target.value)}
                        value={sortBy || ""}
                    >
                        <option value="">Selecione</option>
                        <option value="title">Título</option>
                        <option value="author">Autor</option>
                        <option value="genre">Categoria</option>
                        <option value="status">Status</option>
                        <option value="startDate">Data de Início</option>
                    </select>
                </div>
                {Object.keys(groupedBooks).map((status, index) => (
                    <BookSection
                        key={index}
                        title={status}
                        books={groupedBooks[status]}
                        onSave={handleSaveBook}
                    />
                ))}
                <AddBookCard onAddBook={handleAddBook} />
            </main>
        </div>
    );
};

export default withAuth(Library);