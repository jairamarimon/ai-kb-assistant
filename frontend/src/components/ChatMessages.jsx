import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const ChatMessages = ({ messages, loading }) => {
  return (
    <div className="flex-1 flex flex-col p-4 space-y-4 overflow-y-auto">
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`p-3 rounded-lg ${
            msg.from === 'bot' ? 'bg-gray-100 text-black' : 'bg-blue-500 text-white'
          }`}
        >
          <div className="prose prose-sm sm:prose lg:prose-lg">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text || ''}</ReactMarkdown>
          </div>

          {msg.sources && msg.sources.length > 0 && (
            <div className="mt-2 text-sm text-blue-600">
              Sources:{' '}
              {msg.sources.map((src, i) => (
                <a
                  key={i}
                  href={src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  {src}
                </a>
              ))}
            </div>
          )}
        </div>
      ))}

      {loading && <div className="text-center text-gray-500 animate-pulse">Loading...</div>}
    </div>
  );
};

export default ChatMessages;
