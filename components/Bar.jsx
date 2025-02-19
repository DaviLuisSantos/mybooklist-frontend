import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';
import ThemeChange from '../components/ThemeChange';
import LogoutButton from './User/LogoutButton';

const Bar = () => {
    const { user, getUserFromCookie } = useContext(UserContext);
    const [username, setUsername] = useState('Usuário');

    useEffect(() => {
        const storedUser = getUserFromCookie();
        if (storedUser) {
            setUsername(storedUser);
        } else if (user) {
            setUsername(user.username);
        }
    }, [user]);

    return (
        <div className="w-full p-4 shadow-md z-50 flex items-center justify-between" id='bar'>
            <div className="flex items-center space-x-4">
                <h1 className="text-xl font-bold">
                    Lista de leitura de {username}
                </h1>
            </div>
            <div className="flex items-center space-x-4">
                <ThemeChange />
                <LogoutButton />
            </div>
        </div>
    );
};

export default Bar;