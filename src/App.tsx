import { useState } from 'react';
import Input from './components/Input';
import Tasks from './components/Tasks';
import Task from './models/Task';

export default function App() {
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
            <Header title="To-Do List" />

            <Input placeholder="Add a new task" onClick={addTask} />

            <Tasks tasks={tasks} onUpdate={setTasks} />
        </div>
    );
}

interface HeaderProps {
    title: string;
}

function Header({ title }: HeaderProps) {
    return (
        <div className="px-12 py-2 pt-8">
            <h1 className="text-gray-700 font-bold text-2xl uppercase">
                {title}
            </h1>
        </div>
    );
}
