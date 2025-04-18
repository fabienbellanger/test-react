import { useState } from 'react';

interface InputProps {
    placeholder?: string;
    onClick: (v: string) => void;
}

export default function Input({ placeholder, onClick }: InputProps) {
    const [inputValue, setInputValue] = useState('');

    const buttonStyle =
        inputValue.trim() === ''
            ? 'flex-shrink-0 bg-gray-400 border-gray-400 text-sm border-1 text-white py-1 px-2 rounded'
            : 'flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-1 text-white py-1 px-2 rounded cursor-pointer';

    const addTask = () => {
        if (inputValue.trim() !== '') {
            // Capitalize the task name
            let taskName = inputValue.trim();
            taskName = taskName.charAt(0).toUpperCase() + taskName.slice(1);

            onClick(taskName);

            setInputValue('');
        }
    };

    const validOnEnter = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            e.stopPropagation();

            addTask();
        }
    };

    return (
        <form className="w-full max-w-sm mx-auto px-4 py-2">
            <div className="flex items-center border-b-2 border-teal-500 py-2">
                <input
                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    type="text"
                    placeholder={placeholder}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={validOnEnter}
                />
                <button className={buttonStyle} type="button" onClick={addTask}>
                    Add
                </button>
            </div>
        </form>
    );
}
