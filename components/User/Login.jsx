import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { UserContext } from '../../contexts/UserContext';
import CreateAccount from './CreateAccount';
import ForgotPassword from './ForgotPassword';

const Login = () => {
    const { login, loading, error, user } = useContext(UserContext);
    const [username, setEmailOrPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
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
        <div className="min-h-screen flex">
            {/* Imagem do lado esquerdo (apenas em desktop) */}
            <div className="hidden lg:block lg:w-3/5 bg-cover bg-center" style={{ backgroundImage: 'url(https://www.thepublicdiscourse.com/wp-content/uploads/2023/09/BOOKS.jpg)' }}></div>

            {/* Formulário de login */}
            <div className="w-full lg:w-2/5 flex items-start justify-center ">

                <div className="px-4 py-6 w-full lg:w-4/5">
                    <div className="flex items-center justify-center mb-8">
                        <svg className="w-8 h-8 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 20l9-5-9-5-9 5 9 5z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 12l9-5-9-5-9 5 9 5z" />
                        </svg>
                        <h1 className="text-2xl font-bold mb">My Book List</h1>
                    </div>
                    <h2 className="text-2xl font-semibold text-left my-4">
                        Nice to see you again
                    </h2>

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
                                onClick={() => setIsForgotPasswordOpen(true)}
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

                    <hr className="my-6 border-gray-300 w-full" />

                    <div className="mt-6">
                        <button
                            className="flex items-center justify-center w-full px-4 py-3 rounded-lg border border-gray-300 hover:bg-gray-100 focus:outline-none text-sm lg:text-base"
                            id="button">
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48">
                                <defs>
                                    <path id="a" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.7 6.3 29.1 4 24 4c-11.8 0-21.3 9.5-21.3 21.3 0 11.8 9.5 21.3 21.3 21.3 11.8 0 21.3-9.5 21.3-21.3 0-.9-0.1-1.7-0.2-2.5z" />
                                </defs>
                                <clipPath id="b">
                                    <use xlinkHref="#a" overflow="visible" />
                                </clipPath>
                                <path className="QvGUp" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.7 6.3 29.1 4 24 4c-11.8 0-21.3 9.5-21.3 21.3 0 11.8 9.5 21.3 21.3 21.3 11.8 0 21.3-9.5 21.3-21.3 0-.9-0.1-1.7-0.2-2.5z" fill="#4285F4" />
                                <path className=" মুদ্রিত" d="M21.5 44.6c5.7 0 10.6-2 14.3-5.6l-6.4-6.4c-2.2 1.5-5.1 2.5-7.9 2.5-4.8 0-8.8-3.2-10.2-6.8l-11.9 1C6.5 36.2 12.2 44.6 21.5 44.6z" fill="#34A853" />
                                <path className="YjxLc" d="M37.1 12.9L37.1 12.9c-2.2-1.5-5.1-2.5-7.9-2.5-4.8 0-8.8 3.2-10.2 6.8l11.9-1C41.3 14.8 35.6 6.4 26.2 6.4c-5.7 0-10.6 2-14.3 5.6l6.4 6.4C18 11.3 20.8 10.3 23.7 10.3c4.8 0 8.8 3.2 10.2 6.8L37.1 12.9z" fill="#FBBC05" />
                                <path className="WrvBxc" d="M24 44C10.2 44 2 34.7 2 24S10.2 4 24 4c11 0 21 8.2 21 18.3-1.3 4.1-4.7 7.2-8.9 9.4l-6.1 6.1c2.1 2.2 3.5 5.3 3.5 8.6z" fill="#EA4335" />
                            </svg>
                            Or sign in with Google
                        </button>
                    </div>

                    <div className="mt-6 text-center">
                        <p className="text-gray-700 text-sm lg:text-base">Don't have an account?
                            <button
                                onClick={() => setIsCreateAccountOpen(true)}
                                className="bg-blue-400 text-blue-400 bg-opacity-0 text-blue font-medium hover:underline focus:outline-none ml-1"
                            >
                                Sign up now
                            </button>
                        </p>
                    </div>
                </div>
            </div>

            <CreateAccount isOpen={isCreateAccountOpen} onClose={() => setIsCreateAccountOpen(false)} />
            <ForgotPassword isOpen={isForgotPasswordOpen} onClose={() => setIsForgotPasswordOpen(false)} />
        </div>
    );
};

export default Login;