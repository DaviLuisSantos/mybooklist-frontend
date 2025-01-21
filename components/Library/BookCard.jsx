import { useState } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import EditBookModal from './EditBookModal';

const BookCard = ({
    id,
    title,
    author,
    cover,
    category,
    status,
    startDate,
    onSave,
}) => {
    const { theme } = useTheme();
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

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div
                className="bg-gray-800 text-white rounded-lg shadow-md overflow-hidden flex flex-row sm:flex-col sm:items-center cursor-pointer"
                onClick={handleModalOpen}
            >
                {/* Capa do Livro */}
                <div className="relative w-1/3 h-48 sm:w-full sm:h-40 flex-shrink-0">
                    <Image
                        src={cover}
                        alt={`Capa do livro ${title}`}
                        layout="fill"
                        objectFit="cover"
                    />
                    <div className={`absolute bottom-2 right-2 text-white text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(status)}`}>
                        {status}
                    </div>
                </div>
                {/* Informações do Livro */}
                <div className="p-4 flex flex-col flex-grow text-left sm:text-center">
                    <h2 className="text-xl font-bold mb-2">{title}</h2>
                    <p className="text-gray-400 mb-2">{author}</p>
                    <div className="flex items-center justify-between flex-wrap mb-2">
                        <div className="flex flex-col">
                            <span className="text-gray-400 text-sm">Categoria</span>
                            <span className="inline-block bg-green-700 text-white text-xs font-medium px-2 py-1 rounded-full">
                                {category}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <EditBookModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                book={{ id, title, author, cover, category, status, startDate }} // Passa a descrição para o modal
                onSave={onSave}
            />
        </>
    );
};

export default BookCard;