import React, { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { loginUser } from '../api/UserService';
import { isTokenValid, removeToken, setToken, getToken } from '../utils/auth';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [authChecked, setAuthChecked] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = () => {
            if (router.pathname !== '/login' && isTokenValid()) {
                const token = getToken();
                if (token) {
                    try {
                        //const payload = JSON.parse(atob(token.split('.')[1]));
                        //setUser({ username: payload.username });
                    } catch (error) {
                        console.error('Erro ao decodificar o token:', error);
                        removeToken();
                    }
                }
            }
            setLoading(false);
            setAuthChecked(true);
        };

        checkAuth();
    }, [router.pathname]);

    const login = async (username, password) => {
        setLoading(true);
        try {

            const response = await loginUser(username, password);
            const { token, username: user, id } = response.data.loginReturn;
            setToken(token, id, user);
            setUser(user);
            setError(null);
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            setError('Erro ao fazer login. Por favor, tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        removeToken();
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, loading, error, login, logout, authChecked }}>
            {children}
        </UserContext.Provider>
    );
};