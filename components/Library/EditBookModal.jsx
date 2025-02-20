import { useState, useEffect, useContext } from 'react';
import { BooksContext } from '../../contexts/UserBookContext';
import { useTheme } from 'next-themes';
import { FaTrashAlt } from "react-icons/fa";
import { BsStopwatch } from "react-icons/bs";

const EditBookModal = ({ isOpen, onClose, book }) => {
    const { updateBook, deleteBook } = useContext(BooksContext);
    const { theme } = useTheme();
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [status, setStatus] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState(''); // Novo estado para controlar a data final
    const [isLoading, setIsLoading] = useState(false); // Novo estado para controlar o loading

    useEffect(() => {
        if (book) {
            setTitle(book.title);
            setAuthor(book.author);
            setGenre(book.genre);
            setStatus(book.status);
            if (book.startDate) {
                const date = new Date(book.startDate);
                setStartDate(date.toISOString().split('T')[0]);
            } else {
                setStartDate(null);
            }
            if (book.endDate) {
                const date = new Date(book.endDate);
                setEndDate(date.toISOString().split('T')[0]);
            } else {
                setEndDate(null);
            }
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
    const getStatus = () => {
        if (startDate == null) {
            return 'Não Iniciado';
        } else if (startDate != null && endDate == null) {
            return 'Lendo';
        }
        return 'Completo';
    }

    const handleStatusChangeAndSave = async () => {
        setIsLoading(true); // Inicia o loading
        try {
            const nextStatus = getNextStatus(status);
            const today = new Date().toISOString().split('T')[0]; // Formato yyyy-MM-dd
            setStatus(nextStatus); // Atualiza o status localmente
            const updatedBook = {
                ...book,
                title,
                author,
                genre,
                status: nextStatus, // Usa o novo status
                startDate: nextStatus === 'Lendo' && status === 'Não Iniciado' ? today : (startDate === '' ? null : startDate), // Define a data de início se o status for "Lendo"
                endDate: nextStatus === 'Completo' ? today : (endDate === '' ? null : endDate) // Define a data final se o status for "Completo"
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
                status: getStatus(), // Usa o status atualizado
                startDate: startDate == '' ? null : startDate, // Define a data de início como null se estiver vazia
                endDate: endDate == '' ? null : endDate // Define a data final como null se estiver vazia
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

    const handleDelete = async () => {
        setIsLoading(true); // Inicia o loading
        try {
            await deleteBook(book.id);
            onClose();
        } catch (error) {
            console.error("Erro ao deletar livro:", error);
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
        <BsStopwatch />
    );

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 sm:p-8">
            <div className="rounded-lg p-8 max-w-2xl w-full relative" id="modal">
                <div className="flex justify-between items-center mb-4">
                    <button
                        onClick={handleDelete}
                        className="p-2 rounded-md bg-red-500 hover:bg-red-700 text-white flex items-center justify-center"
                        id='delete-button'
                        disabled={isLoading} // Desabilita o botão durante o loading
                    >
                        {isLoading ? <LoadingSpinner /> : <FaTrashAlt />}
                    </button>
                    <h2 className="text-2xl font-bold">Editar Livro</h2>
                    <button className="text-2xl cursor-pointer rounded-lg" id='button' onClick={onClose}>×</button>
                </div>
                <div className="flex flex-col space-y-2">
                    <div>
                        <label className="">Título:</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="p-2 rounded-md w-full"
                            disabled={isLoading} // Desabilita o input durante o loading
                        />
                    </div>
                    <div>
                        <label>Autor:</label>
                        <input
                            type="text"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            className="p-2 rounded-md w-full"
                            disabled={isLoading} // Desabilita o input durante o loading
                        />
                    </div>
                    <div>
                        <label>Categoria:</label>
                        <input
                            type="text"
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                            className="p-2 rounded-md w-full"
                            disabled={isLoading} // Desabilita o input durante o loading
                        />
                    </div>
                    <div>
                        <label>Status:</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="p-2 rounded-md w-full"
                            disabled={isLoading} // Desabilita o select durante o loading
                        >
                            <option value="Não Iniciado">Não Iniciado</option>
                            <option value="Lendo">Lendo</option>
                            <option value="Completo">Completo</option>
                        </select>
                    </div>
                    <div>
                        <label>Data de Início:</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="p-2 rounded-md w-full"
                            disabled={isLoading} // Desabilita o input durante o loading
                        />
                    </div>
                    <div>
                        <label>Data Final:</label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="p-2 rounded-md w-full"
                            disabled={isLoading} // Desabilita o input durante o loading
                        />
                    </div>
                    <button
                        className={`p-2 rounded-md mt-4 ${getStatusButtonColor(status)} flex items-center justify-center`}
                        onClick={handleStatusChangeAndSave}
                        disabled={isLoading} // Desabilita o botão durante o loading
                    >
                        {isLoading ? <LoadingSpinner /> : getStatusButtonText(status)}
                    </button>
                    <button
                        onClick={handleSave}
                        className="p-2 rounded-md mt-4 flex items-center justify-center"
                        id='button'
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