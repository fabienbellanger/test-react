import { useState } from 'react';

interface InputProps {
    value: string;
    placeholder?: string;
    // onClick: () => void;
}

export default function Input({ value, placeholder }: InputProps) {
    const [inputValue, setInputValue] = useState(value);

    return (
        <div className="flex items-center border-b-2 border-teal-500 py-2">
            <input
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text"
                placeholder={placeholder}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <button
                className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded cursor-pointer"
                type="button"
                onClick={(e) => console.log(e)}
            >
                Add
            </button>
        </div>
    );
}
