import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const fetchConfig = async () => {
    try {
        const response = await fetch('/config.json');
        if (!response.ok) throw new Error('Failed to fetch configuration');
        return await response.json();
    } catch (error) {
        console.error('Error loading configuration:', error);
        toast.error('Failed to load configuration.');
        return null;
    }
};

const DataFetcher = ({ apihost, apiKey, setData, setIsInitialLoad, data }) => {
    const [configData, setConfigData] = useState(null);
    const [isInitialLoad, setInitialLoad] = useState(true);

    useEffect(() => {
        const initialize = async () => {
            const config = await fetchConfig();
            if (config) setConfigData(config);
        };

        initialize();
    }, []);

    useEffect(() => {
        if (!configData || !apihost || !apiKey) return;

        const fetchData = async () => {
            try {
                const response = await fetch(`${apihost}/stats`, {
                    method: 'GET',
                    headers: {
                        'Authorization': configData.SECRET
                    }
                });
                if (!response.ok) throw new Error('Failed to fetch data');
                const result = await response.json();

                if (JSON.stringify(result) !== JSON.stringify(data)) {
                    setData(result);
                }

                if (isInitialLoad) {
                    setIsInitialLoad(false);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                toast.error('Failed to fetch data. Please try again later.');
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 5000); // intervalTime can be managed via props or state if necessary
        return () => clearInterval(interval);
    }, [apihost, apiKey, data, setData, setIsInitialLoad, configData, isInitialLoad]);

    return null; // This component does not render anything
};

export default DataFetcher;
