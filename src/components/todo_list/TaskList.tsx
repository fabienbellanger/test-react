import { memo } from 'react';
import Task from '../../models/Task';

/**
 * To-Do list component properties
 *
 * @property {Task[]} tasks List of tasks
 * @property {function} onToggle Callback function to handle task toggling
 * @property {function} onDelete Callback function to handle task deletion
 */
interface TaskListProps {
    tasks: Task[];
    onToggle: (index: number) => void;
    onDelete: (index: number) => void;
}

/**
 * To-Do list component
 *
 * @param {TaskListProps} props Component properties
 */
export default function TaskList({ tasks, onToggle, onDelete }: TaskListProps) {
    return (
        <div>
            {tasks.length === 0 ? (
                <div role="alert" className="alert alert-horizontal">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="stroke-info h-6 w-6 shrink-0"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                    </svg>
                    <div>
                        <h3 className="font-bold">No tasks available</h3>
                        <div className="text-xs">
                            Add a new task to get started!
                        </div>
                    </div>
                </div>
            ) : (
                <ul className="divide-y divide-gray-600 mx-2">
                    {tasks.map((task, i) => (
                        <TaskItem
                            key={i}
                            task={task}
                            index={i}
                            onToggle={onToggle}
                            onDelete={onDelete}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
}

/**
 * Task item component properties
 *
 */
interface TaskItemProps {
    task: Task;
    index: number;
    onToggle: (index: number) => void;
    onDelete: (index: number) => void;
}

/**
 * Component to render each task item
 *
 */
const TaskItem = memo(function TaskItem({
    task,
    index,
    onToggle,
    onDelete,
}: TaskItemProps) {
    return (
        <li className="py-2">
            <div className="flex items-center justify-between">
                <input
                    id={'task_' + index}
                    name={'task_' + index}
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => onToggle(index)}
                    className="checkbox checkbox-primary checkbox-md"
                />
                <label
                    htmlFor={`task_${index}`}
                    className={`ml-3 rtl:mr-3 block flex-1 text-ellipsis cursor-pointer ${
                        task.completed ? 'text-gray-400 line-through' : ''
                    }`}
                >
                    <span className="block w-64 truncate overflow-hidden whitespace-nowrap">
                        {task.title}
                    </span>
                </label>
                <button
                    type="button"
                    className="btn btn-xs btn-circle btn-soft btn-error"
                    aria-label="Delete task"
                    onClick={() => onDelete(index)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>
        </li>
    );
});
