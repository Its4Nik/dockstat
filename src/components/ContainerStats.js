import React, { useState, useEffect } from 'react';
import { FaMemory, FaMicrochip, FaArrowDown, FaArrowUp, FaLink } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ContainerStats.css';

function formatBytesToMB(bytes) {
    return (bytes / (1024 * 1024)).toFixed(2);
}

function formatBytesToGB(bytes) {
    return (bytes / (1024 * 1024 * 1024)).toFixed(2);
}

function calculateCpuPercentage(cpuUsage, cpuLimit) {
    if (!cpuLimit || cpuLimit === 0) return 'N/A';
    return ((cpuUsage / cpuLimit) * 100).toFixed(2);
}

function getStatusClass(status) {
    switch (status) {
        case 'running':
            return 'status-green';
        case 'starting':
            return 'status-orange';
        case 'error':
            return 'status-red';
        default:
            return 'status-grey';
    }
}

function ContainerStats({ container }) {
    const { name, state, cpu_usage, mem_usage, mem_limit, current_net_rx, current_net_tx, link, icon } = container;

    const [prevCpuUsage, setPrevCpuUsage] = useState(cpu_usage);

    const cpuPercentage = calculateCpuPercentage(cpu_usage, 100000000000000);

    useEffect(() => {
        setPrevCpuUsage(cpu_usage);
    }, [cpu_usage]);

    const containerName = name.startsWith('/') ? name.substring(1) : name;

    // Check if the icon is a Simple Icon by checking the "SI:" prefix
    const isSimpleIcon = icon && icon.startsWith("SI:");
    const simpleIconName = isSimpleIcon ? icon.substring(3).toLowerCase() : null; // Convert to lowercase for the slug

    return (
        <div className="card shadow-md p-4 rounded-lg border border-base-300 relative">
            <ToastContainer />
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <div className={`status-orb ${getStatusClass(state)} ${state === 'running' || state === 'starting' || state === 'error' ? 'pulse' : ''}`}></div>
                    {link ? (
                        <a href={link} target="_blank" rel="noopener noreferrer" className="flex items-center">
                            <FaLink className="mr-1 text-gray-500" />
                            <h3 className="font-semibold text-lg ml-1">{containerName}</h3>
                        </a>
                    ) : (
                        <div className="flex items-center">
                            <h3 className="font-semibold text-lg ml-0">{containerName}</h3>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex items-center mt-2">
                <FaMicrochip className="mr-2 text-primary" />
                <p>{cpuPercentage}%</p>
            </div>
            <div className="flex items-center mt-2">
                <FaMemory className="mr-2 text-primary" />
                <p>{formatBytesToGB(mem_usage)} GB / {formatBytesToGB(mem_limit)} GB</p>
            </div>
            <div className="flex items-center mt-2">
                <FaArrowUp className={`network-stats ${current_net_tx !== 0 ? 'pulse' : ''} mr-2 text-info`} />
                <p>{formatBytesToMB(current_net_tx)} MB/s</p>
            </div>
            <div className="flex items-center mt-2">
                <FaArrowDown className={`network-stats ${current_net_rx !== 0 ? 'pulse' : ''} mr-2 text-info`} />
                <p>{formatBytesToMB(current_net_rx)} MB/s</p>
            </div>
            {isSimpleIcon ? (
                <img
                    src={`https://cdn.simpleicons.org/${simpleIconName}/black/white`}
                    alt={`${simpleIconName} Icon`}
                    className="container-icon absolute bottom-0 right-0 p-2"
                />
            ) : icon && (
                <img src={`/icons/${icon}`} alt="Container Icon" className="container-icon absolute bottom-0 right-0 p-2" />
            )}
        </div>
    );
}

export default ContainerStats;
