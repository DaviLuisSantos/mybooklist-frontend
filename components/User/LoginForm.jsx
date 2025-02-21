import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { UserContext } from '../../contexts/UserContext';

const LoginForm = ({ setCurrentView }) => {
    const { login, loading } = useContext(UserContext);
    const [username, setEmailOrPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (await login(username, password))
                router.push('/');
        } catch (error) {
            console.error('Erro ao fazer login:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="py-2">
                <input
                    type="text"
                    id="emailOrPhone"
                    placeholder="Email or phone number"
                    value={username}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:border-blue-500 transition-colors text-sm lg:text-base"
                    required
                />
            </div>
            <div className="mb-6 relative">
                <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:border-blue-500 transition-colors text-sm lg:text-base"
                    required
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 hover:text-gray-700 focus:outline-none"
                >
                    {showPassword ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10S6.477 0 12 0c2.21 0 4.27.72 5.875 1.925M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-1.61 0-3.14-.385-4.458-1.075M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-1.61 0-3.14-.385-4.458-1.075M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    )}
                </button>
            </div>

            <div className="flex items-center justify-between mb-6">
                <label className="flex items-center text-gray-700 text-sm lg:text-base">
                    <input
                        type="checkbox"
                        className="mr-2 rounded focus:ring-blue-500 h-4 w-4"
                        checked={rememberMe}
                        onChange={() => setRememberMe(!rememberMe)}
                    />
                    Remember me
                </label>
                <button
                    type="button"
                    onClick={() => setCurrentView('forgotPassword')}
                    className="text-blue-500 hover:underline focus:outline-none text-sm lg:text-base"
                >
                    Forgot password?
                </button>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="font-bold py-3 px-6 rounded-lg w-full focus:outline-none focus:shadow-outline disabled:opacity-50"
                id='button'
            >
                {loading ? 'Loading...' : 'Sign In'}
            </button>
        </form>
    );
};

export default LoginForm;