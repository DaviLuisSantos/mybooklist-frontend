import React, { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { FaSignOutAlt } from 'react-icons/fa';

const LogoutButton = () => {
    const { logout } = useContext(UserContext);

    const handleLogout = () => {
        logout();
    };

    return (
        <button
            onClick={handleLogout}
            className="p-2 rounded-md bg-red-500 hover:bg-red-700 text-white flex items-center space-x-2"
        >
            <FaSignOutAlt />
            <span>Logout</span>
        </button>
    );
};

export default LogoutButton;