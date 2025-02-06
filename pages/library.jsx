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
            <Bar />
            <main className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4">Minha Biblioteca</h1>

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