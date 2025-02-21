import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { UserContext } from '../../contexts/UserContext';

const CreateAccount = ({ onClose }) => {
    const { createAccountSend } = useContext(UserContext);
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
            const response = await createAccountSend(username, password, email);
            if (response) {
                setSuccessMessage('Conta criada com sucesso! Verifique seu e-mail e faça login para acessar a sua conta.');

                /*
                setTimeout(() => {
                    onClose();
                }, 2000);

                router.push('/login');
                */

            }

        } catch (error) {
            console.error('Erro ao criar conta:', error);
            setError('Erro ao criar conta. Por favor, tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <button
                onClick={onClose}
                className="font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline disabled:opacity-50"
                id="button"
            >
                Voltar
            </button>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2">Usuário</label>
                    <input
                        type="text"
                        id="username"
                        placeholder='username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:border-blue-500 transition-colors text-sm lg:text-base"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2">Email</label>
                    <input
                        type="text"
                        id="emailOrPhone"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:border-blue-500 transition-colors text-sm lg:text-base"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2">Senha</label>
                    <input
                        type="password"
                        id="password"
                        placeholder='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:border-blue-500 transition-colors text-sm lg:text-base"
                        required
                    />
                </div>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <button
                    type="submit"
                    disabled={loading}
                    className="font-bold py-2 px-4 rounded-md w-full"
                    id='button'
                >
                    {loading ? 'Carregando...' : 'Criar Conta'}
                </button>
            </form>
            {error && <p className="text-red-500 mt-4">{error}</p>}
            {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
        </>
    );
};

export default CreateAccount;