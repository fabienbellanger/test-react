import { useCallback, useReducer } from 'react';
import Task from '../models/Task';

/**
 * Task action types
 *
 */
export enum TaskActionType {
    ADD_TASK = 'ADD_TASK',
    DELETE_TASK = 'DELETE_TASK',
    TOGGLE_TASK = 'TOGGLE_TASK',
}

/**
 * Task action
 *
 * @property {TaskActionType} type Action type
 * @property {Task} payload Task object
 * @property {string} key Task ID
 */
export interface TaskAction {
    type: TaskActionType;
    payload?: Task;
    key?: string;
}

/**
 * Task state
 *
 * @property {Task[]} tasks List of tasks
 */
interface TaskState {
    tasks: Task[];
    current?: number;
}

/**
 * Task reducer function
 *
 * @param {TaskState} state State
 * @param {TaskAction} action Action
 * @returns {TaskState}
 */
function taskReducer(state: TaskState, action: TaskAction): TaskState {
    let newState: TaskState;

    switch (action.type) {
        case TaskActionType.ADD_TASK: {
            newState = {
                ...state,
                tasks: action.payload
                    ? [...state.tasks, action.payload]
                    : state.tasks,
            };
            break;
        }
        case TaskActionType.DELETE_TASK: {
            newState = {
                ...state,
                tasks: state.tasks.filter((task) => task.id !== action.key),
            };
            break;
        }
        case TaskActionType.TOGGLE_TASK: {
            newState = {
                ...state,
                tasks: state.tasks.map((task) =>
                    task.id === action.key
                        ? { ...task, completed: !task.completed }
                        : task
                ),
            };
            break;
        }
        default:
            throw Error('Unknown action for taskReducer: ' + action.type);
    }

    // Save the new state to session storage
    try {
        sessionStorage.setItem('tasks', JSON.stringify(newState.tasks));
    } catch (error) {
        throw Error('Error saving tasks to sessionStorage:' + error);
    }

    return newState;
}

/**
 * Initializes the task reducer
 *
 * @returns
 */
function initTaskReducer(): TaskState {
    try {
        const tasks = JSON.parse(sessionStorage.getItem('tasks') || '[]');
        return { tasks };
    } catch (error) {
        throw Error('Error getting tasks from sessionStorage:' + error);
    }
}

/**
 * Task reducer hook
 *
 */
export default function useTaskReducer() {
    const [state, dispatch] = useReducer(taskReducer, initTaskReducer());

    return {
        dispatch,
        tasks: state.tasks,
        addTask: useCallback(
            (task: Task) =>
                dispatch({ type: TaskActionType.ADD_TASK, payload: task }),
            []
        ),
        // deleteTask: useCallback(
        //     (key: number) =>
        //         dispatch({ type: TaskActionType.DELETE_TASK, key }),
        //     []
        // ),
        // toggleTask: useCallback(
        //     (key: number) =>
        //         dispatch({ type: TaskActionType.TOGGLE_TASK, key }),
        //     []
        // ),
    };
}
