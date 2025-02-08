import { useTheme } from 'next-themes';
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeChange = () => {
    const { theme, setTheme } = useTheme();

    const handleThemeChange = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <button
            onClick={handleThemeChange}
        >
            {theme === 'light' ? <FaMoon /> : <FaSun />}
        </button>
    )
}

export default ThemeChange;