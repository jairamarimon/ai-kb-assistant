import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

export default function ChatContainer({ messages, onSend, isLoading }) {
  return (
    <div
      className="w-full max-w-4xl chat-container rounded-3xl shadow-2xl flex flex-col overflow-hidden"
      style={{ height: "700px", maxHeight: "70%" }}
    >
      {/* Messages area */}
      <ChatMessages messages={messages} isLoading={isLoading}/>

      {/* Input fixed at bottom */}
      <div className="border-t border-gray-500/20">
        <ChatInput onSend={onSend} />
      </div>
    </div>
  );
}
