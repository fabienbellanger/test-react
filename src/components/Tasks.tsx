import { memo } from 'react';
import Task from '../models/Task';

interface TasksProps {
    tasks: Task[];
    onUpdate: (updatedTasks: Task[]) => void;
}

export default function Tasks({ tasks, onUpdate }: TasksProps) {
    const handleToggle = (index: number) => {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, completed: !task.completed } : task
        );
        onUpdate(updatedTasks);
    };

    const deleteTask = (index: number) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        onUpdate(updatedTasks);
    };

    return (
        <ul className="divide-y divide-gray-200 px-4 mx-8">
            {tasks.map((task, i) => (
                <TaskItem
                    key={i}
                    task={task}
                    index={i}
                    onToggle={handleToggle}
                    onDelete={deleteTask}
                />
            ))}
        </ul>
    );
}

interface TaskItemProps {
    task: Task;
    index: number;
    onToggle: (index: number) => void;
    onDelete: (index: number) => void;
}

// Component to render each task item
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
                    className="h-5 w-5 rounded"
                />
                <label
                    htmlFor={`task_${index}`}
                    className={`ml-3 block flex-1 ${
                        task.completed
                            ? 'text-gray-400 line-through'
                            : 'text-gray-700'
                    }`}
                >
                    <span>{task.title}</span>
                </label>
                <button
                    type="button"
                    className="p-2 text-red-500 hover:text-red-700 cursor-pointer"
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
