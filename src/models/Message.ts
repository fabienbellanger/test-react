/**
 * Chatbot message direction
 *
 */
export enum MessageDirection {
    START = 'start',
    END = 'end',
}

/**
 * Chaotbot message model
 *
 * @property {string} msg Message content
 * @property {MessageDirection} direction Message direction ('start' or 'end')
 * @property {string} name Sender name (optional)
 * @property {string} avatarUrl Avatar image URL (optional)
 * @property {string} time Message time (optional)
 * @property {string} state Message state (optional)
 */
export default class Message {
    msg: string;
    direction: MessageDirection;
    name?: string;
    avatarUrl?: string;
    time?: string;
    state?: string;

    constructor(msg: string, direction: MessageDirection) {
        this.msg = msg;
        this.direction = direction;
        this.name = '';
    }

    /**
     * Initialize a new message
     *
     * @param {string} msg Message content
     * @param {MessageDirection} direction Message direction ('start' or 'end')
     * @param {string} [name] Sender name (optional)
     * @param {string} [avatarUrl] Avatar image URL (optional)
     * @param {string} [time] Message time (optional)
     * @param {string} [state] Message state (optional)
     * @returns {Message} New message instance
     */
    public static init(
        msg: string,
        direction: MessageDirection,
        name?: string,
        avatarUrl?: string,
        time?: string,
        state?: string
    ): Message {
        const message = new Message(msg, direction);
        message.msg = msg;
        message.name = name;
        message.avatarUrl = avatarUrl;
        message.time = time;
        message.state = state;

        return message;
    }
}
