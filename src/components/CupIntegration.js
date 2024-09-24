import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

const CupIntegration = ({ containerImage, cupHost }) => {
    const [result, setResult] = useState(null);

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

    return (
        <>
            {result && result.images && result.images[containerImage] !== undefined ? (
                <div className="container">
                    <p>Container: {containerImage}</p>
                    {result.images[containerImage] ? (
                        <ArrowUpwardIcon style={{ color: 'green' }} />
                    ) : (
                        <></>
                    )}
                </div>
            ) : (
                <></>
            )}
        </>
    );
}

export default CupIntegration;
