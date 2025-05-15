import { useCallback, useContext, useMemo, useRef, useState } from 'react';
import Task from '../../models/Task';
import { AddTaskContext } from '../../contexts/TasksContext';

/**
 * To-Do list add task component properties
 *
 * @property {string} placeholder Input placeholder
 */
interface AddTaskProps {
    placeholder?: string;
}

/**
 * To-Do list add task component
 *
 * @param {AddTaskProps} props Component properties
 */
export default function AddTask({ placeholder }: AddTaskProps) {
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const addTask = useContext(AddTaskContext);

    const buttonStyle = useMemo(() => {
        return inputValue.trim() === ''
            ? 'btn btn-disabled'
            : 'btn btn-soft btn-primary';
    }, [inputValue]);

    /**
     * Add a new task to the list
     *
     * @param {string} title Task title
     */
    const add = useCallback(() => {
        if (inputValue.trim() !== '') {
            // Capitalize the task name
            let taskName = inputValue.trim();
            taskName = taskName.charAt(0).toUpperCase() + taskName.slice(1);

            addTask(new Task(taskName));

            setInputValue('');
            inputRef.current?.focus();
        }
    }, [inputValue, addTask]);

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
                add();
            }
        },
        [add]
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
                <button className={buttonStyle} type="button" onClick={add}>
                    Add
                </button>
            </div>
        </div>
    );
}
