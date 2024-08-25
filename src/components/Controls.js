import React from 'react';
import { FaGithub } from 'react-icons/fa';

const Controls = ({ intervalTime, setIntervalTime, theme, setTheme }) => (
    <div className="flex items-center space-x-4">
        {/* Interval Time Dropdown */}
        <div className="relative">
            <select
                className="select select-bordered p-2 appearance-none pr-7"
                value={intervalTime}
                onChange={(e) => setIntervalTime(Number(e.target.value))}
            >
                <option value={5000}>5 Seconds</option>
                <option value={10000}>10 Seconds</option>
                <option value={30000}>30 Seconds</option>
            </select>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                {/* Optional custom icon for dropdown */}
            </span>
        </div>

        {/* Theme Dropdown */}
        <div className="relative">
            <select
                className="select select-bordered p-2 appearance-none pr-7"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
            >
                <option value="light">☀️ - Light</option>
                <option value="nord">☀️ - Nord</option>
                <option value="dracula">🌙 - Dracula</option>
                <option value="sunset">🌙 - Sunset</option>
                <option value="night">🌙 - Night</option>
                <option value="black">🌙 - Amoled</option>
            </select>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                {/* Optional custom icon for dropdown */}
            </span>
        </div>

        {/* GitHub Icon */}
        <a
            href="https://github.com/its4nik/dockstat" // Replace with your GitHub repo URL
            target="_blank"
            rel="noopener noreferrer"
            className="text-4xl text-gray-600 hover:text-gray-900"
        >
            <FaGithub />
        </a>
    </div>
);

export default Controls;
