import { useEffect } from 'react';

const ThemeSwitcher = ({ theme, setTheme, setLoadingTheme }) => {
    useEffect(() => {
        setLoadingTheme(true);
        if (theme === 'nord') {
            import('./themes/nord.css').then(() => setLoadingTheme(false));
        } else if (theme === 'dracula') {
            import('./themes/dracula.css').then(() => setLoadingTheme(false));
        } else if (theme === 'light') {
            import('./themes/light.css').then(() => setLoadingTheme(false));
        }
    }, [theme, setLoadingTheme]);

    return null; // This component does not render anything
};

export default ThemeSwitcher;
