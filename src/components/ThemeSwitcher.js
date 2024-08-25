import { useEffect } from 'react';
import { themeChange } from 'theme-change';

const ThemeSwitcher = ({ theme }) => {
    useEffect(() => {
        themeChange(false);
        document.querySelector('html').setAttribute('data-theme', theme); // Set theme attribute on the HTML tag
    }, [theme]);

    return null; // This component doesn't need to render anything
};

export default ThemeSwitcher;
