import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';
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
    <div className="bg-[var(--color-surface)] border-t border-[var(--color-border)] p-4 transition-colors">
      <div className="max-w-4xl mx-auto flex items-end space-x-2 relative">
        <div className="flex-1 bg-[var(--color-surface-alt)] border border-[var(--color-border)] rounded-2xl flex items-end relative shadow-2xs focus-within:border-[var(--color-primary)] focus-within:ring-2 focus-within:ring-[var(--color-primary)]/20 transition-all">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Tanyakan resep dari bahan kulkas, info kedaluwarsa..."
            className="w-full max-h-32 bg-transparent border-0 focus:outline-none focus:ring-0 resize-none py-3.5 pl-4 pr-12 text-sm leading-relaxed text-[var(--color-text)] placeholder-[var(--color-text-muted)]"
            rows={1}
            disabled={loading}
          />
          <div className="absolute right-2.5 bottom-2.5">
            <VoiceButton onTranscript={(t) => setText(prev => prev ? `${prev} ${t}` : t)} />
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          onClick={handleSend}
          disabled={!text.trim() || loading}
          className="bg-[var(--color-primary)] text-white p-3.5 rounded-2xl hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0 shadow-sm transition-all flex items-center justify-center"
        >
          <Send className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  );
}
