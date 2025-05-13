import { useState } from 'react';
import AddTask from '../components/todo_list/AddTask';
import TaskList from '../components/todo_list/TaskList';
import Task from '../models/Task';

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
        <div className="max-w-md mx-auto overflow-hidden my-16 pb-8">
            <div className="card card-border bg-base-200">
                <div className="card-body">
                    <Header title="To-Do List" tasksNumber={tasks.length} />

                    <AddTask placeholder="Add a new task" onClick={addTask} />

                    <TaskList tasks={tasks} onUpdate={setTasks} />
                </div>
            </div>
        </div>
    );
}

/**
 * To-Do list header component properties
 *
 * @property {string} title Title of the list
 * @property {number} tasksNumber Number of tasks in the list
 */
interface HeaderProps {
    title: string;
    tasksNumber: number;
}

/**
 * To-Do list header component
 *
 * @param {HeaderProps} props Component properties
 * @returns
 */
function Header({ title, tasksNumber }: HeaderProps) {
    return (
        <div className="px-6 py-2 pt-8">
            <h1 className="flex items-center">
                <div className="font-bold text-2xl uppercase">{title}</div>
                {tasksNumber > 0 && (
                    <div>
                        <span>&nbsp;</span>
                        <span className="badge badge-accent badge-outline badge-sm">
                            {tasksNumber}
                        </span>
                    </div>
                )}
            </h1>
        </div>
    );
}
