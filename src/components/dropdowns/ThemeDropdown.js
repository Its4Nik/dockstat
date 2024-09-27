import React from 'react';
import { FaRegSun, FaRegMoon } from "react-icons/fa";

const SortDropdown = ({ value, onChange }) => {
    return (
        <div className="relative inline-block w-full">
            <select
                className="select select-bordered w-full pr-12"
                value={value}
                onChange={onChange}
            >
                <option value="light">Light</option>
                <option value="nord">Nord</option>
                <option value="valentine">Pastel</option>
                <option value="business">Business</option>
                <option value="dracula">Dracula</option>
                <option value="sunset">Sunset</option>
                <option value="night">Night</option>
                <option value="forest">Forest</option>
                <option value="black">Amoled</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center mr-5 pr-3 pointer-events-none">
                {value === '' && <FaRegSun className="text-xl" />}
                {value === 'light' && <FaRegSun className="text-xl" />}
                {value === 'nord' && <FaRegSun className="text-xl" />}
                {value === 'valentine' && <FaRegSun className="text-xl" />}
                {value === 'business' && <FaRegMoon className="text-xl" />}
                {value === 'dracula' && <FaRegMoon className="text-xl" />}
                {value === 'sunset' && <FaRegMoon className="text-xl" />}
                {value === 'night' && <FaRegMoon className="text-xl" />}
                {value === 'forest' && <FaRegMoon className="text-xl" />}
                {value === 'black' && <FaRegMoon className="text-xl" />}
            </div>
        </div>
    );
};

export default SortDropdown;
