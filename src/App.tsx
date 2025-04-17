import Input from './components/Input';
import Task from './models/Task';

export default function App() {
    /**
     * Add a new task to the list
     * 
     * @param title Task title
     */
    const addTask = (title: string) => {
        const task = new Task(title);
        console.log(task);
    };

    return (
        <>
            <div className="max-w-md mx-auto bg-gray-100 shadow-lg rounded-lg overflow-hidden mt-16">
                <div className="px-4 py-2">
                    <h1 className="text-gray-800 font-bold text-2xl uppercase">
                        To-Do List
                    </h1>
                </div>
                <form className="w-full max-w-sm mx-auto px-4 py-2">
                    <Input placeholder="Add a new task" onClick={addTask}/>
                </form>
                <ul className="divide-y divide-gray-200 px-4">
                    <li className="py-4">
                        <div className="flex items-center">
                            <input
                                id="todo1"
                                name="todo1"
                                type="checkbox"
                                className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                            />
                            <label
                                htmlFor="todo1"
                                className="ml-3 block text-gray-900"
                            >
                                <span className="text-md font-normal">
                                    Finish project proposal
                                </span>
                            </label>
                        </div>
                    </li>
                </ul>
            </div>
        </>
    );
}
