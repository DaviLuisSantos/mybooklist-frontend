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
    endDate, // Adiciona endDate às propriedades
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

    const formatDate = (dateString) => {
        if (!dateString) {
            return '';
        }
        const [year, month, day] = dateString.split('-');
        return `${day}/${month}/${year}`;
    };

    return (
        <>
            <div
                className="rounded-lg shadow-md overflow-hidden flex sm:flex-row md:flex-row lg:flex-col cursor-pointer transform transition-transform duration-200 hover:scale-105 border lg:min-h-80 sm:min-h-0"
                id="book-card" onClick={handleModalOpen}
            >
                {/* Capa do Livro */}
                <div className="relative w-2/5 h-auto sm:w-2/5 sm:h-auto md:w-1/3 md:h-full lg:w-full lg:h-48 flex-shrink-0">
                    <Image
                        src={cover}
                        alt={`Capa do livro ${title}`}
                        layout="fill"
                        objectFit="cover"
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                    />
                    <div
                        className={`absolute top-2 left-2 text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(status)} ${getStatusTextColor(status)}`}
                    >
                        {status}
                    </div>
                </div>

                {/* Informações do Livro */}
                <div className="flex flex-col flex-grow p-4 text-left sm:text-left gap-3 relative md:h-full lg:items-center lg:justify-center">
                    <h2 className="text-lg font-bold md:text-xl lg:text-center" id="book-title">{title}</h2>
                    <h2 className="mt-1 sm:mt-2 md:text-center" id="book-author">{author}</h2>
                    <div className="flex flex-col lg:flex-row justify-between w-full mt-2 lg:mt-2 lg:mb-2 sm:justify-between md:justify-between">
                        <span className="inline-block pr-1 py-1 rounded-full text-xs font-medium text-[#939393] flex-shrink-0 mb-2 lg:mb-0" id="date">
                            {formatDate(startDate)}{endDate ? ` - ${formatDate(endDate)}` : ''}
                        </span>
                        <span className="inline-block px-2 py-1 rounded-full text-xs font-medium text-white flex-shrink-0 text-center lg:text-left" id="genre">
                            {genre}
                        </span>
                    </div>
                </div>
            </div>
            <EditBookModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                book={{ id, title, author, cover, genre, status, startDate, endDate }} // Passa endDate para o modal
                onSave={onSave}
            />
        </>
    );
};

export default BookCard;