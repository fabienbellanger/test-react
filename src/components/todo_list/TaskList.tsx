import { memo } from 'react';
import Task from '../../models/Task';

interface TaskListProps {
    tasks: Task[];
    onUpdate: (updatedTasks: Task[]) => void;
}

export default function TaskList({ tasks, onUpdate }: TaskListProps) {
    /**
     * Toggle the completion status of a task
     *
     * @param index Index of the task to toggle
     */
    const handleToggle = (index: number) => {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, completed: !task.completed } : task
        );
        onUpdate(updatedTasks);
    };

    /**
     * Delete a task from the list
     *
     * @param index Index of the task to delete
     */
    const deleteTask = (index: number) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        onUpdate(updatedTasks);
    };

    return (
        <div>
            {tasks.length === 0 ? (
                <div className="text-center italic">
                    No tasks available. Add a new task to get started!
                </div>
            ) : (
                <ul className="divide-y divide-gray-600 mx-2">
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
            )}
        </div>
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
                    className="btn btn-xs btn-circle btn-error"
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
