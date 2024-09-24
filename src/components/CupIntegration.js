import { useEffect, useState } from 'react';
import toast from 'react-toastify'

const CupIntegration = ({ containerName, cupHost }) => {
    const [result, setResult] = useState('');

    useEffect(() => {
        if (!cupHost) return;

        const fetchData = async () => {
            try {
                const response = await fetch(`${cupHost}/json`, {
                    method: 'GET',
                });

                if (!response.ok) throw new Error('Failed to fetch data');

                const data = await response.json();
                setResult(data);
            } catch (error) {
                console.error('Error fetching data:', error);
                toast.error('Failed to fetch data. Please try again later.');
            }
        };

        fetchData();
    }, [cupHost]);
}