/**
 * Task model
 *
 * @property {string} title Task title
 * @property {boolean} completed Task completion status
 */
export default class Task {
    title: string;
    completed: boolean;

    constructor(title: string) {
        this.title = title;
        this.completed = false;
    }
}
