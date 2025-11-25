import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

export default function ChatContainer({ messages, onSend, isLoading }) {
  const handleQuickAction = (prompt) => {
    onSend(prompt);
  };

  return (
    <div className="w-full max-w-4xl flex-1 flex flex-col pb-8">
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 flex flex-col overflow-hidden h-[650px]">
        {/* Messages area */}
        <ChatMessages messages={messages} isLoading={isLoading}/>

        {/* Quick action buttons */}
        {messages.length === 1 && (
          <div className="p-4 pb-2 border-b border-white/10 flex justify-center flex-wrap gap-2">
            <button 
              onClick={() => handleQuickAction("Show me the cruise destinations")}
              className="px-4 py-2 rounded-full bg-white text-[#007e95] hover:shadow-lg hover:scale-105 transition-all"
            >
              Find Cruises
            </button>

            <button 
              onClick={() => handleQuickAction("What are your travel tips for a cruise?")}
              className="px-4 py-2 rounded-full bg-white text-[#007e95] hover:shadow-lg hover:scale-105 transition-all"
            >
              Travel tips
            </button>

            <button 
              onClick={() => handleQuickAction("I need suggestion for popular travel destinations")}
              className="px-4 py-2 rounded-full bg-white text-[#007e95] hover:shadow-lg hover:scale-105 transition-all"
            >
              Popular Destinations
            </button>
          </div>
        )}

        {/* Input fixed at bottom */}
        <div className="p-6 pt-4 border-t border-white/10">
          <ChatInput onSend={onSend} />
        </div>
      </div>
    </div>
  );
}
