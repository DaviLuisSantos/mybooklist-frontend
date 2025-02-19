import React, { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { loginUser, loginWithGoogle, createAccount } from '../api/UserService';
import { isTokenValid, removeToken, setToken, getToken } from '../utils/auth';
import Cookies from 'js-cookie';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [authChecked, setAuthChecked] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            setLoading(true);
            try {
                if (router.pathname !== '/login' && isTokenValid()) {
                    const token = getToken();
                    if (token) {
                        try {
                            const token = getToken();
                            const payload = JSON.parse(atob(token.split('.')[1]));
                            setUser(payload.username);
                        }
                        catch (error) {
                            console.log(error)
                        }
                    }
                }
            } finally {
                setLoading(false);
                setAuthChecked(true);
            }
        };

        checkAuth();
    }, [router.pathname]);

    const getUserFromCookie = () => {
        const userCookie = Cookies.get('user');
        if (userCookie) {
            return userCookie;
        }
        return null;
    };

    const login = async (email, password) => {
        setLoading(true);
        try {
            const response = await loginUser(email, password);
            const { token, username: user, id } = response.data.loginReturn;
            setToken(token, id, user);
            setUser(user);
            setError(null);
            router.push('/');//Redireciona para a página principal
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            setError('Erro ao fazer login. Por favor, verifique suas credenciais e tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    const loginGoogle = async (username, password, email) => {
        setLoading(true);
        try {
            const response = await loginWithGoogle(username, password, email);
            const { token, username: user, id } = response.data.loginReturn;
            setToken(token, id, user);
            setUser(user);
            setError(null);
            router.push('/');//Redireciona para a página principal
            return true;
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            setError('Erro ao fazer login. Por favor, verifique suas credenciais e tente novamente.');
        } finally {
            setLoading(false);
        }
    }

    const logout = () => {
        removeToken();
        setUser(null);
        router.push('/login');//Redireciona para a página de login
    };

    const createAccountSend = async (username, password, email) => {
        setLoading(true);
        setError('');
        try {
            const response = await createAccount(username, password, email);
            if (response) {
                setSuccessMessage('Conta criada com sucesso! Verifique seu e-mail e faça login para acessar a sua conta.');
                setTimeout(() => {
                    onClose();
                }, 2000);

                router.push('/login');
            }

        } catch (error) {
            console.error('Erro ao criar conta:', error);
            setError('Erro ao criar conta. Por favor, tente novamente.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <UserContext.Provider value={{ user, loading, error, login, loginGoogle, logout, authChecked, getUserFromCookie, createAccountSend }}>
            {children}
        </UserContext.Provider>
    );
};