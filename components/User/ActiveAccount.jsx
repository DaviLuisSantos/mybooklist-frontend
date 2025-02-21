import { useState } from 'react';
import axios from 'axios';

const ActiveAccount = () => {
    const [activationCode, setActivationCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleActivation = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await axios.post('/api/activate-account', { code: activationCode });
            if (response.status === 200) {
                setSuccess('Conta ativada com sucesso!');
            } else {
                setError('Falha ao ativar a conta. Por favor, tente novamente.');
            }
        } catch (err) {
            setError('Erro ao ativar a conta. Por favor, tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Ativar Conta</h2>
                <form onSubmit={handleActivation}>
                    <div className="mb-4">
                        <label htmlFor="activationCode" className="block text-sm font-medium text-gray-700">
                            Código de Ativação
                        </label>
                        <input
                            type="text"
                            id="activationCode"
                            value={activationCode}
                            onChange={(e) => setActivationCode(e.target.value)}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    {success && <p className="text-green-500 text-sm mb-4">{success}</p>}
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        disabled={loading}
                    >
                        {loading ? 'Ativando...' : 'Ativar Conta'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ActiveAccount;