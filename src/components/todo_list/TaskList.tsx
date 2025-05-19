import { memo, useContext } from 'react';
import Task from '../../models/Task';
import {
    TasksContext,
    TasksDispatchContext,
} from '../../contexts/TasksContext';
import { TaskActionType } from '../../hooks/useTaskReducer';
import { MdDelete, MdInfoOutline } from 'react-icons/md';
import { AnimatePresence, motion } from 'motion/react';

/**
 * To-Do list component
 *
 */
export default function TaskList() {
    const tasks = useContext(TasksContext);

    return (
        <div>
            {tasks.length === 0 ? (
                <motion.div
                    role="alert"
                    className="alert alert-horizontal"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <MdInfoOutline className="text-xl text-info" />
                    <div>
                        <h3 className="font-bold">No tasks available</h3>
                        <div className="text-xs">
                            Add a new task to get started!
                        </div>
                    </div>
                </motion.div>
            ) : (
                <motion.ul className="divide-y divide-gray-600 mx-2">
                    <AnimatePresence>
                        {tasks.map((task) => (
                            <MotionTaskItem key={task.id} task={task} />
                        ))}
                    </AnimatePresence>
                </motion.ul>
            )}
        </div>
    );
}

/**
 * Task item component properties
 *
 * @property {Task} task Task object
 * @property {number} index Task index
 */
interface TaskItemProps {
    task: Task;
}

/**
 * Component to render each task item
 *
 */
const TaskItem = memo(function TaskItem({ task }: TaskItemProps) {
    const dispatch = useContext(TasksDispatchContext);

    return (
        <motion.li
            layout
            className="py-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
        >
            <div className="flex items-center justify-between">
                <input
                    id={'task_' + task.id}
                    name={'task_' + task.id}
                    type="checkbox"
                    checked={task.completed}
                    onChange={() =>
                        dispatch({
                            type: TaskActionType.TOGGLE_TASK,
                            key: task.id,
                        })
                    }
                    className="checkbox checkbox-primary checkbox-md"
                />
                <label
                    htmlFor={`task_${task.id}`}
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
                    className="btn btn-sm btn-circle btn-ghost"
                    aria-label="Delete task"
                    onClick={() =>
                        dispatch({
                            type: TaskActionType.DELETE_TASK,
                            key: task.id,
                        })
                    }
                >
                    <MdDelete className="text-xl text-error" />
                </button>
            </div>
        </motion.li>
    );
});

const MotionTaskItem = motion.create(TaskItem);
