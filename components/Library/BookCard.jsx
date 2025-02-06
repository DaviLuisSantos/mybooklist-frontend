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
                return 'bg-green-700';
            case 'Não Iniciado':
                return 'bg-red-700';
            case 'Lendo':
                return 'bg-blue-700';
            default:
                return 'bg-gray-700';
        }
    };

    const getStatusTextColor = (status) => {
        switch (status) {
            case 'Completo':
                return 'text-white';
            case 'Não Iniciado':
                return 'text-white';
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
                <div className="relative w-1/3 h-48 sm:w-full sm:h-40 flex-shrink-0">
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

                <div className="flex flex-col flex-grow p-4 text-left align-middle sm:text-center gap-2 text-gray-100">
                    <h2 className="text-xl font-bold text-gray-50">{title}</h2>
                    <p className="text-gray-400">{author}</p>

                    <div className=" absolute bottom-2 right-2 flex justify-between flex-wrap items-center">
                        <div className="flex flex-col">
                            <span
                                className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-green-700 text-white"
                            >
                                {genre}
                            </span>
                        </div>
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