import React, { useState } from 'react';
import ContainerStats from './ContainerStats';

function HostStats({ host, containers }) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className="mb-6">
            <div
                className="flex items-center cursor-pointer"
                onClick={toggleCollapse}
            >
                <span
                    className={`mr-2 transition-transform duration-300 ease-in-out ${isCollapsed ? 'rotate-180' : ''}`}
                >
                    ▲
                </span>
                <h2 className="text-xl font-semibold mb-2">{host} - {containers.length} Containers</h2>
            </div>
            <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${isCollapsed ? 'max-h-0 opacity-0' : 'max-h-full opacity-100'}`}
            >
                <h3>Ram amount: TODO</h3>
                <h3>CPU Cores: TODO</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {containers.map((container) => (
                        <ContainerStats key={container.name} container={container} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HostStats;
