import { useState } from 'react';
import Input from './Input';
import Tasks from './Tasks';
import Task from '../../models/Task';

export default function TodoList() {
    const [tasks, setTasks] = useState<Task[]>([]);

    /**
     * Add a new task to the list
     *
     * @param title Task title
     */
    const addTask = (title: string) => {
        setTasks((prevTasks) => [...prevTasks, new Task(title)]);
    };

    return (
        <div className="max-w-md mx-auto bg-gray-100 shadow-lg rounded-lg overflow-hidden my-16 pb-8">
            <Header title="To-Do List" tasksNumber={tasks.length} />

            <Input placeholder="Add a new task" onClick={addTask} />

            <Tasks tasks={tasks} onUpdate={setTasks} />
        </div>
    );
}

interface HeaderProps {
    title: string;
    tasksNumber: number;
}

function Header({ title, tasksNumber }: HeaderProps) {
    return (
        <div className="px-12 py-2 pt-8">
            <h1 className="flex items-center">
                <div className="text-gray-700 font-bold text-2xl uppercase">
                    {title}
                </div>
                {tasksNumber > 0 && (
                    <span className="inline-flex items-center rounded-md bg-teal-200 px-2 py-1 ml-2 text-xs font-medium text-teal-700 ring-1 ring-teal-600/50 ring-inset">
                        {tasksNumber}
                    </span>
                )}
            </h1>
        </div>
    );
}
