import { useCallback, useReducer } from 'react';
import Task from '../models/Task';

/**
 * Task action types
 *
 */
enum TaskActionType {
    ADD_TASK = 'ADD_TASK',
    DELETE_TASK = 'DELETE_TASK',
    TOGGLE_TASK = 'TOGGLE_TASK',
}

/**
 * Task action
 *
 * @property {TaskActionType} type Action type
 * @property {Task} payload Task object
 * @property {number} key Task index
 */
interface TaskAction {
    type: TaskActionType;
    payload?: Task;
    key?: number;
}

/**
 * Task state
 *
 * @property {Task[]} tasks List of tasks
 */
interface TaskState {
    tasks: Task[];
    currentIndex?: number;
}

/**
 * Task reducer function
 *
 * @param {TaskState} state State
 * @param {TaskAction} action Action
 * @returns {TaskState}
 */
function taskReducer(state: TaskState, action: TaskAction): TaskState {
    switch (action.type) {
        case TaskActionType.ADD_TASK:
            return {
                ...state,
                tasks: action.payload
                    ? [...state.tasks, action.payload]
                    : state.tasks,
            };
        case TaskActionType.DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter((_, i) => i !== action.key),
            };
        case TaskActionType.TOGGLE_TASK:
            return {
                ...state,
                tasks: state.tasks.map((task, i) =>
                    i === action.key
                        ? { ...task, completed: !task.completed }
                        : task
                ),
            };
        default:
            throw Error('Unknown action for taskReducer: ' + action.type);
    }
}

/**
 * Task reducer hook
 *
 */
export default function useTaskReducer() {
    const [state, dispatch] = useReducer(taskReducer, {
        tasks: [],
    });

    return {
        tasks: state.tasks,
        taskCount: state.tasks.length,
        addTask: useCallback(
            (task: Task) =>
                dispatch({ type: TaskActionType.ADD_TASK, payload: task }),
            []
        ),
        deleteTask: useCallback(
            (key: number) =>
                dispatch({ type: TaskActionType.DELETE_TASK, key }),
            []
        ),
        toggleTask: useCallback(
            (key: number) =>
                dispatch({ type: TaskActionType.TOGGLE_TASK, key }),
            []
        ),
    };
}
