import { createContext, Dispatch } from 'react';
import Task from '../models/Task';
import { TaskAction } from '../hooks/useTaskReducer';

export const TasksContext = createContext([] as Task[]);
export const TasksDispatchContext = createContext<Dispatch<TaskAction>>(
    () => {}
);
export const AddTaskContext = createContext<(task: Task) => void>(() => {});
export const DeleteTaskContext = createContext<(key: number) => void>(() => {});
export const ToggleTaskContext = createContext<(key: number) => void>(() => {});
