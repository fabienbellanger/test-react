import Task from "../models/Task";

interface TasksProps {
    tasks: Task[]
    onUpdate: (updatedTasks: Task[]) => void
}

export default function Tasks({tasks, onUpdate}: TasksProps) {
    // TODO: Peu performant, test React.memo
    const handleToggle = (index: number) => {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, completed: !task.completed } : task
        );
        onUpdate(updatedTasks)
    }

    return (
        <ul className="divide-y divide-gray-200 px-4 mx-8">
            {tasks.map((task, i) => (
                <li key={i} className="py-4">
                    <div className="flex items-center">
                        <input
                            id={'task_' + i}
                            name={'task_' + i}
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => handleToggle(i)}
                            className="h-5 w-5 rounded"
                        />
                        <label
                            htmlFor={'task_' + i}
                            className="w-full ml-3 block text-gray-900"
                        >
                            <span className="text-md font-normal">
                                {task.title}
                            </span>
                        </label>
                    </div>
                </li>
            ))}
        </ul>
    )
}