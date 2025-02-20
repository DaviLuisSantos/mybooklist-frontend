import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import BookCard from './BookCard';

const BookSection = ({ title, books, onSave }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <section className="mb-10">
            <div className="border-b pb-4 mb-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold relative group">
                        {title}
                        <span className="absolute bottom-[-2px] left-0 w-0 h-[2px] bg-gray-500 group-hover:w-full transition-all duration-300"></span>
                    </h2>
                    <button
                        onClick={toggleCollapse}
                        className="flex items-center hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none transition duration-300 ease-in-out rounded-full p-2"
                    >
                        {isCollapsed ? <FaChevronDown className="ml-2 text-lg" /> : <FaChevronUp className="ml-2 text-lg" />}
                    </button>
                </div>
            </div>
            {!isCollapsed && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {books.map((book) => (
                        <BookCard
                            key={book.id}
                            id={book.id}
                            title={book.title}
                            author={book.author}
                            cover={book.cover}
                            genre={book.genre}
                            description={book.description}
                            status={book.status}
                            startDate={book.startDate}
                            endDate={book.endDate} // Adiciona endDate às propriedades
                            onSave={onSave}
                        />
                    ))}
                </div>
            )}
        </section>
    );
};

export default BookSection;