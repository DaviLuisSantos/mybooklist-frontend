import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { UserContext } from '../../contexts/UserContext';
import CreateAccount from './CreateAccount';
import ForgotPassword from './ForgotPassword';

const Login = () => {
    const { login, loading, error, user } = useContext(UserContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isCreateAccountOpen, setIsCreateAccountOpen] = useState(false);
    const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.push('/library');
        }
    }, [user, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(username, password);
            router.push('/library');
        } catch (error) {
            console.error('Erro ao fazer login:', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-4 sm:p-8">
            <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md relative transition-transform transform scale-95 md:hover:scale-100">
                <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Login</h2>
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
                        className="text-white font-bold py-2 px-4 rounded-md w-full transition-transform transform md:hover:scale-105 focus:outline-none focus:shadow-outline"
                    >
                        {loading ? 'Carregando...' : 'Entrar'}
                    </button>
                </form>
                <div className="mt-4 flex justify-between">
                    <span
                        onClick={() => setIsForgotPasswordOpen(true)}
                        className="text-blue-200 md:hover:text-blue-400 underline cursor-pointer transition-colors"
                    >
                        Esqueci minha senha
                    </span>
                    <span
                        onClick={() => setIsCreateAccountOpen(true)}
                        className="text-blue-200 md:hover:text-blue-400 underline cursor-pointer transition-colors"
                    >
                        Criar conta
                    </span>
                </div>
            </div>
            <CreateAccount isOpen={isCreateAccountOpen} onClose={() => setIsCreateAccountOpen(false)} />
            <ForgotPassword isOpen={isForgotPasswordOpen} onClose={() => setIsForgotPasswordOpen(false)} />
        </div>
    );
};

export default Login;