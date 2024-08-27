import React, { useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { IoSettingsOutline } from "react-icons/io5";
import { CSSTransition } from 'react-transition-group';
import './css/ModalAnimations.css'; // Import the CSS for animations

const Controls = ({ intervalTime, setIntervalTime, theme, setTheme }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleThemeChange = (e) => {
        setTheme(e.target.value);
    };

    return (
        <>
            {/* Control Buttons */}
            <div className="flex items-center space-x-4">
                {/* Open Modal Button */}
                <button
                    className="btn btn-outline flex items-center space-x-2"
                    onClick={() => setIsModalOpen(true)}
                >
                    <IoSettingsOutline />
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

            {/* Modal for Settings */}
            <CSSTransition
                in={isModalOpen}
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
                            <select
                                className="select select-bordered w-full"
                                value={theme}
                                onChange={handleThemeChange}
                            >
                                <option value="light">☀️ - Light</option>^
                                <option value="nord">☀️ - Nord</option>
                                <option value="valentine">☀️ - Pastel</option>
                                <option value="business">🌙 - Business</option>
                                <option value="dracula">🌙 - Dracula</option>
                                <option value="sunset">🌙 - Sunset</option>
                                <option value="night">🌙 - Night</option>
                                <option value="forest">🌙 - Forest</option>
                                <option value="black">🌙 - Amoled</option>
                            </select>
                        </div>

                        {/* Refresh Rate Selector */}
                        <div>
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

                        <button
                            className="btn btn-primary mt-6 w-full"
                            onClick={() => setIsModalOpen(false)}
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
