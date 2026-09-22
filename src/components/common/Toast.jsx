import { useEffect, useRef, useState } from 'react';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

const ICONS = {
  success: CheckCircle2,
  error: AlertTriangle,
  info: Info,
};

const TONE = {
  success: {
    border: 'border-[var(--color-success)]/30',
    badgeBg: 'bg-[var(--color-success-soft)]',
    badgeText: 'text-[var(--color-success)]',
    bar: 'var(--color-success)',
  },
  error: {
    border: 'border-[var(--color-danger)]/30',
    badgeBg: 'bg-[var(--color-danger-soft)]',
    badgeText: 'text-[var(--color-danger)]',
    bar: 'var(--color-danger)',
  },
  info: {
    border: 'border-[var(--color-primary)]/30',
    badgeBg: 'bg-[var(--color-primary-soft)]',
    badgeText: 'text-[var(--color-primary)]',
    bar: 'var(--color-primary)',
  },
};

export default function Toast({ id, type = 'success', title, message, duration = 3400, onDismiss }) {
  const [leaving, setLeaving] = useState(false);
  const [paused, setPaused] = useState(false);
  const remainingRef = useRef(duration);
  const startedAtRef = useRef(0);
  const timerRef = useRef(null);

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleDismiss = () => {
    clearTimer();
    setLeaving(true);
    setTimeout(() => onDismiss(id), 200);
  };

  const startTimer = (ms) => {
    startedAtRef.current = Date.now();
    timerRef.current = setTimeout(handleDismiss, ms);
  };

  useEffect(() => {
    startTimer(remainingRef.current);
    return clearTimer;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMouseEnter = () => {
    if (leaving) return;
    setPaused(true);
    clearTimer();
    const elapsed = Date.now() - startedAtRef.current;
    remainingRef.current = Math.max(remainingRef.current - elapsed, 700);
  };

  const handleMouseLeave = () => {
    if (leaving) return;
    setPaused(false);
    startTimer(remainingRef.current);
  };

  const Icon = ICONS[type] || CheckCircle2;
  const tone = TONE[type] || TONE.info;

  return (
    <div
      role="status"
      aria-live="polite"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`toast-item pointer-events-auto w-[min(92vw,380px)] overflow-hidden rounded-2xl border bg-[var(--color-surface)] shadow-[0_18px_46px_rgba(15,23,42,0.18)] ${tone.border} ${
        leaving ? 'toast-leave' : 'toast-enter'
      }`}
    >
      <div className="flex items-start gap-3 p-4">
        <span className={`mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full ${tone.badgeBg} ${tone.badgeText}`}>
          <Icon className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1 pt-0.5">
          <p className="text-sm font-bold font-serif leading-tight text-[var(--color-text)]">{title}</p>
          {message && <p className="mt-1 text-xs leading-5 text-[var(--color-text-muted)]">{message}</p>}
        </div>
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss notification"
          className="-mr-1 -mt-1 flex-shrink-0 cursor-pointer rounded-full p-1.5 text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-surface-alt)] hover:text-[var(--color-text)]"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="toast-progress-track">
        <div
          className="toast-progress-bar"
          style={{
            background: tone.bar,
            animationDuration: `${duration}ms`,
            animationPlayState: paused ? 'paused' : 'running',
          }}
        />
      </div>
    </div>
  );
}