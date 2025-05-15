import { useContext } from 'react';
import AddTask from '../components/todo_list/AddTask';
import TaskList from '../components/todo_list/TaskList';
import { TasksContext } from '../contexts/TasksContext';

/**
 * To-Do list page component
 *
 */
export default function TodoList() {
    return (
        <div className="max-w-fit min-w-100 mx-auto my-16 pb-8">
            <div className="card card-border bg-base-200 overflow-hidden mx-2">
                <div className="card-body">
                    <Header title="To-Do List" />

                    <AddTask placeholder="Add a new task" />

                    <TaskList />
                </div>
            </div>
        </div>
    );
}

/**
 * To-Do list header component properties
 *
 * @property {string} title Title of the list
 */
interface HeaderProps {
    title: string;
}

/**
 * To-Do list header component
 *
 * @param {HeaderProps} props Component properties
 */
function Header({ title }: HeaderProps) {
    const tasks = useContext(TasksContext);

    return (
        <div className="py-2">
            <h1 className="flex items-center">
                <div className="font-bold text-2xl uppercase">{title}</div>
                {tasks.length > 0 && (
                    <span className="badge badge-accent badge-outline badge-sm mx-4">
                        {tasks.length}
                    </span>
                )}
            </h1>
        </div>
    );
}
