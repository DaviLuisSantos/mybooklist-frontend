import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';
import ThemeChange from '../components/ThemeChange';
import Cookies from 'js-cookie';

const Bar = () => {
    const { user } = useContext(UserContext);
    const [username, setUsername] = useState('Usuário');

    useEffect(() => {
        const storedUser = Cookies.get('user');
        if (storedUser) {
            setUsername(storedUser);
        } else if (user) {
            setUsername(user.username);
        }
    }, [user]);

    return (
        <div className="w-full p-4 shadow-md z-50 flex items-center justify-between" id='bar'>
            <h1 className="text-xl font-bold">
                Lista de leitura de {username}
            </h1>
            <ThemeChange />
        </div>
    );
};

export default Bar;