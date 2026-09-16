import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import VoiceButton from './VoiceButton';

export default function ChatInput({ onSend, loading }) {
  const [text, setText] = useState('');
  const textareaRef = useRef(null);

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [text]);

  const handleSend = () => {
    if (text.trim() && !loading) {
      onSend(text.trim());
      setText('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-white border-t border-gray-200 p-4">
      <div className="max-w-4xl mx-auto flex items-end space-x-2 relative">
        <div className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl flex items-end relative shadow-sm focus-within:border-primary-500 focus-within:ring-1 focus-within:ring-primary-500 transition-all">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about your fridge inventory, recipes..."
            className="w-full max-h-32 bg-transparent border-0 focus:ring-0 resize-none py-3 pl-4 pr-12 text-sm leading-relaxed"
            rows={1}
            disabled={loading}
          />
          <div className="absolute right-2 bottom-2">
            <VoiceButton onTranscript={(t) => setText(prev => prev ? `${prev} ${t}` : t)} />
          </div>
        </div>
        <button
          onClick={handleSend}
          disabled={!text.trim() || loading}
          className="bg-primary-600 text-white p-3 rounded-full hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 shadow-sm transition-colors"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
