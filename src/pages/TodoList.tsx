import AddTask from '../components/todo_list/AddTask';
import TaskList from '../components/todo_list/TaskList';
import useTaskReducer from '../hooks/useTaskReducer';

/**
 * To-Do list page component
 *
 */
export default function TodoList() {
    const { tasks, taskCount, addTask, deleteTask, toggleTask } =
        useTaskReducer();

    return (
        <div className="max-w-fit min-w-100 mx-auto my-16 pb-8">
            <div className="card card-border bg-base-200 overflow-hidden mx-2">
                <div className="card-body">
                    <Header title="To-Do List" tasksNumber={taskCount} />

                    <AddTask placeholder="Add a new task" add={addTask} />

                    <TaskList
                        tasks={tasks}
                        onToggle={toggleTask}
                        onDelete={deleteTask}
                    />
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
        <div className="py-2">
            <h1 className="flex items-center">
                <div className="font-bold text-2xl uppercase">{title}</div>
                {tasksNumber > 0 && (
                    <span className="badge badge-accent badge-outline badge-sm mx-4">
                        {tasksNumber}
                    </span>
                )}
            </h1>
        </div>
    );
}
