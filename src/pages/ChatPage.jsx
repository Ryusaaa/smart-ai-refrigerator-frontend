import { RefreshCw, Sparkles } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useChat } from '../context/ChatContext';
import ChatWindow from '../components/chat/ChatWindow';
import ChatInput from '../components/chat/ChatInput';
import { gsap } from '../lib/gsap';

const NEW_CHAT_LOADING_MS = 700;

export default function ChatPage() {
  const {
    messages,
    isStreaming,
    statusMessage,
    sendMessage,
    stopGenerating,
    regenerateLast,
    clearConversation
  } = useChat();

  const refreshBtnRef = useRef(null);
  const resetTimerRef = useRef(null);
  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => () => clearTimeout(resetTimerRef.current), []);

  const handlePointerDown = () => {
    if (refreshBtnRef.current) {
      gsap.to(refreshBtnRef.current, { scale: 0.94, duration: 0.1, yoyo: true, repeat: 1 });
    }
  };

  const handleNewChat = () => {
    if (isResetting) return;
    setIsResetting(true);
    clearConversation();
    resetTimerRef.current = setTimeout(() => setIsResetting(false), NEW_CHAT_LOADING_MS);
  };

  return (
    <div className="h-[calc(100vh-8.5rem)] flex flex-col bg-[var(--color-surface)] rounded-3xl shadow-sm border border-[var(--color-border)] overflow-hidden transition-colors">
      <div className="px-6 py-4 border-b border-[var(--color-border)] flex justify-between items-center bg-[var(--color-surface)]/80 backdrop-blur-xs">
        <div className="flex items-center space-x-3">
          {/* Inline style: class bg-[var(--gradient-primary)] tidak valid di Tailwind (jadi transparan di tema light) */}
          <div
            className="w-10 h-10 rounded-2xl text-white flex items-center justify-center shadow-sm flex-shrink-0"
            style={{ background: 'var(--gradient-primary)' }}
          >
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold font-serif text-[var(--color-text)]">AI Kitchen Assistant</h2>
            <p className="text-xs text-[var(--color-text-muted)]">Real-time chat with refrigerator memory & inventory awareness</p>
          </div>
        </div>
        <button
          ref={refreshBtnRef}
          onPointerDown={handlePointerDown}
          onClick={handleNewChat}
          disabled={isResetting}
          aria-busy={isResetting}
          className="flex items-center text-xs font-semibold text-[var(--color-text-muted)] hover:text-[var(--color-primary)] px-3.5 py-2 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] transition-colors shadow-2xs cursor-pointer disabled:cursor-wait disabled:opacity-80"
        >
          <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${isResetting ? 'animate-spin' : ''}`} />
          {isResetting ? 'Menyiapkan...' : 'New Chat'}
        </button>
      </div>

      <div className="relative flex-1 min-h-0 flex flex-col">
        <ChatWindow
          messages={messages}
          isStreaming={isStreaming}
          statusMessage={statusMessage}
          onStop={stopGenerating}
          onRegenerate={regenerateLast}
        />
        <ChatInput onSend={sendMessage} loading={isStreaming} />

        {/* Overlay loading saat New Chat: menutup area chat + input selama transisi */}
        <div
          role="status"
          aria-live="polite"
          aria-hidden={!isResetting}
          className={`absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 backdrop-blur-sm transition-opacity duration-200 motion-reduce:transition-none ${
            isResetting ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          style={{ background: 'color-mix(in oklab, var(--color-surface) 88%, transparent)' }}
        >
          <div className="relative w-12 h-12 flex items-center justify-center">
            <span
              className="absolute inset-0 rounded-full border-2"
              style={{ borderColor: 'var(--color-border)' }}
            />
            <span
              className="absolute inset-0 rounded-full border-2 border-transparent animate-spin"
              style={{ borderTopColor: 'var(--color-primary)' }}
            />
            <Sparkles className="w-5 h-5 text-[var(--color-primary)] animate-pulse" />
          </div>
          <p className="text-xs font-semibold text-[var(--color-text-muted)]">Menyiapkan chat baru...</p>
        </div>
      </div>
    </div>
  );
}