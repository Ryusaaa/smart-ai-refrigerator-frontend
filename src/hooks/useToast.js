import { useCallback, useRef, useState } from 'react';

let toastSeq = 0;

const DEFAULT_DURATION = {
  success: 3400,
  error: 4600,
  info: 3400,
};

export function useToast() {
  const [toasts, setToasts] = useState([]);
  const removeTimers = useRef({});

  const removeToast = useCallback((id) => {
    clearTimeout(removeTimers.current[id]);
    delete removeTimers.current[id];
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, leaving: true } : t)));
    removeTimers.current[id] = setTimeout(() => removeToast(id), 220);
  }, [removeToast]);

  const showToast = useCallback(({ type = 'success', title, message, duration } = {}) => {
    const id = ++toastSeq;
    const resolvedDuration = duration ?? DEFAULT_DURATION[type] ?? DEFAULT_DURATION.info;
    setToasts((prev) => [...prev, { id, type, title, message, duration: resolvedDuration, leaving: false }]);
    return id;
  }, []);

  return { toasts, showToast, dismissToast };
}

export default useToast;