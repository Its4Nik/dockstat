import React, { useState, useRef, useEffect } from 'react';
import { FaArrowDown } from "react-icons/fa";

import ContainerStats from './ContainerStats';

function HostStats({ host, containers, logoSize, darkModeLogoColor, lightModeLogoColor, gridSize }) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [contentHeight, setContentHeight] = useState('auto');
    const contentRef = useRef(null);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    const getGridClass = (gridSize) => {
        switch (gridSize) {
            case 'compact':
                return 'md:grid-cols-4';
            case 'medium':
                return 'md:grid-cols-3';
            case 'large':
                return 'md:grid-cols-2';
            default:
                return 'md:grid-cols-4';
        }
    };

    useEffect(() => {
        if (contentRef.current) {
            setContentHeight(isCollapsed ? '0px' : `${contentRef.current.scrollHeight}px`);
        }
    }, [isCollapsed]);

    return (
        <div className="mb-6 border border-base-300 rounded-lg p-4">
            <div
                className="flex items-center cursor-pointer"
                onClick={toggleCollapse}
            >
                <span
                    className={`mr-2  mb-1 transition-transform duration-300 ease-in-out ${isCollapsed ? 'rotate-180' : ''}`}
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
                ref={contentRef}
                className="transition-all duration-500 ease-in-out overflow-hidden"
                style={{ maxHeight: contentHeight, opacity: isCollapsed ? '0' : '1' }}
            >
                <div className={`mt-2 grid gap-3 grid-cols-1 ${getGridClass(gridSize)}`}>
                    {containers.map((container) => (
                        <ContainerStats
                            key={container.name}
                            container={container}
                            logoSize={logoSize}
                            darkModeLogoColor={darkModeLogoColor}
                            lightModeLogoColor={lightModeLogoColor}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HostStats;