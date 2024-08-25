import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import HostStats from './components/HostStats';
import ConfigFetcher from './components/ConfigFetcher';
import ThemeSwitcher from './components/ThemeSwitcher';
import DataFetcher from './components/DataFetcher';
import Controls from './components/Controls';
import Loading from './components/Loading';

function App() {
    const [data, setData] = useState({});
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [intervalTime, setIntervalTime] = useState(5000);
    const [theme, setTheme] = useState('');
    const [loadingTheme, setLoadingTheme] = useState(false);
    const [apihost, setApihost] = useState('');
    const [apiKey, setApiKey] = useState('');

    return (
        <div className={`container mx-auto p-4 theme-${theme}`}>
            <ToastContainer />
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">DockStat</h1>
                <Controls
                    intervalTime={intervalTime}
                    setIntervalTime={setIntervalTime}
                    theme={theme}
                    setTheme={setTheme}
                />
            </div>
            <ConfigFetcher
                onConfigLoaded={({ API_URL, SECRET, DEFAULT_THEME }) => {
                    setApihost(API_URL);
                    setApiKey(SECRET);
                    setTheme(DEFAULT_THEME);
                }}
            />
            <ThemeSwitcher
                theme={theme}
                setTheme={setTheme}
                setLoadingTheme={setLoadingTheme}
            />
            <DataFetcher
                apihost={apihost}
                apiKey={apiKey}
                setData={setData}
                setIsInitialLoad={setIsInitialLoad}
                data={data}
            />
            <Loading isInitialLoad={isInitialLoad} loadingTheme={loadingTheme} />
            {Object.keys(data).length === 0 ? (
                <p>No data available. 🫨</p>
            ) : (
                Object.keys(data).map((host) => (
                    <HostStats key={host} host={host} containers={data[host]} />
                ))
            )}
        </div>
    );
}

export default App;
