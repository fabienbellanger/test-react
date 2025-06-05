import { useState } from 'react';
import ChatbotMessage from '../components/chatbot/ChatbotMessage';
import Message, { MessageDirection } from '../models/Message';
import { useRef } from 'react';

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
            <VoiceToText />
        </div>
    );
}

function VoiceToText() {
    const [text, setText] = useState('');
    const [listening, setListening] = useState(false);
    const recognitionRef = useRef<SpeechRecognition | null>(null);

    const startListening = () => {
        if (listening) return;

        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert('SpeechRecognition non supporté sur ce navigateur.');
            return;
        }
        const recognition = new SpeechRecognition();
        recognition.lang = 'fr-FR';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
        recognition.continuous = true;

        recognition.onstart = () => {
            console.log('Reconnaissance démarrée');
        };
        recognition.onresult = (event: SpeechRecognitionEvent) => {
            console.log('Résultat reçu', event);
            const last = event.results.length - 1;
            const transcript = event.results[last][0].transcript;
            setText(transcript);
        };
        recognition.onerror = (event) => {
            console.error('Erreur de reconnaissance', event);
        };
        recognition.onend = () => {
            console.log('Reconnaissance terminée');
        };

        recognitionRef.current = recognition;
        recognition.start();
        setListening(true);
    };

    const stopListening = () => {
        recognitionRef.current?.stop();
        setListening(false);
    };

    return (
        <div>
            <button
                className="btn"
                onClick={listening ? stopListening : startListening}
            >
                {listening ? 'Arrêter' : 'Démarrer'} l’écoute
            </button>
            <div className="mt-4">
                <strong>Texte reconnu :</strong>
                <div>{text}</div>
            </div>
        </div>
    );
}
