import { RefreshCw, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useChatStream } from '../hooks/useChatStream';
import ChatWindow from '../components/chat/ChatWindow';
import ChatInput from '../components/chat/ChatInput';

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

  return (
    <div className="h-[calc(100vh-8.5rem)] flex flex-col bg-[var(--color-surface)] rounded-3xl shadow-sm border border-[var(--color-border)] overflow-hidden transition-colors">
      <div className="px-6 py-4 border-b border-[var(--color-border)] flex justify-between items-center bg-[var(--color-surface)]/80 backdrop-blur-xs">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-[var(--color-primary)]/15 text-[var(--color-primary)] flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold font-serif text-[var(--color-text)]">AI Kitchen Assistant</h2>
            <p className="text-xs text-[var(--color-text-muted)]">Real-time chat with refrigerator memory & inventory awareness</p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          onClick={clearConversation}
          className="flex items-center text-xs font-semibold text-[var(--color-text-muted)] hover:text-[var(--color-primary)] px-3.5 py-2 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] transition-colors shadow-2xs"
        >
          <RefreshCw className="w-3.5 h-3.5 mr-1.5" /> New Chat
        </motion.button>
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
