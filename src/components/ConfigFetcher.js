import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const ConfigFetcher = ({ onConfigLoaded }) => {
    const [isLoading, setIsLoading] = useState(true); // Destructure the state and setter

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const response = await fetch('/config.json');
                const configData = await response.json();
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

    return null; // This component does not render anything
};

export default ConfigFetcher;
