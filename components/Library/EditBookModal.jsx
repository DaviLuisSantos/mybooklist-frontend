import { useState, useEffect } from 'react';

const EditBookModal = ({ isOpen, onClose, book, onSave }) => {
    const [title, setTitle] = useState(book.title);
    const [author, setAuthor] = useState(book.author);
    const [genre, setgenre] = useState(book.genre);
    const [status, setStatus] = useState(book.status);
    const [startDate, setStartDate] = useState(book.startDate);

    useEffect(() => {
        setTitle(book.title);
        setAuthor(book.author);
        setgenre(book.genre);
        setStatus(book.status);
        setStartDate(book.startDate);
    }, [book]);

    const handleSave = () => {
        const updatedBook = {
            ...book,
            title,
            author,
            genre,
            status,
            startDate,
        };
        onSave(updatedBook);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-700 rounded-lg p-8 max-w-2xl w-full relative">
                <button className="absolute top-2 right-2 text-white text-2xl cursor-pointer rounded-lg" onClick={onClose}>×</button>
                <h2 className="text-2xl font-bold mb-4 text-white">Editar Livro</h2>
                <div className="flex flex-col space-y-2">
                    <div>
                        <label className="text-white">Título:</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="bg-gray-800 text-white p-2 rounded-md w-full"
                        />
                    </div>
                    <div>
                        <label className="text-white">Autor:</label>
                        <input
                            type="text"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            className="bg-gray-800 text-white p-2 rounded-md w-full"
                        />
                    </div>
                    <div>
                        <label className="text-white">Categoria:</label>
                        <input
                            type="text"
                            value={genre}
                            onChange={(e) => setgenre(e.target.value)}
                            className="bg-gray-800 text-white p-2 rounded-md w-full"
                        />
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
                        onClick={handleSave}
                        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md mt-4"
                    >
                        Salvar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditBookModal;