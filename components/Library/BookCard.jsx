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
                className="rounded-lg shadow-md overflow-hidden flex sm:flex-col cursor-pointer transform transition-transform duration-200 hover:scale-105 bg-gray-800 border border-gray-700"
                onClick={handleModalOpen}
            >
                {/* Capa do Livro */}
                <div className="relative w-1/3 h-32 sm:w-full sm:h-40 flex-shrink-0">
                    <Image
                        src={cover}
                        alt={`Capa do livro ${title}`}
                        layout="fill"
                        objectFit="cover"
                    />
                    <div
                        className={`absolute bottom-2 right-2 text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(status)} ${getStatusTextColor(status)}`}
                    >
                        {status}
                    </div>
                </div>

                {/* Informações do Livro */}
                <div className="flex flex-col flex-grow p-4 text-left sm:text-center gap-3 text-gray-100 relative">
                    <h2 className="text-lg font-bold text-gray-50">{title}</h2>
                    <p className="text-gray-400 mt-1 sm:mt-2">{author}</p>

                    {/* Categoria */}
                    <div className="absolute bottom-2 right-2 flex justify-start sm:justify-center flex-wrap items-center">
                        <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-green-700 text-white">
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