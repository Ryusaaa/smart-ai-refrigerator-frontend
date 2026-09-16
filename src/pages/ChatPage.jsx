import { RefreshCw } from 'lucide-react';
import { useChat } from '../hooks/useChat';
import ChatWindow from '../components/chat/ChatWindow';
import ChatInput from '../components/chat/ChatInput';

export default function ChatPage() {
  const { messages, loading, sendMessage, startNewConversation } = useChat();

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
        <div>
          <h2 className="text-lg font-bold text-gray-900">AI Assistant</h2>
          <p className="text-xs text-gray-500">Ask anything about your fridge</p>
        </div>
        <button
          onClick={startNewConversation}
          className="flex items-center text-sm font-medium text-gray-600 hover:text-primary-600 px-3 py-2 rounded-lg hover:bg-primary-50 transition-colors"
        >
          <RefreshCw className="w-4 h-4 mr-2" /> New Chat
        </button>
      </div>
      
      <ChatWindow messages={messages} loading={loading} />
      <ChatInput onSend={sendMessage} loading={loading} />
    </div>
  );
}
