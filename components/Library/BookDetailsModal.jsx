import React from 'react';

const BookDetailsModal = ({ isOpen, onClose, selectedBook, status, setStatus, startDate, setStartDate, handleAddBook }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 sm:p-8">
            <div className="bg-gray-700 rounded-lg p-8 max-w-2xl w-full max-h-full overflow-y-auto relative">
                <button className="absolute top-2 right-2 text-white text-2xl cursor-pointer rounded-lg" onClick={onClose}>×</button>
                <h3 className="text-xl font-bold text-white mb-2">Detalhes do Livro</h3>
                <div className="flex flex-col space-y-2">
                    <div>
                        <label className="text-white">Título:</label>
                        <p className="text-gray-300">{selectedBook.title}</p>
                    </div>
                    <div>
                        <label className="text-white">Autor:</label>
                        <p className="text-gray-300">{selectedBook.author}</p>
                    </div>
                    <div>
                        <label className="text-white">Categoria:</label>
                        <p className="text-gray-300">{selectedBook.genre}</p>
                    </div>
                    <div>
                        <label className="text-white">Descrição:</label>
                        <p className="text-gray-300 max-h-32 overflow-y-auto">{selectedBook.description}</p>
                    </div>
                    <div>
                        <label className="text-white">Status:</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="bg-gray-800 text-white p-2 rounded-md w-full"
                        >
                            <option value="Não Iniciado">Não Iniciado</option>
                            <option value="Lendo">Lendo</option>
                            <option value="Completo">Completo</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-white">Data de Início:</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="bg-gray-800 text-white p-2 rounded-md w-full"
                        />
                    </div>
                    <button
                        onClick={handleAddBook}
                        className="text-white p-2 rounded-md mt-4"
                    >
                        Adicionar Livro
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookDetailsModal;