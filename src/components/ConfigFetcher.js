import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ThemeSwitcher from './ThemeSwitcher'; // Import the ThemeSwitcher component

const ConfigFetcher = ({ onConfigLoaded }) => {
    const [isLoading, setIsLoading] = useState(true); // Destructure the state and setter
    const [defaultTheme, setDefaultTheme] = useState(null);

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const response = await fetch('/config.json');
                const configData = await response.json();
                setDefaultTheme(configData.DEFAULT_THEME); // Store default theme
                onConfigLoaded(configData);
            } catch (error) {
                console.error('Error loading configuration:', error);
                toast.error('Failed to load configuration.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchConfig();
    }, [onConfigLoaded]);

    return defaultTheme ? <ThemeSwitcher theme={defaultTheme} /> : null; // Render ThemeSwitcher with default theme
};

export default ConfigFetcher;
