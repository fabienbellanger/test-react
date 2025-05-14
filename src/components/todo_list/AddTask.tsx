import { useCallback, useMemo, useRef, useState } from 'react';

/**
 * To-Do list add task component properties
 *
 * @property {string} placeholder Input placeholder
 * @property {function} onClick Callback function to handle task addition
 */
interface AddTaskProps {
    placeholder?: string;
    onClick: (v: string) => void;
}

/**
 * To-Do list add task component
 *
 * @param {AddTaskProps} props Component properties
 */
export default function AddTask({ placeholder, onClick }: AddTaskProps) {
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const buttonStyle = useMemo(() => {
        return inputValue.trim() === ''
            ? 'btn btn-disabled'
            : 'btn btn-success';
    }, [inputValue]);

    /**
     * Add a new task to the list
     *
     * @param {string} title Task title
     */
    const addTask = useCallback(() => {
        if (inputValue.trim() !== '') {
            // Capitalize the task name
            let taskName = inputValue.trim();
            taskName = taskName.charAt(0).toUpperCase() + taskName.slice(1);

            onClick(taskName);

            setInputValue('');
            inputRef.current?.focus();
        }
    }, [inputValue, onClick]);

    /**
     * Handle the Enter key press
     *
     * @param {React.KeyboardEvent} e Keyboard event
     */
    const validOnEnter = useCallback(
        (e: React.KeyboardEvent) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                e.stopPropagation();
                addTask();
            }
        },
        [addTask]
    );

    /**
     * Handle input change
     *
     * @param {React.ChangeEvent<HTMLInputElement>} e Input change event
     */
    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setInputValue(e.target.value);
        },
        []
    );

    return (
        <div className="w-full max-w-sm mx-auto py-2">
            <div className="flex items-center gap-4 py-2">
                <input
                    className="input input-bordered flex-1"
                    type="text"
                    placeholder={placeholder}
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={validOnEnter}
                    ref={inputRef}
                    autoFocus
                />
                <button className={buttonStyle} type="button" onClick={addTask}>
                    Add
                </button>
            </div>
        </div>
    );
}
