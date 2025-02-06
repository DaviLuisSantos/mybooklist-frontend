import { useState, useEffect, useContext } from 'react';
import { BooksContext } from '../../contexts/UserBookContext';
import { useTheme } from 'next-themes';

const EditBookModal = ({ isOpen, onClose, book }) => {
    const { updateBook } = useContext(BooksContext);
    const { theme } = useTheme();
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [status, setStatus] = useState('');
    const [startDate, setStartDate] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Novo estado para controlar o loading

    useEffect(() => {
        if (book) {
            setTitle(book.title);
            setAuthor(book.author);
            setGenre(book.genre);
            setStatus(book.status);
            if (book.startDate)
                setStartDate(new Date(book.startDate).toISOString().split('T')[0]);
            else
                setStartDate(null)
        }
    }, [book]);

    const getNextStatus = (status) => {
        switch (status) {
            case 'Não Iniciado': return 'Lendo';
            case 'Lendo': return 'Completo';
            default: return status; // Para 'Completo' ou outros status
        }
    };

    const getStatusButtonText = (status) => {
        switch (status) {
            case 'Não Iniciado': return 'Iniciar Leitura';
            case 'Lendo': return 'Finalizar Leitura';
            default: return 'Livro Completo'; // Para 'Completo' ou outros status
        }
    };

    const handleStatusChangeAndSave = async () => {
        setIsLoading(true); // Inicia o loading
        try {
            const nextStatus = getNextStatus(status);
            setStatus(nextStatus); // Atualiza o status localmente
            const updatedBook = {
                ...book,
                title,
                author,
                genre,
                status: nextStatus, // Usa o novo status
                startDate
            };
            await updateBook(updatedBook); // Salva com o novo status
            onClose();
        } catch (error) {
            console.error("Erro ao atualizar status:", error);
            // Aqui você pode adicionar um tratamento de erro visual para o usuário
        } finally {
            setIsLoading(false); // Finaliza o loading, independentemente do resultado
        }
    };

    const handleSave = async () => {
        setIsLoading(true); // Inicia o loading
        try {
            const updatedBook = {
                ...book,
                title,
                author,
                genre,
                status,
                startDate,
            };
            await updateBook(updatedBook);
            onClose();
        } catch (error) {
            console.error("Erro ao salvar livro:", error);
            // Aqui você pode adicionar um tratamento de erro visual para o usuário
        } finally {
            setIsLoading(false); // Finaliza o loading, independentemente do resultado
        }
    };

    const getStatusButtonColor = (status) => {
        switch (status) {
            case 'Não Iniciado': return 'bg-blue-500 hover:bg-blue-700 text-white';
            case 'Lendo': return 'bg-green-500 hover:bg-green-700 text-white';
            default: return 'bg-gray-500 hover:bg-gray-700 text-gray-200 cursor-not-allowed'; // Para Completo ou outros
        }
    };

    // Componente para o Spinner (Loading)
    const LoadingSpinner = () => (
        <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <circle className="opacity-75" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeDasharray="62.83" strokeDashoffset="0" />
        </svg>
    );

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 sm:p-8">
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
                            disabled={isLoading} // Desabilita o input durante o loading
                        />
                    </div>
                    <div>
                        <label className="text-white">Autor:</label>
                        <input
                            type="text"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            className="bg-gray-800 text-white p-2 rounded-md w-full"
                            disabled={isLoading} // Desabilita o input durante o loading
                        />
                    </div>
                    <div>
                        <label className="text-white">Categoria:</label>
                        <input
                            type="text"
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                            className="bg-gray-800 text-white p-2 rounded-md w-full"
                            disabled={isLoading} // Desabilita o input durante o loading
                        />
                    </div>
                    <div>
                        <label className="text-white">Status:</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="bg-gray-800 text-white p-2 rounded-md w-full"
                            disabled={isLoading} // Desabilita o select durante o loading
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
                            disabled={isLoading} // Desabilita o input durante o loading
                        />
                    </div>
                    <button
                        className={`p-2 rounded-md mt-4  ${getStatusButtonColor(status)} flex items-center justify-center`}
                        onClick={handleStatusChangeAndSave}
                        disabled={isLoading} // Desabilita o botão durante o loading
                    >
                        {isLoading ? <LoadingSpinner /> : getStatusButtonText(status)}
                    </button>
                    <button
                        onClick={handleSave}
                        className="p-2 rounded-md mt-4 bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center"
                        disabled={isLoading} // Desabilita o botão durante o loading
                    >
                        {isLoading ? <LoadingSpinner /> : "Salvar"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditBookModal;