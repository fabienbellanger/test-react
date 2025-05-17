import Message from '../../models/Message';

/**
 * Chatbot massage component properties
 *
 * @property {string} direction Message direction ('start' or 'end')
 * @property {Message} message Message
 */
interface ChatbotMessageProps {
    direction: 'start' | 'end';
    message: Message;
}

/**
 * Chatbot massage component
 *
 * @param {ChatbotMessageProps} props Component properties
 */
export default function ChatbotMessage({
    direction,
    message,
}: ChatbotMessageProps) {
    const chatClasse = `chat ${
        direction === 'start' ? 'chat-start' : 'chat-end'
    }`;

    const getAvatarPlaceholder = () => {
        if (message.name && message.name.trim().length > 0) {
            return message.name.charAt(0).toUpperCase();
        }
        return direction === 'start' ? 'S' : 'E';
    };

    const avatarPlaceholderClass = `w-10 rounded-full ${
        direction === 'start'
            ? 'bg-secondary text-secondary-content'
            : 'bg-warning text-warning-content'
    }`;

    const renderAvatar = () => {
        if (message.avatarUrl) {
            return (
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img alt="Avatar" src={message.avatarUrl} />
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
                {message.name}
                {message.time && (
                    <time className="text-xs opacity-50">{message.time}</time>
                )}
            </div>
            <div className="chat-bubble">{message.msg}</div>
            {message.state && (
                <div className="chat-footer opacity-50">{message.state}</div>
            )}
        </div>
    );
}
