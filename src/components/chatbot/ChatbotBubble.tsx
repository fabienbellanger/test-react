import { useMemo } from 'react';

interface ChatbotBubbleProps {
    direction: 'start' | 'end';
    name: string;
    avatarUrl?: string;
    time?: string;
    message: string;
    footer?: string;
}

export default function ChatbotBubble({
    direction,
    name,
    avatarUrl,
    time,
    message,
    footer,
}: ChatbotBubbleProps) {
    const chatClasse = useMemo(() => {
        let c = 'chat ';
        c += direction === 'start' ? 'chat-start' : 'chat-end';
        return c;
    }, [direction]);

    return (
        <div className={chatClasse}>
            {avatarUrl !== undefined && (
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img alt="Avatar" src={avatarUrl} />
                    </div>
                </div>
            )}
            <div className="chat-header">
                {name}
                {time !== undefined && (
                    <time className="text-xs opacity-50">{time}</time>
                )}
            </div>
            <div className="chat-bubble">{message}</div>
            {footer !== undefined && (
                <div className="chat-footer opacity-50">{footer}</div>
            )}
        </div>
    );
}
