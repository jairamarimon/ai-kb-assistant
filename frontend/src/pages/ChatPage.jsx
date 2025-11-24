import { useState } from 'react';
import { askQuestion } from '../api/chat';
import Background from '../components/layout/Background';
import Header from '../components/layout/Header';
import ChatContainer from '../components/chat/ChatContainer';

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      from: 'ai',
      text: 'Welcome aboard! 🚢 I am your AI cruise travel assistant. Ask me anything about cruise destinations, or travel tips.',
    },
  ]);

  const [isLoading, setLoading] = useState(false);

  const handleSend = async (question) => {
    if (!question.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { from: 'user', text: question }]);
    setLoading(true);

    try {
      const data = await askQuestion(question);
      if (data.success) {
        setMessages((prev) => [
          ...prev,
          {
            from: 'ai',
            text: data.answer,
            sources: data.sources,
          },
        ]);
      } else {
        setMessages((prev) => [...prev, { from: 'ai', text: 'Sorry, something went wrong.' }]);
      }
    } catch (err) {
      const errorMessage = { from: 'ai', text: 'Error: ' + err.message };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative w-full h-screen flex flex-col items-center px-4 py-8">
      <Background />
      <div className="relative z-10 w-full flex flex-col items-center">
        <Header />
        <ChatContainer messages={messages} onSend={handleSend} isLoading={isLoading} />
        <footer className="mt-4 text-white text-sm opacity-75">
          &copy; 2025 Shermans Travel Cruise Knowledge Base
        </footer>
      </div>
    </main>
  );
}
