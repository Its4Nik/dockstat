import React from 'react';
import { AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai";
import { TbSortDescendingNumbers, TbSortAscendingNumbers } from "react-icons/tb";

const ThemeDropdown = ({ value, onChange }) => {
    return (
        <div className="relative inline-block w-full">
            <select
                className="select select-bordered w-full pr-12"
                value={value}
                onChange={onChange}
            >
                <option value="name-asc">Name Ascending</option>
                <option value="name-desc">Name Descending</option>
                <option value="containers-asc">Container Amount Ascending</option>
                <option value="containers-desc">Container Amount Descending</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center mr-5 pr-3 pointer-events-none">
                {value === 'name-asc' && <AiOutlineSortAscending className="text-xl" />}
                {value === 'name-desc' && <AiOutlineSortDescending className="text-xl" />}
                {value === 'containers-asc' && <TbSortAscendingNumbers className="text-xl" />}
                {value === 'containers-desc' && <TbSortDescendingNumbers className="text-xl" />}
            </div>
        </div>
    );
};

export default ThemeDropdown;
