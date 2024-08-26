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
    const [intervalTime, setIntervalTime] = useState(10000);
    const [theme, setTheme] = useState('');
    const [loadingTheme, setLoadingTheme] = useState(false);
    const [apihost, setApihost] = useState('');
    const [apiKey, setApiKey] = useState('');
    const [logoSize, setLogoSize] = useState('');
    const [darkModeLogoColor, setDarkModeLogoColor] = useState('');
    const [lightModeLogoColor, setLightModeLogoColor] = useState('');

    const handleConfigLoaded = (configData) => {
        setApihost(configData.API_URL);
        setApiKey(configData.SECRET);
        setLogoSize(configData.LOGO_SIZE);
        setDarkModeLogoColor(configData.DARK_MODE_LOGO_COLOR);
        setLightModeLogoColor(configData.LIGHT_MODE_LOGO_COLOR);
    };

    return (
        <div className="container mx-auto p-4">
            <ToastContainer />
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold text-primary">DockStat</h1>
                <Controls
                    intervalTime={intervalTime}
                    setIntervalTime={setIntervalTime}
                    theme={theme}
                    setTheme={setTheme}
                />
            </div>
            <ConfigFetcher onConfigLoaded={handleConfigLoaded} />
            <ThemeSwitcher theme={theme} />
            <DataFetcher
                apihost={apihost}
                apiKey={apiKey}
                setData={setData}
                setIsInitialLoad={setIsInitialLoad}
                data={data}
            />
            <Loading isInitialLoad={isInitialLoad} loadingTheme={loadingTheme} />
            {Object.keys(data).length === 0 ? (
                <div>
                    <p className="text-center text-primary text-lg">Loading...</p>
                    <p className="text-center text-secondary text-small">If this screen persists, please check the browser console.</p>
                </div>
            ) : (
                Object.keys(data).map((host) => {
                    return (
                        <HostStats
                            key={host}
                            host={host}
                            containers={data[host]}
                            logoSize={logoSize}
                            darkModeLogoColor={darkModeLogoColor}
                            lightModeLogoColor={lightModeLogoColor}
                        />
                    );
                })
            )}
        </div>
    );
}

export default App;
