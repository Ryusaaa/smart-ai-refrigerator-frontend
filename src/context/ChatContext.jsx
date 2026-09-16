// client/src/context/ChatContext.jsx
// Persistent chat state provider across routes per REDESIGN-INSTRUCTIONS.MD Section 3.D

import React, { createContext, useContext } from 'react';
import { useChatStream } from '../hooks/useChatStream';

const ChatContext = createContext(null);

export function ChatProvider({ children }) {
  const chat = useChatStream();

  return (
    <ChatContext.Provider value={chat}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}
