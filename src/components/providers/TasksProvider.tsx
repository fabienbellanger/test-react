import { ReactNode } from 'react';
import useTaskReducer from '../../hooks/useTaskReducer';
import {
    AddTaskContext,
    TasksContext,
    TasksDispatchContext,
} from '../../contexts/TasksContext';

/**
 * Tasks provider component properties
 *
 * @property {ReactNode} children Children components
 */
interface TasksProviderProps {
    children: ReactNode;
}

/**
 * Global provider for all task-related contexts
 *
 */
export default function TasksProvider({ children }: TasksProviderProps) {
    const { tasks, addTask, dispatch } = useTaskReducer();

    return (
        <TasksContext.Provider value={tasks}>
            <AddTaskContext.Provider value={addTask}>
                <TasksDispatchContext.Provider value={dispatch}>
                    {children}
                </TasksDispatchContext.Provider>
            </AddTaskContext.Provider>
        </TasksContext.Provider>
    );
}
