import { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import { Bot } from 'lucide-react';

export default function ChatWindow({ messages, loading }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50/50">
      <div className="max-w-4xl mx-auto flex flex-col">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4 text-primary-600">
              <Bot className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">SMARTAI Assistant</h3>
            <p className="text-gray-500 max-w-sm">
              I can help you manage your fridge, find recipes based on what you have, and answer questions about your ingredients.
            </p>
          </div>
        )}
        
        {messages.map((msg, idx) => (
          <MessageBubble key={idx} role={msg.role} content={msg.content} />
        ))}
        
        {loading && <TypingIndicator />}
        <div ref={bottomRef} className="h-1" />
      </div>
    </div>
  );
}
