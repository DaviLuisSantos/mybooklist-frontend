import React, { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { loginUser } from '../api/UserService';
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

    const login = async (username, password) => {
        setLoading(true);
        try {
            const response = await loginUser(username, password);
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

    const logout = () => {
        removeToken();
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, loading, error, login, logout, authChecked, getUserFromCookie }}>
            {children}
        </UserContext.Provider>
    );
};