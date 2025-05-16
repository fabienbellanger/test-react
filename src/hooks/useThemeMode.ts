import { useState, useCallback, useEffect } from 'react';

/**
 * Custom hook to manage theme mode (dark/light)
 *
 */
export default function useThemeMode() {
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        // Récupérer le thème actuel depuis l'attribut data-theme
        const theme = document.documentElement.getAttribute('data-theme');
        setTheme(theme ?? 'dark');
    }, []);

    /**
     * Toggle the theme mode between dark and light
     *
     */
    const toggleTheme = useCallback(() => {
        let newTheme = theme;
        if (theme === 'dark') {
            newTheme = 'light';
        } else {
            newTheme = 'dark';
        }
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    }, [theme]);

    return { theme, toggleTheme };
}
