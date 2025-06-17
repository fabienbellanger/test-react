import { useContext } from 'react';
import AddTask from '../components/todo_list/AddTask';
import TaskList from '../components/todo_list/TaskList';
import { TasksContext } from '../contexts/TasksContext';
import useFetch from '../hooks/useFetch';
import { FetchAPI, FetchAPIMethod } from '../api/fetch';

/**
 * To-Do list page component
 *
 */
export default function TodoListPage() {
    const { sendText } = useFetch();

    return (
        <div className="max-w-fit min-w-100 mx-auto my-16 pb-8">
            <div className="flex flex-row justify-center items-center gap-2 ">
                <button
                    className="btn btn-dash btn-accent btn-sm mb-4"
                    onClick={async () => {
                        try {
                            const res = await sendText(
                                new FetchAPI(
                                    'http://localhost:4444/admin',
                                    FetchAPIMethod.GET,
                                    undefined,
                                    undefined,
                                    true,
                                ),
                            );
                            console.log(res);
                        } catch (error) {
                            console.error(error);
                        }
                    }}
                >
                    Admin route
                </button>
                <button
                    className="btn btn-dash btn-primary btn-sm mb-4"
                    onClick={async () => {
                        try {
                            await sendText(
                                new FetchAPI(
                                    'http://localhost:4444/401',
                                    FetchAPIMethod.GET,
                                    undefined,
                                    undefined,
                                    true,
                                ),
                            );
                        } catch (error) {
                            console.error(error);
                        }
                    }}
                >
                    Trigger 401 Error
                </button>
            </div>

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
                    <span className="badge badge-accent badge-outline badge-sm mx-4">{tasks.length}</span>
                )}
            </h1>
        </div>
    );
}
