import ChatbotMessage from '../components/chatbot/ChatbotMessage';
import Message, { MessageDirection } from '../models/Message';

// interface ChatbotProps {}

const messages = [
    Message.init(
        'You were the Chosen One!',
        MessageDirection.START,
        'Obi-Wan Kenobi',
        'https://img.daisyui.com/images/profile/demo/kenobee@192.webp',
        '12:45',
        'delivered'
    ),
    Message.init(
        'I hate you!',
        MessageDirection.END,
        'Anakin Skywalker',
        undefined,
        '12:46',
        'sent'
    ),
    Message.init(
        'You were like a brother to me, Anakin.',
        MessageDirection.START,
        'Obi-Wan Kenobi',
        'https://img.daisyui.com/images/profile/demo/kenobee@192.webp',
        '12:47',
        'delivered'
    ),
    Message.init(
        '...',
        MessageDirection.END,
        'Anakin Skywalker',
        'https://img.daisyui.com/images/profile/demo/anakeen@192.webp',
        '12:48',
        undefined
    ),
];

/**
 * Chatbot page component
 *
 */
export default function ChatbotPage() {
    return (
        <div className="p-4 text-gray-200">
            {messages.map((message, index) => (
                <ChatbotMessage
                    key={index}
                    direction={message.direction}
                    message={message}
                />
            ))}
        </div>
    );
}
