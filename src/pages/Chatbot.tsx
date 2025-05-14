import ChatbotMessage from '../components/chatbot/ChatbotMessage';

// interface ChatbotProps {}

/**
 * Chatbot page component
 *
 */
export default function Chatbot() {
    return (
        <div className="p-4 text-gray-200">
            <ChatbotMessage
                direction="start"
                message="You were the Chosen One!"
                name="Obi-Wan Kenobi"
                time="12:45"
                avatarUrl="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                footer="delivered"
            />

            <ChatbotMessage
                direction="end"
                message="I hate you!"
                name="Anakin Skywalker"
                time="12:46"
                // avatarUrl="https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
                // footer="Seen at 12:46"
            />
        </div>
    );
}
