import { useState, useCallback, useRef, useEffect } from 'react';
import { chatApi } from '../services/chat.api';
import { saveViewedRecipe } from '../utils/recipeHistory';

const SESSION_STORAGE_KEY = 'smartai_conversation_id';

// Ubah pesan assistant terakhir. `patch` boleh object (di-merge) atau fungsi (last) => pesan baru.
function updateLastAssistant(setMessages, patch) {
  setMessages((prev) => {
    const updated = [...prev];
    const last = updated[updated.length - 1];
    if (last && last.role === 'assistant') {
      updated[updated.length - 1] = typeof patch === 'function' ? patch(last) : { ...last, ...patch };
    }
    return updated;
  });
}

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
    updateLastAssistant(setMessages, (last) => ({
      ...last,
      isStreaming: false,
      // Dihentikan user: jangan biarkan animasi kartu resep berputar terus.
      recipeStatus: last.recipeStatus === 'loading' ? undefined : last.recipeStatus,
      content: last.content ? last.content + ' *(stopped)*' : '*(stopped)*'
    }));
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

    const handleEvent = (eventType, parsed) => {
      switch (eventType) {
        case 'status':
          setStatusMessage(parsed.status || '');
          break;

        case 'token':
          setStatusMessage('');
          updateLastAssistant(setMessages, (last) => ({
            ...last,
            content: last.content + (parsed.token || '')
          }));
          break;

        case 'recipe_pending':
          // Teks jawaban sudah selesai, kartu resep sedang disiapkan -> tampilkan animasi loading.
          setStatusMessage('');
          updateLastAssistant(setMessages, { recipeStatus: 'loading' });
          break;

        case 'recipe':
          // Section 3.E: Structured recipe suggestion event from backend
          saveViewedRecipe(parsed);
          updateLastAssistant(setMessages, { recipeSuggestion: parsed, recipeStatus: 'ready' });
          break;

        case 'recipe_failed':
          updateLastAssistant(setMessages, { recipeStatus: 'failed' });
          break;

        case 'done':
          if (parsed.conversationId) {
            setConversationId(parsed.conversationId);
            sessionStorage.setItem(SESSION_STORAGE_KEY, parsed.conversationId);
          }
          break;

        case 'error':
          throw new Error(parsed.error || 'Terjadi kesalahan pada AI');

        default:
          break;
      }
    };

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

          let parsed;
          try {
            parsed = JSON.parse(dataRaw);
          } catch (e) {
            continue; // Ignore parse errors for split fragments
          }

          // Di luar try/catch di atas supaya event `error` benar-benar sampai ke catch di bawah.
          handleEvent(eventType, parsed);
        }
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Stream error:', err);
        updateLastAssistant(setMessages, (last) =>
          last.content
            ? last
            : { ...last, content: 'Maaf, terjadi kendala saat memproses jawaban. Silakan coba lagi.' }
        );
      }
    } finally {
      setIsStreaming(false);
      setStatusMessage('');
      // Apa pun yang terjadi, animasi loading kartu resep tidak boleh menggantung.
      updateLastAssistant(setMessages, (last) => ({
        ...last,
        isStreaming: false,
        recipeStatus: last.recipeStatus === 'loading' ? 'failed' : last.recipeStatus
      }));
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