import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { UserContext } from '@/contexts/UserContext';

const ActivateAccount = () => {
    const { activateAccountSend } = useContext(UserContext);
    const router = useRouter();
    const { email, token } = router.query;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (email && token) {
            handleActivation(email, token);
        }
    }, [email, token]);

    const handleActivation = async (email, token) => {
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await activateAccountSend(email, token);
            if (response.status === 200) {
                setSuccess('Conta ativada com sucesso!');
                router.push('/login');
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
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md" id="modal">
                <h2 className="text-2xl font-bold mb-4 text-center">Ativar Conta</h2>
                {loading && <p className="text-center">Ativando...</p>}
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                {success && <p className="text-green-500 text-sm mb-4">{success}</p>}
            </div>
        </div>
    );
};

export default ActivateAccount;