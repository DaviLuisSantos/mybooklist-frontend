import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { UserContext } from '../../contexts/UserContext';
import CreateAccount from './CreateAccount';
import ForgotPassword from './ForgotPassword';
import LoginForm from './LoginForm';
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from "react-icons/fc";
import ThemeChange from '../ThemeChange';
import axios from 'axios';

const Login = () => {
    const { user, setUser, login, loginGoogle } = useContext(UserContext);
    const [currentView, setCurrentView] = useState('login'); // Estado para controlar a visualização atual
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.push('/');
        }
    }, [user, router]);

    const fetchGoogleUserData = async (tokenResponse) => {
        try {
            const { access_token } = tokenResponse;
            const response = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });
            const userData = response.data;
            const createResponse = await loginGoogle(userData.given_name, userData.id, userData.email,);

        } catch (error) {
            console.error('Failed to fetch user data:', error);
        }
    };

    const loginG = useGoogleLogin({
        onSuccess: fetchGoogleUserData,
    });

    return (
        <div className="min-h-screen flex relative">
            {/* Imagem do lado esquerdo (apenas em desktop) */}
            <div className="hidden lg:block lg:w-3/5 bg-cover bg-center" style={{ backgroundImage: 'url(https://www.thepublicdiscourse.com/wp-content/uploads/2023/09/BOOKS.jpg)' }}></div>

            {/* Formulário de login */}
            <div className="w-full lg:w-2/5 flex items-start justify-center relative">
                <div className="absolute top-4 right-4 text-3xl">
                    <ThemeChange />
                </div>
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
                    {currentView === 'login' && (
                        <>
                            <LoginForm setCurrentView={setCurrentView} />

                            <hr className="my-6 border-gray-300 w-full" />

                            <div className="mt-6">
                                <button
                                    className="flex items-center justify-center w-full px-4 py-3 rounded-lg border border-gray-300 hover:bg-gray-100 focus:outline-none text-sm lg:text-base"
                                    id="button"
                                    onClick={() => loginG()}>
                                    <FcGoogle className='text-2xl' />
                                    Or sign in with Google
                                </button>
                            </div>

                            <div className="mt-6 text-center">
                                <p className="text-gray-700 text-sm lg:text-base">Don't have an account?
                                    <button
                                        onClick={() => setCurrentView('createAccount')}
                                        className="bg-blue-400 text-blue-400 bg-opacity-0 text-blue font-medium hover:underline focus:outline-none ml-1"
                                    >
                                        Sign up now
                                    </button>
                                </p>
                            </div>
                        </>
                    )}

                    {currentView === 'createAccount' && (
                        <CreateAccount onClose={() => setCurrentView('login')} />
                    )}

                    {currentView === 'forgotPassword' && (
                        <ForgotPassword isOpen={true} onClose={() => setCurrentView('login')} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;