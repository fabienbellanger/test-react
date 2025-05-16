import useThemeMode from '../../hooks/useThemeMode';
import { MdLightMode, MdDarkMode } from 'react-icons/md';

/**
 * Theme
 *
 */
export default function ThemeToggle() {
    const { theme, toggleTheme } = useThemeMode();

    return (
        <button className="btn text-xl" onClick={toggleTheme}>
            {theme === 'dark' ? (
                <MdLightMode className="text-yellow-600" />
            ) : (
                <MdDarkMode className="text-blue-900" />
            )}
        </button>
    );
}
