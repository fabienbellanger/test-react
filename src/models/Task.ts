/**
 * Task model
 *
 * @property {string} title Task title
 * @property {boolean} completed Task completion status
 */
export default class Task {
    id: string;
    title: string;
    completed: boolean;

    constructor(title: string) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.completed = false;
    }
}
