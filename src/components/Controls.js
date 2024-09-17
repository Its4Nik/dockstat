import React, { useState, useEffect } from 'react';
import { FaGithub } from 'react-icons/fa';
import { IoSettingsOutline, IoTerminalOutline } from "react-icons/io5";
import { CSSTransition } from 'react-transition-group';
import ConfigModal from './ConfigModal';
import SortDropdown from './dropdowns/SortDropdown';
import ThemeDropdown from './dropdowns/ThemeDropdown';
import './css/ModalAnimations.css';
import './css/ConfigModal.css';

const Controls = ({ intervalTime, setIntervalTime, theme, setTheme, sortOption, setSortOption, apihost, apiKey, defaultTheme, gridSize, setGridSize }) => {
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
    const [isTerminalModalOpen, setIsTerminalModalOpen] = useState(false);
    const [initialThemeSet, setInitialThemeSet] = useState(false);
    const [currentTheme, setCurrentTheme] = useState('');

    useEffect(() => {
        if (isSettingsModalOpen && !initialThemeSet) {
            setCurrentTheme(defaultTheme);
            setInitialThemeSet(true);
        }
    }, [isSettingsModalOpen, defaultTheme, initialThemeSet]);

    const handleThemeChange = (e) => {
        const newTheme = e.target.value;
        setCurrentTheme(newTheme);
        setTheme(newTheme);
    };

    return (
        <>
            {/* Control Buttons */}
            <div className="flex items-center space-x-4">
                {/* Open Settings Modal Button */}
                <button
                    className="btn btn-outline flex items-center space-x-2"
                    onClick={() => setIsSettingsModalOpen(true)}
                >
                    <IoSettingsOutline />
                </button>

                {/* Open Terminal Modal Button */}
                <button
                    className="btn btn-outline flex items-center space-x-2"
                    onClick={() => setIsTerminalModalOpen(true)}
                >
                    <IoTerminalOutline />
                </button>

                {/* GitHub Icon */}
                <a
                    href="https://github.com/its4nik/dockstat"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-4xl text-primary hover:text-secondary"
                >
                    <FaGithub />
                </a>
            </div>

            {/* Settings Modal */}
            <CSSTransition
                in={isSettingsModalOpen}
                timeout={300}
                classNames="modal"
                unmountOnExit
            >
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 bg-base-100 backdrop-filter backdrop-blur-sm transition-opacity duration-300 ease-in-out">
                    <div className="bg-base-100 rounded-lg shadow-lg p-6 w-80 transition-transform transform-gpu duration-300 ease-in-out">
                        <h2 className="text-lg font-semibold mb-4">Settings</h2>

                        {/* Theme Selector */}
                        <div className="mb-4">
                            <h3 className="text-md font-medium mb-2">Select Theme</h3>
                            <ThemeDropdown
                                value={currentTheme} // Use the current theme from the local state
                                onChange={handleThemeChange}
                            />
                        </div>

                        {/* Refresh Rate Selector */}
                        <div className="mb-4">
                            <h3 className="text-md font-medium mb-2">Select Refresh Rate</h3>
                            <select
                                className="select select-bordered w-full"
                                value={intervalTime}
                                onChange={(e) => setIntervalTime(Number(e.target.value))}
                            >
                                <option value={5000}>5 Seconds</option>
                                <option value={10000}>10 Seconds</option>
                                <option value={30000}>30 Seconds</option>
                            </select>
                        </div>

                        {/* Sort Selector */}
                        <div className="mb-4">
                            <h3 className="text-md font-medium mb-2">Sort Hosts By</h3>
                            <SortDropdown
                                value={sortOption}
                                onChange={(e) => setSortOption(e.target.value)}
                            />
                        </div>

                        {/* Size Selector */}

                        <div className="mb-4">
                            <h3 className="text-md font-medium mb-2">Grid Size</h3>
                            <select
                                className="select select-bordered w-full"
                                value={gridSize}
                                onChange={(e) => setGridSize(e.target.value)}
                            >
                                <option value="compact">Compact</option>
                                <option value="medium">Medium</option>
                                <option value="large">Large</option>
                            </select>
                        </div>

                        <button
                            className="btn btn-primary mt-6 w-full"
                            onClick={() => setIsSettingsModalOpen(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </CSSTransition>

            {/* Terminal Modal */}
            <CSSTransition
                in={isTerminalModalOpen}
                timeout={300}
                classNames="modal"
                unmountOnExit
            >
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 bg-base-100 backdrop-filter backdrop-blur-sm transition-opacity duration-300 ease-in-out">
                    <div className="bg-base-100 rounded-lg shadow-lg p-6 transition-transform transform-gpu duration-300 ease-in-out max-h-[80vh] w-full max-w-[75%]">
                        <div className="mb-4 overflow-y-auto max-h-[60vh]">
                            <div className="w-full">
                                <div className="coding inverse-toggle px-5 shadow-lg text-gray-100 text-sm font-mono subpixel-antialiased backgroud-config pb-6 pt-4 rounded-lg leading-normal">
                                    <div className="top mb-1 flex">
                                        <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                                        <div className="ml-2 h-3 w-3 bg-orange-300 rounded-full"></div>
                                        <div className="ml-2 h-3 w-3 bg-green-500 rounded-full"></div>
                                    </div>
                                    <div className="mt-1 flex">
                                        <div className="flex-1 typing items-center">
                                            <ConfigModal apihost={apihost} apiKey={apiKey} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button
                            className="btn btn-primary mt-6 w-full"
                            onClick={() => setIsTerminalModalOpen(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </CSSTransition>
        </>
    );
};

export default Controls;
