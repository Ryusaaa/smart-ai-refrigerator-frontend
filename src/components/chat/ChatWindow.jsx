import React, { useEffect, useRef, useState } from 'react';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import StatusIndicator from './StatusIndicator';
import RegenerateButton from './RegenerateButton';
import StopButton from './StopButton';
import { Bot, Sparkles } from 'lucide-react';

export default function ChatWindow({
  messages,
  isStreaming,
  statusMessage,
  onStop,
  onRegenerate
}) {
  const containerRef = useRef(null);
  const bottomRef = useRef(null);
  const [userScrolledUp, setUserScrolledUp] = useState(false);

  // Handle user scroll detection: don't force scroll down if reading history
  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
    setUserScrolledUp(!isNearBottom);
  };

  useEffect(() => {
    if (!userScrolledUp) {
      bottomRef.current?.scrollIntoView({ behavior: isStreaming ? 'auto' : 'smooth' });
    }
  }, [messages, isStreaming, userScrolledUp]);

  const lastMessage = messages[messages.length - 1];
  const showRegenerate = !isStreaming && lastMessage && lastMessage.role === 'assistant';

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[var(--color-bg)] transition-colors relative"
    >
      <div className="max-w-4xl mx-auto flex flex-col min-h-full justify-between">
        <div>
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-80 text-center my-auto">
              <div className="w-16 h-16 bg-[var(--color-surface-alt)] rounded-3xl flex items-center justify-center mb-4 text-[var(--color-primary)] shadow-xs border border-[var(--color-border)]">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold font-serif text-[var(--color-text)] mb-2">
                SMARTAI Kitchen Companion
              </h3>
              <p className="text-[var(--color-text-muted)] text-sm max-w-md leading-relaxed">
                Tanyakan apa saja seputar bahan makanan di kulkas, saran resep darurat, atau tips penyimpanan agar bahan tetap segar lebih lama.
              </p>
            </div>
          )}

          {messages.map((msg, idx) => (
            <MessageBubble
              key={idx}
              role={msg.role}
              content={msg.content}
              isStreaming={msg.isStreaming || (idx === messages.length - 1 && isStreaming)}
              statusMessage={idx === messages.length - 1 && isStreaming ? statusMessage : null}
              recipeSuggestion={msg.recipeSuggestion}
            />
          ))}

          {/* Fallback if streaming started before placeholder exists */}
          {isStreaming && messages.length === 0 && (
            <TypingIndicator label={statusMessage || 'Menghubungkan ke asisten...'} />
          )}

          <div ref={bottomRef} className="h-4" />
        </div>

        {/* Action toolbar floating at bottom right */}
        <div className="sticky bottom-2 flex justify-end items-center gap-2 py-2">
          {isStreaming && <StopButton onStop={onStop} />}
          {showRegenerate && <RegenerateButton onRegenerate={onRegenerate} />}
        </div>
      </div>
    </div>
  );
}
