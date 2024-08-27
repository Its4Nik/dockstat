import { useEffect } from 'react';
import { themeChange } from 'theme-change';

const ThemeSwitcher = ({ theme }) => {
    useEffect(() => {
        themeChange(false);
        document.querySelector('html').setAttribute('data-theme', theme);
    }, [theme]);

    return null;
};

export default ThemeSwitcher;
