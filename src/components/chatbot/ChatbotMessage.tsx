/**
 * Chatbot massage component properties
 *
 * @property {string} direction Message direction ('start' or 'end')
 * @property {string} message Message content
 * @property {string} name Sender name (optional)
 * @property {string} avatarUrl Avatar image URL (optional)
 * @property {string} time Message time (optional)
 * @property {string} footer Message footer (optional)
 */
interface ChatbotMessageProps {
    direction: 'start' | 'end';
    message: string;
    name?: string;
    avatarUrl?: string;
    time?: string;
    footer?: string;
}

/**
 * Chatbot massage component
 *
 * @param {ChatbotMessageProps} props Component properties
 */
export default function ChatbotMessage({
    direction,
    message,
    name = '', // Valeur par défaut
    avatarUrl,
    time,
    footer,
}: ChatbotMessageProps) {
    const chatClasse = `chat ${
        direction === 'start' ? 'chat-start' : 'chat-end'
    }`;

    const getAvatarPlaceholder = () => {
        if (name.trim().length > 0) {
            return name.charAt(0).toUpperCase();
        }
        return direction === 'start' ? 'S' : 'E';
    };

    const avatarPlaceholderClass = `w-10 rounded-full ${
        direction === 'start'
            ? 'bg-secondary text-secondary-content'
            : 'bg-warning text-warning-content'
    }`;

    const renderAvatar = () => {
        if (avatarUrl) {
            return (
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img alt="Avatar" src={avatarUrl} />
                    </div>
                </div>
            );
        }
        return (
            <div className="chat-image avatar avatar-placeholder">
                <div className={avatarPlaceholderClass}>
                    <span>{getAvatarPlaceholder()}</span>
                </div>
            </div>
        );
    };

    return (
        <div className={chatClasse}>
            {renderAvatar()}
            <div className="chat-header">
                {name}
                {time && <time className="text-xs opacity-50">{time}</time>}
            </div>
            <div className="chat-bubble">{message}</div>
            {footer && <div className="chat-footer opacity-50">{footer}</div>}
        </div>
    );
}
