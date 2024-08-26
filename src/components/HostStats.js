import React, { useState } from 'react';
import { FaArrowDown } from "react-icons/fa";

import ContainerStats from './ContainerStats';

function HostStats({ host, containers }) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className="mb-6 border border-base-300 rounded-lg p-4">
            <div
                className="flex items-center cursor-pointer"
                onClick={toggleCollapse}
            >
                <span
                    className={`mr-2 transition-transform duration-300 ease-in-out ${isCollapsed ? 'rotate-180' : ''}`}
                >
                    <FaArrowDown />
                </span>
                <h2 className="text-xl font-semibold mb-2 text-primary flex-1">{host} - {containers.length} Containers</h2>
                <div className="text-right ml-4">
                    <h3 className="text-secondary">Ram amount: TODO</h3>
                    <h3 className="text-secondary">CPU Cores: TODO</h3>
                </div>
            </div>
            <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${isCollapsed ? 'max-h-0 opacity-0' : 'max-h-full opacity-100'}`}
            >
                <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {containers.map((container) => (
                        <ContainerStats key={container.name} container={container} />
                    ))}
                </div>
            </div>
        </div >
    );
}

export default HostStats;
