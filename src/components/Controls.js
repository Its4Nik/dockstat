import React from 'react';

const Controls = ({ intervalTime, setIntervalTime, theme, setTheme }) => (
    <div>
        <select
            className="border p-2"
            value={intervalTime}
            onChange={(e) => setIntervalTime(Number(e.target.value))}
        >
            <option value={5000}>5 Seconds</option>
            <option value={10000}>10 Seconds</option>
            <option value={30000}>30 Seconds</option>
        </select>
        <select
            className="border p-2 ml-4"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
        >
            <option value="light">Light</option>
            <option value="nord">Nord</option>
            <option value="dracula">Dracula</option>
        </select>
    </div>
);

export default Controls;
