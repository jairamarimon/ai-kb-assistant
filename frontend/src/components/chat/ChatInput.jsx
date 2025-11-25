import { useState, useRef, useEffect } from 'react';

export default function ChatInput({ onSend }) {
  const [message, setMessage] = useState('');

  const isButtonDisabled = !message.trim();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isButtonDisabled) return;
    onSend(message);
    setMessage('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex gap-3"
    >
      <input
        type="text"
        className="flex-1 px-6 py-4 rounded-2xl bg-white/95 backdrop-blur-sm border border-white/50 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent shadow-lg placeholder:text-gray-400 overflow-hidden"
        placeholder="Ask about cruises, destinations, or travel tips..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{
          minHeight: '48px',
          maxHeight: '120px',
          lineHeight: '1.2rem',
        }}
      />

      <button
        type="submit"
        className="px-6 py-4 rounded-2xl bg-white text-[#007e95] hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        disabled={isButtonDisabled}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m22 2-7 20-4-9-9-4Z"/>
          <path d="M22 2 11 13"/>
        </svg>
      </button>
    </form>
  );
}
