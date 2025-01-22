import Head from 'next/head';
import { useState } from 'react';
import BookCard from '../components/Library/BookCard';
import AddBookCard from '../components/Library/AddBookCard';
import BookSection from '../components/Library/BookSection';
import withAuth from '../withAuth';

const Library = () => {
    const [books, setBooks] = useState([
        {
            id: 1,
            title: "O Príncipe",
            author: "Nicolau Maquiavel",
            cover: "/images/book-cover.png",
            genre: "Philosophy",
            status: "Completo",
            startDate: "2024-01-01",
        },
        {
            id: 2,
            title: "1984",
            author: "George Orwell",
            cover: "/images/1984-book-cover.jpg",
            genre: "Dystopian Fiction",
            status: "Completo",
            startDate: "2023-10-01",
        },
        {
            id: 3,
            title: "Dom Casmurro",
            author: "Machado de Assis",
            cover: "/images/dom-casmurro-book-cover.jpg",
            genre: "Romance",
            status: "Lendo",
            startDate: "2024-02-01",
        },
        {
            id: 4,
            title: "A Metamorfose",
            author: "Franz Kafka",
            cover: "/images/metamorfose-book-cover.png",
            genre: "Absurdism",
            status: "Não Iniciado",
            startDate: "2024-03-01",
        },
    ]);

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