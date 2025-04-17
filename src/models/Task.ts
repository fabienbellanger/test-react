/**
 * Task model
 * 
 */
export default class Task {
    title: string;
    completed: boolean;

    constructor(title: string) {
        this.title = title;
        this.completed = false;
    }

    toggle() {
        this.completed = !this.completed;
    }
}
