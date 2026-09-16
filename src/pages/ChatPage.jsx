import { RefreshCw, Sparkles } from 'lucide-react';
import { useRef } from 'react';
import { useChatStream } from '../hooks/useChatStream';
import ChatWindow from '../components/chat/ChatWindow';
import ChatInput from '../components/chat/ChatInput';
import { gsap } from '../lib/gsap';

export default function ChatPage() {
  const {
    messages,
    isStreaming,
    statusMessage,
    sendMessage,
    stopGenerating,
    regenerateLast,
    clearConversation
  } = useChatStream();

  const refreshBtnRef = useRef(null);

  const handlePointerDown = () => {
    if (refreshBtnRef.current) {
      gsap.to(refreshBtnRef.current, { scale: 0.94, duration: 0.1, yoyo: true, repeat: 1 });
    }
  };

  return (
    <div className="h-[calc(100vh-8.5rem)] flex flex-col bg-[var(--color-surface)] rounded-3xl shadow-sm border border-[var(--color-border)] overflow-hidden transition-colors">
      <div className="px-6 py-4 border-b border-[var(--color-border)] flex justify-between items-center bg-[var(--color-surface)]/80 backdrop-blur-xs">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-[var(--gradient-primary)] text-white flex items-center justify-center shadow-sm">
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
          onClick={clearConversation}
          className="flex items-center text-xs font-semibold text-[var(--color-text-muted)] hover:text-[var(--color-primary)] px-3.5 py-2 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] transition-colors shadow-2xs cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5 mr-1.5" /> New Chat
        </button>
      </div>
      
      <ChatWindow
        messages={messages}
        isStreaming={isStreaming}
        statusMessage={statusMessage}
        onStop={stopGenerating}
        onRegenerate={regenerateLast}
      />
      <ChatInput onSend={sendMessage} loading={isStreaming} />
    </div>
  );
}
