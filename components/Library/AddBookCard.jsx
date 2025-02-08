import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import SearchBookModal from './SearchBookModal';

const AddBookCard = ({ onAddBook }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className="rounded-lg shadow-md overflow-hidden flex flex-col items-center justify-center cursor-pointer border " onClick={handleModalOpen}>
                <div className="p-4 flex flex-col items-center justify-center">
                    <FaPlus className="text-4xl mb-2" />
                    <span className="text-xl font-bold">Adicionar Livro</span>
                </div>
            </div>
            <SearchBookModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                onAddBook={onAddBook}
            />
        </>
    );
};

export default AddBookCard;