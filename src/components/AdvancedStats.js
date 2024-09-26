import React, { useState } from 'react';
import { IoIosInformationCircleOutline } from "react-icons/io";
import { CSSTransition } from 'react-transition-group';
import { FaClipboard, FaClipboardCheck } from "react-icons/fa";
import './css/AdvancedStats.css';
import './css/ModalAnimations.css';

function AdvancedStats({ id, containerName, link, icon, logoSize, darkModeLogoColor, lightModeLogoColor, networkMode, containerImage }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isClipboardChecked, setIsClipboardChecked] = useState(false);

    networkMode = networkMode;

    const handleIconClick = () => {
        setIsModalOpen(true);
    };

    const handleCopyClick = () => {
        navigator.clipboard.writeText(id);
        setIsClipboardChecked(true);
        setTimeout(() => setIsClipboardChecked(false), 3000); // Reset after 3 seconds
    };

    // Check if the icon is a Simple Icon by checking the "SI:" prefix
    const isSimpleIcon = icon && icon.startsWith("SI:");
    const simpleIconName = isSimpleIcon ? icon.substring(3).toLowerCase() : null; // Convert to lowercase for the slug

    return (
        <>
            <IoIosInformationCircleOutline
                className="text-xl absolute right-0 flex flex-wrap"
                onClick={handleIconClick}
            />

            {/* Modal for displaying the variables */}
            <CSSTransition
                in={isModalOpen}
                timeout={300}
                classNames="modal"
                unmountOnExit
            >
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 bg-base-100 backdrop-filter backdrop-blur-sm transition-opacity duration-300 ease-in-out">
                    <div className="bg-base-100 rounded-lg shadow-lg p-4 max-w-xl w-full transition-transform transform-gpu duration-300 ease-in-out">
                        <h2 className="text-lg font-semibold mb-4 text-center">Container Information</h2>

                        <div className="space-y-3">
                            <div className="bg-base-200 p-2 rounded-lg shadow-md text-center">
                                <h3 className="text-md font-semibold mb-1">ID</h3>
                                <p className="break-words whitespace-nowrap overflow-hidden text-ellipsis">{id}</p>
                                <button
                                    onClick={handleCopyClick}
                                    className="mt-1 btn btn-outline btn-neutral btn-xs"
                                >
                                    {isClipboardChecked ? (
                                        <FaClipboardCheck className="text-accent mr-0 animate-pulse" />
                                    ) : (
                                        <FaClipboard className="text-primary mr-0" />
                                    )}
                                    <span className="ml-2">{isClipboardChecked ? 'Copied!' : 'Copy'}</span>
                                </button>
                            </div>

                            <div className="bg-base-200 p-2 rounded-lg shadow-md text-center">
                                <h3 className="text-md font-semibold mb-1">Container Name</h3>
                                <p>{containerName}</p>
                            </div>

                            <div className="bg-base-200 p-2 rounded-lg shadow-md text-center">
                                <h3 className="text-md font-semibold mb-1">Container Image</h3>
                                <p>{containerImage}</p>
                            </div>

                            <div className="bg-base-200 p-2 rounded-lg shadow-md text-center">
                                <h3 className="text-md font-semibold mb-1">Link</h3>
                                <p>
                                    {link ? (
                                        <a href={link} className="text-blue-500 hover:underline break-words">{link}</a>
                                    ) : (
                                        'N/A'
                                    )}
                                </p>
                            </div>

                            <div className="bg-base-200 p-2 rounded-lg shadow-md text-center">
                                <h3 className="text-md font-semibold mb-1">Network Mode</h3>
                                <p>{networkMode}</p>
                            </div>

                            <div className="bg-base-200 p-2 rounded-lg shadow-md text-center">
                                <h3 className="text-md font-semibold mb-1">Icon</h3>
                                <div className="flex justify-center">
                                    {isSimpleIcon ? (
                                        <img
                                            src={`https://cdn.simpleicons.org/${simpleIconName}${lightModeLogoColor && darkModeLogoColor ? `/${lightModeLogoColor}/${darkModeLogoColor}` : ''}`}
                                            alt={`${simpleIconName} Icon`}
                                            className={`${logoSize} container-icon w-20`}
                                        />
                                    ) : icon ? (
                                        <img
                                            src={`/icons/${icon}`}
                                            alt="Container Icon"
                                            className={`${logoSize} container-icon w-20`}
                                        />
                                    ) : (
                                        'N/A'
                                    )}
                                </div>
                            </div>
                        </div>

                        <button
                            className="btn btn-primary mt-4 w-full"
                            onClick={() => setIsModalOpen(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </CSSTransition>
        </>
    );
}

export default AdvancedStats;
