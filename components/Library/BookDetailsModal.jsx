import React from 'react';

const BookDetailsModal = ({ isOpen, onClose, selectedBook, status, setStatus, startDate, setStartDate, handleAddBook }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 sm:p-8">
            <div className="rounded-lg p-8 max-w-2xl w-full max-h-full overflow-y-auto relative" id='modal'>
                <button className="absolute top-2 right-2 text-2xl cursor-pointer rounded-lg" onClick={onClose} id="button">×</button>
                <h3 className="text-xl font-bold mb-2">Detalhes do Livro</h3>
                <div className="flex flex-col space-y-2">
                    <div>
                        <label >Título:</label>
                        <p>{selectedBook.title}</p>
                    </div>
                    <div>
                        <label >Autor:</label>
                        <p>{selectedBook.author}</p>
                    </div>
                    <div>
                        <label >Categoria:</label>
                        <p>{selectedBook.genre}</p>
                    </div>
                    <div>
                        <label >Descrição:</label>
                        <p className=" max-h-32 overflow-y-auto">{selectedBook.description}</p>
                    </div>
                    <div>
                        <label >Status:</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="p-2 rounded-md w-full"
                        >
                            <option value="Não Iniciado">Não Iniciado</option>
                            <option value="Lendo">Lendo</option>
                            <option value="Completo">Completo</option>
                        </select>
                    </div>
                    <div>
                        <label >Data de Início:</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="p-2 rounded-md w-full"
                        />
                    </div>
                    <button
                        onClick={handleAddBook}
                        className="p-2 rounded-md mt-4"
                        id="button"
                    >
                        Adicionar Livro
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookDetailsModal;