import { useState } from 'react';
import ChatInput from '../components/ChatInput';
import ChatMessages from '../components/ChatMessages';
import Loader from '../components/Loader';
import { askQuestion } from '../api/chat';

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

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
            from: 'bot',
            text: data.answer,
            sources: data.sources,
          },
        ]);
      } else {
        setMessages((prev) => [...prev, { from: 'bot', text: 'Sorry, something went wrong.' }]);
      }
    } catch (err) {
      const errorMessage = { from: 'bot', text: 'Error: ' + err.message };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Sidebar */}
      <div className="hidden md:block w-64 bg-gray-100 p-4">
        <h2 className="font-bold text-lg mb-4">History</h2>
        {messages
          .filter((m) => m.from === 'user')
          .map((m, idx) => (
            <div key={idx} className="p-2 border-b">
              {m.text}
            </div>
          ))}
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col">
        <ChatMessages messages={messages} loading={loading} />
        <ChatInput onSend={handleSend} disabled={loading} />
      </div>
    </div>
  );
}
