// client/src/hooks/useChatStream.js
// Enhanced SSE chat streaming hook with persistence and recipe event support per REDESIGN-INSTRUCTIONS.MD Sections 3.D & 3.E

import { useState, useCallback, useRef, useEffect } from 'react';
import { chatApi } from '../services/chat.api';
import { saveViewedRecipe } from '../utils/recipeHistory';

const SESSION_STORAGE_KEY = 'smartai_conversation_id';

export function useChatStream() {
  const [messages, setMessages] = useState([]);
  const [conversationId, setConversationId] = useState(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [lastUserMessage, setLastUserMessage] = useState('');
  const abortControllerRef = useRef(null);

  // Restore previous session from sessionStorage if user hasn't left the site
  useEffect(() => {
    const savedId = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (savedId) {
      setConversationId(Number(savedId));
      chatApi.getConversation(savedId)
        .then(res => {
          const payload = res?.data || res;
          if (payload && Array.isArray(payload.messages) && payload.messages.length > 0) {
            const mapped = payload.messages.map(m => ({
              role: (m.role || '').toLowerCase() === 'user' ? 'user' : 'assistant',
              content: m.content
            }));
            setMessages(mapped);
          }
        })
        .catch(err => {
          console.warn('Failed to restore conversation from session:', err);
          sessionStorage.removeItem(SESSION_STORAGE_KEY);
        });
    }
  }, []);

  const stopGenerating = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsStreaming(false);
    setStatusMessage('');
    setMessages(prev => {
      const updated = [...prev];
      const last = updated[updated.length - 1];
      if (last && last.role === 'assistant') {
        updated[updated.length - 1] = {
          ...last,
          isStreaming: false,
          content: last.content ? last.content + ' *(stopped)*' : '*(stopped)*'
        };
      }
      return updated;
    });
  }, []);

  const sendMessage = useCallback(async (text) => {
    if (!text || !text.trim() || isStreaming) return;

    setLastUserMessage(text);
    const userMsg = { role: 'user', content: text };
    const assistantPlaceholder = { role: 'assistant', content: '', isStreaming: true };

    setMessages(prev => [...prev, userMsg, assistantPlaceholder]);
    setIsStreaming(true);
    setStatusMessage('Menghubungkan ke asisten...');

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const params = new URLSearchParams({ message: text });
      if (conversationId) params.append('conversationId', conversationId);

      const response = await fetch(`/api/chat/stream?${params.toString()}`, {
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`Chat stream failed with status ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n\n');
        buffer = lines.pop(); // Keep partial line

        for (const block of lines) {
          if (!block.trim()) continue;
          const eventMatch = block.match(/^event:\s*(.+)$/m);
          const dataMatch = block.match(/^data:\s*(.+)$/m);

          const eventType = eventMatch ? eventMatch[1].trim() : 'message';
          const dataRaw = dataMatch ? dataMatch[1].trim() : '';

          if (!dataRaw) continue;

          try {
            const parsed = JSON.parse(dataRaw);

            if (eventType === 'status') {
              setStatusMessage(parsed.status || '');
            } else if (eventType === 'token') {
              setStatusMessage('');
              const token = parsed.token || '';
              setMessages(prev => {
                const updated = [...prev];
                const last = updated[updated.length - 1];
                if (last && last.role === 'assistant') {
                  updated[updated.length - 1] = {
                    ...last,
                    content: last.content + token
                  };
                }
                return updated;
              });
            } else if (eventType === 'recipe') {
              // Section 3.E: Structured recipe suggestion event from backend
              saveViewedRecipe(parsed);
              setMessages(prev => {
                const updated = [...prev];
                const last = updated[updated.length - 1];
                if (last && last.role === 'assistant') {
                  updated[updated.length - 1] = {
                    ...last,
                    recipeSuggestion: parsed
                  };
                }
                return updated;
              });
            } else if (eventType === 'done') {
              if (parsed.conversationId) {
                setConversationId(parsed.conversationId);
                sessionStorage.setItem(SESSION_STORAGE_KEY, parsed.conversationId);
              }
            } else if (eventType === 'error') {
              throw new Error(parsed.error || 'Terjadi kesalahan pada AI');
            }
          } catch (e) {
            // Ignore parse errors for split fragments
          }
        }
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Stream error:', err);
        setMessages(prev => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          if (last && last.role === 'assistant' && !last.content) {
            updated[updated.length - 1] = {
              role: 'assistant',
              content: 'Maaf, terjadi kendala saat memproses jawaban. Silakan coba lagi.'
            };
          }
          return updated;
        });
      }
    } finally {
      setIsStreaming(false);
      setStatusMessage('');
      setMessages(prev => {
        const updated = [...prev];
        const last = updated[updated.length - 1];
        if (last && last.role === 'assistant') {
          updated[updated.length - 1] = {
            ...last,
            isStreaming: false
          };
        }
        return updated;
      });
      abortControllerRef.current = null;
    }
  }, [conversationId, isStreaming]);

  const regenerateLast = useCallback(() => {
    if (!lastUserMessage || isStreaming) return;
    setMessages(prev => {
      if (prev.length > 0 && prev[prev.length - 1].role === 'assistant') {
        return prev.slice(0, -1);
      }
      return prev;
    });
    sendMessage(lastUserMessage);
  }, [lastUserMessage, isStreaming, sendMessage]);

  const clearConversation = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setMessages([]);
    setConversationId(null);
    setIsStreaming(false);
    setStatusMessage('');
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
  }, []);

  return {
    messages,
    conversationId,
    isStreaming,
    statusMessage,
    sendMessage,
    stopGenerating,
    regenerateLast,
    clearConversation
  };
}
