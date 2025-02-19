import React from 'react';
import { useTheme } from 'next-themes';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeChange = () => {
    const { theme, setTheme } = useTheme();

    return (
        <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="focus:outline-none"
        >
            {theme === 'dark' ? <FaSun className="text-2xl" /> : <FaMoon className="text-2xl" />}
        </button>
    );
};

export default ThemeChange;