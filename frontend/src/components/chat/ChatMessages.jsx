import { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { User, Anchor } from 'lucide-react';
import Loader from './Loader';

export default function ChatMessages({ messages, isLoading }) {
  const containerRef = useRef();
  const lastUserRef = useRef();

  useEffect(() => {
    // Scroll to last user message
    if (lastUserRef.current && containerRef.current) {
      const userMessage = lastUserRef.current;
      const container = containerRef.current;

      const offset = userMessage.offsetTop - container.offsetTop - 20;

      container.scrollTo({
        top: offset,
        behavior: 'smooth',
      });
    }
  }, [messages, isLoading]);

  return (
    <div
      ref={containerRef}
      className="flex-1 flex flex-col gap-4 p-4 overflow-y-auto"
      style={{ scrollBehavior: 'smooth' }}
    >
      {messages.map((msg, index) => {
        const isAI = msg.from === 'ai';
        const refProps = !isAI ? { ref: lastUserRef } : {};

        return (
          <div
            key={index}
            className={`flex items-start gap-3 ${isAI ? 'justify-start' : 'justify-end'}`}
            {...refProps}
          >
            {/* AI MESSAGE */}
            {isAI && (
              <>
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-md"
                  style={{ background: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                >
                  <Anchor className="size-5 text-blue-700" />
                </div>

                <div className="max-w-[80%] px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm prose prose-sm bg-white text-gray-700 border border-gray-100">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
                </div>
              </>
            )}

            {/* USER MESSAGE */}
            {!isAI && (
              <>
                <div
                  className="max-w-[80%] px-4 py-3 rounded-2xl rounded-tr-sm shadow-sm text-white prose prose-sm"
                  style={{ background: '#06B6D4' }}
                >
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
                </div>

                <div
                  className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white shadow-md"
                  style={{ background: '#06B6D4' }}
                >
                  <User className="size-5" />
                </div>
              </>
            )}
          </div>
        );
      })}

      {/* LOADING STATE */}
      {isLoading && (
        <div className="flex items-start gap-3 justify-start">
          <div
            className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-md"
            style={{ background: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
          >
            <Anchor className="size-5 text-blue-700" />
          </div>

          <Loader />
        </div>
      )}
    </div>
  );
}
