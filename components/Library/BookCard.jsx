import { useState } from 'react';
import Image from 'next/image';
import EditBookModal from './EditBookModal';

const BookCard = ({
    id,
    title,
    author,
    cover,
    genre,
    status,
    startDate,
    onSave,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Completo':
                return 'bg-green-500';
            case 'Não Iniciado':
                return 'bg-red-500';
            case 'Lendo':
                return 'bg-blue-500';
            default:
                return 'bg-gray-500';
        }
    };

    const getStatusTextColor = (status) => {
        switch (status) {
            case 'Completo':
            case 'Não Iniciado':
            case 'Lendo':
                return 'text-white';
            default:
                return 'text-gray-700';
        }
    };

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div
                className="rounded-lg shadow-md overflow-hidden flex sm:flex-col md:flex-row lg:block cursor-pointer transform transition-transform duration-200 hover:scale-105 border border-gray-200 lg:h-80"
                onClick={handleModalOpen}
            >
                {/* Capa do Livro */}
                <div className="relative w-1/3 h-36 sm:w-full sm:h-48 md:h-full lg:h-48 lg:w-full flex-shrink-0">
                    <Image
                        src={cover}
                        alt={`Capa do livro ${title}`}
                        layout="fill"
                        objectFit="cover"
                    />
                    <div
                        className={`absolute top-2 left-2 text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(status)} ${getStatusTextColor(status)}`}
                    >
                        {status}
                    </div>
                </div>

                {/* Informações do Livro */}
                <div className="flex flex-col flex-grow p-4 text-left sm:text-center gap-3 relative md:h-full lg:items-center lg:justify-center">
                    <h2 className="text-lg font-bold md:text-xl lg:text-center" id='book-title'>{title}</h2>
                    <p className=" mt-1 sm:mt-2 md:text-center" id='book-author'>{author}</p>
                    <div className="absolute bottom-2 left-2 flex justify-start sm:justify-center flex-wrap items-center lg:static lg:mt-2">
                        <span className="inline-block px-2 py-1 rounded-full text-xs font-medium text-[#939393]" id='date'>
                            {startDate}
                        </span>
                    </div>
                    <div className="absolute bottom-2 right-2 flex justify-start sm:justify-center flex-wrap items-center lg:static">
                        <span className="inline-block px-2 py-1 rounded-full text-xs font-medium text-white" id='genre'>
                            {genre}
                        </span>
                    </div>
                </div>
            </div>
            <EditBookModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                book={{ id, title, author, cover, genre, status, startDate }}
                onSave={onSave}
            />
        </>
    );
};

export default BookCard;