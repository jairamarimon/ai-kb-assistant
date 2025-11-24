import { useState, useRef, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

export default function ChatInput({ onSend, disabled }) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    onSend(message);
    setMessage('');
  };

  // Auto-resize
  useEffect(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = 'auto';
      el.style.height = Math.min(el.scrollHeight, 120) + 'px';
    }
  }, [message]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t border-gray-300/40 flex items-center space-x-3 bg-white/95 p-4"
    >
      <textarea
        ref={textareaRef}
        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-400 resize-none overflow-hidden text-sm box-border"
        placeholder="Ask about cruises, destinations, or travel tips..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        style={{
          minHeight: '48px',
          maxHeight: '120px',
          lineHeight: '1.2rem',
        }}
      />

      <button
        type="submit"
        className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-white rounded-2xl shadow-lg transition-all transform hover:scale-105 active:scale-95"
        disabled={disabled}
      >
        <ArrowRight className="w-5 h-5" />
      </button>
    </form>
  );
}
