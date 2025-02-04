import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';
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
        <div className="fixed top-0 left-0 w-full bg-gray-800 text-white p-4 shadow-md z-50">
            <h1 className="text-center text-xl font-bold">
                Lista de leitura de {username}
            </h1>
        </div>
    );
};

export default Bar;