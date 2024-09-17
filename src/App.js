import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import HostStats from './components/HostStats';
import ConfigFetcher from './components/ConfigFetcher';
import ThemeSwitcher from './components/ThemeSwitcher';
import DataFetcher from './components/DataFetcher';
import Controls from './components/Controls';
import CircularProgress from '@material-ui/core/CircularProgress';

function App() {
    const [data, setData] = useState({});
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [theme, setTheme] = useState('');
    const [intervalTime, setIntervalTime] = useState(10000);
    const [loadingTheme, setLoadingTheme] = useState(false);
    const [apihost, setApihost] = useState('');
    const [apiKey, setApiKey] = useState('');
    const [logoSize, setLogoSize] = useState('');
    const [darkModeLogoColor, setDarkModeLogoColor] = useState('');
    const [lightModeLogoColor, setLightModeLogoColor] = useState('');
    const [sortOption, setSortOption] = useState('name-asc');
    const [defaultTheme, setDefaultTheme] = useState('');
    const [gridSize, setGridSize] = useState('compact');

    const handleConfigLoaded = (configData) => {
        setApihost(configData.API_URL);
        setApiKey(configData.SECRET);
        setLogoSize(configData.LOGO_SIZE);
        setDarkModeLogoColor(configData.DARK_MODE_LOGO_COLOR);
        setLightModeLogoColor(configData.LIGHT_MODE_LOGO_COLOR);
        setDefaultTheme(configData.DEFAULT_THEME);
    };

    const sortHosts = (hostsData, option) => {
        const sortedHosts = [...Object.keys(hostsData)].sort((a, b) => {
            const aData = hostsData[a];
            const bData = hostsData[b];

            switch (option) {
                case 'name-asc':
                    return a.localeCompare(b);
                case 'name-desc':
                    return b.localeCompare(a);
                case 'containers-asc':
                    return aData.length - bData.length;
                case 'containers-desc':
                    return bData.length - aData.length;
                default:
                    return 0;
            }
        });
        return sortedHosts;
    };

    return (
        <div className="container mx-auto p-4">
            <ToastContainer />
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold text-primary">DockStat</h1>
                <Controls
                    apiKey={apiKey}
                    apihost={apihost}
                    intervalTime={intervalTime}
                    setIntervalTime={setIntervalTime}
                    theme={theme}
                    setTheme={setTheme}
                    sortOption={sortOption}
                    setSortOption={setSortOption}
                    defaultTheme={defaultTheme}
                    gridSize={gridSize}
                    setGridSize={setGridSize}
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
            {Object.keys(data).length === 0 ? (
                <div>
                    <div className="flex justify-center items-center h-full">
                        <div className="text-primary">
                            <CircularProgress />
                        </div>
                    </div>
                    <p className="text-center text-primary text-lg">Loading...</p>
                    <p className="text-center text-secondary text-small">If this screen persists, please check the browser console.</p>
                </div>
            ) : (
                sortHosts(data, sortOption).map((host) => {
                    return (
                        <HostStats
                            key={host}
                            host={host}
                            containers={data[host]}
                            logoSize={logoSize}
                            darkModeLogoColor={darkModeLogoColor}
                            lightModeLogoColor={lightModeLogoColor}
                            gridSize={gridSize}
                        />
                    );
                })
            )}
        </div>
    );
}

export default App;
