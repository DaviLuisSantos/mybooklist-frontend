import { useState } from 'react';
import { useRouter } from 'next/router';
import { createAccount } from '../../api/UserService';

const CreateAccount = ({ isOpen, onClose }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccessMessage('');

        try {
            const response = await createAccount(username, password, email);
            if (response) {
                setSuccessMessage('Conta criada com sucesso! Verifique se e-mail e faça login para acessar a sua conta.');
                setTimeout(() => {
                    onClose();
                }, 2000);

                router.push('/login'); // Redirecione para a página de login após a criação da conta
            }

        } catch (error) {
            console.error('Erro ao criar conta:', error);
            setError('Erro ao criar conta. Por favor, tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 sm:p-8">
            <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md relative transition-transform transform scale-95 md:hover:scale-100">
                <button className="absolute top-2 right-2 text-gray-500 dark:text-gray-300 text-2xl cursor-pointer md:hover:text-gray-700 dark:md:hover:text-gray-100 transition-colors rounded-lg" onClick={onClose}>×</button>
                <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Criar Conta</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2">Usuário</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 w-full text-gray-800 dark:text-gray-100 focus:outline-none focus:border-blue-500 transition-colors"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 w-full text-gray-800 dark:text-gray-100 focus:outline-none focus:border-blue-500 transition-colors"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2">Senha</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 w-full text-gray-800 dark:text-gray-100 focus:outline-none focus:border-blue-500 transition-colors"
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md w-full transition-transform transform md:hover:scale-105 focus:outline-none focus:shadow-outline"
                    >
                        {loading ? 'Carregando...' : 'Criar Conta'}
                    </button>
                </form>
                {error && <p className="text-red-500 mt-4">{error}</p>}
                {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
            </div>
        </div>
    );
};

export default CreateAccount;