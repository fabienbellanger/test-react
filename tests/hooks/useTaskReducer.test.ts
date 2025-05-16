import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, beforeEach } from 'vitest';
import useTaskReducer, { TaskActionType } from '../../src/hooks/useTaskReducer';
import Task from '../../src/models/Task';

describe('useTaskReducer', () => {
    beforeEach(() => {
        sessionStorage.clear();
    });

    it('adds a task', () => {
        const { result } = renderHook(() => useTaskReducer());
        const newTask: Task = { title: 'Test', completed: false };

        act(() => {
            result.current.addTask(newTask);
        });

        expect(result.current.tasks).toHaveLength(1);
        expect(result.current.tasks).toEqual([newTask]);
    });

    it('deletes a task', () => {
        const { result } = renderHook(() => useTaskReducer());
        const task: Task = { title: 'To delete', completed: false };

        act(() => {
            result.current.addTask(task);
        });

        act(() => {
            result.current.dispatch({
                type: TaskActionType.DELETE_TASK,
                key: 0,
            });
        });

        expect(result.current.tasks).toHaveLength(0);
    });

    it("toggles a task's status", () => {
        const { result } = renderHook(() => useTaskReducer());
        const task: Task = { title: 'To toggle', completed: false };

        act(() => {
            result.current.addTask(task);
        });

        act(() => {
            result.current.dispatch({
                type: TaskActionType.TOGGLE_TASK,
                key: 0,
            });
        });

        expect(result.current.tasks[0].completed).toBe(true);
    });
});
