import { useState, useCallback } from 'react';
import { chatApi } from '../services/chat.api';

export function useChat() {
  const [messages, setMessages] = useState([]);
  const [conversationId, setConversationId] = useState(null);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (text) => {
    setLoading(true);
    const newMessages = [...messages, { role: 'user', content: text }];
    setMessages(newMessages);
    
    try {
      const data = await chatApi.sendMessage(conversationId, text);
      if (data.conversationId && !conversationId) {
        setConversationId(data.conversationId);
      }
      setMessages([...newMessages, { role: 'assistant', content: data.response }]);
    } catch (err) {
      console.error(err);
      setMessages([...newMessages, { role: 'assistant', content: 'Sorry, I encountered an error.' }]);
    } finally {
      setLoading(false);
    }
  };

  const clearConversation = useCallback(() => {
    setMessages([]);
    setConversationId(null);
  }, []);

  const startNewConversation = useCallback(() => {
    clearConversation();
  }, [clearConversation]);

  return { messages, conversationId, loading, sendMessage, clearConversation, startNewConversation };
}
