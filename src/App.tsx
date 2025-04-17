import { useState } from 'react';
import Input from './components/Input';
import Tasks from './components/Tasks';
import Task from './models/Task';

export default function App() {
    const [tasks, setTasks] = useState<Task[]>([])

    /**
     * Add a new task to the list
     * 
     * @param title Task title
     */
    const addTask = (title: string) => {
        const task = new Task(title);
        setTasks(prevTasks => [...prevTasks, task]);
    };

    return (
        <>
            <div className="max-w-md mx-auto bg-gray-100 shadow-lg rounded-lg overflow-hidden mt-16 pb-8">
                <div className="px-12 py-2 pt-8">
                    <h1 className="text-gray-800 font-bold text-2xl uppercase">
                        To-Do List
                    </h1>
                </div>
                <form className="w-full max-w-sm mx-auto px-4 py-2">
                    <Input placeholder="Add a new task" onClick={addTask}/>
                </form>
                <Tasks tasks={tasks} onUpdate={setTasks}/>
            </div>
        </>
    );
}
