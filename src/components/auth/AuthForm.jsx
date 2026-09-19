import { useState } from 'react';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';

export function TextField({ id, label, icon: Icon, type = 'text', ...inputProps }) {
  const [visible, setVisible] = useState(false);
  const isPassword = type === 'password';

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-[var(--color-text)]">
        {label}
      </label>
      <div className="relative">
        <Icon
          size={18}
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
        />
        <input
          id={id}
          type={isPassword && visible ? 'text' : type}
          className={`w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-alt)] py-2.5 pl-11 text-sm text-[var(--color-text)] outline-none transition-colors placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 ${
            isPassword ? 'pr-11' : 'pr-4'
          }`}
          {...inputProps}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? 'Hide password' : 'Show password'}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer rounded-md p-1 text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
          >
            {visible ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
}

export function FormError({ children }) {
  if (!children) return null;
  return (
    <p
      role="alert"
      className="rounded-xl border border-[var(--color-danger)]/30 bg-[var(--color-danger-soft)] px-3.5 py-2.5 text-xs font-medium text-[var(--color-danger)]"
    >
      {children}
    </p>
  );
}

export function SubmitButton({ loading, loadingLabel, children }) {
  return (
    <button
      type="submit"
      disabled={loading}
      style={{ background: 'var(--gradient-primary)' }}
      className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white shadow-sm transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
    >
      <span>{loading ? loadingLabel : children}</span>
      {!loading && <ArrowRight size={16} />}
    </button>
  );
}