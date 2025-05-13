// interface ChatbotProps {}

import ChatbotBubble from '../components/chatbot/ChatbotBubble';

export default function Chatbot() {
    return (
        <div className="p-8 text-gray-200">
            <ChatbotBubble
                direction="start"
                name="Obi-Wan Kenobi"
                message="You were the Chosen One!"
                time="12:45"
                avatarUrl="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                footer="delivered"
            />

            <ChatbotBubble
                direction="end"
                name="Anakin"
                message="I hate you!"
                time="12:46"
                avatarUrl="https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
                footer="Seen at 12:46"
            />
        </div>
    );
}
