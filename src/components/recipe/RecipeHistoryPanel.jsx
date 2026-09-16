// client/src/components/recipe/RecipeHistoryPanel.jsx
// Slide-down panel listing previous recipe generations on this device.
// Added per request: "opsi untuk detail history apa saja yang telah dicari".

import { History, Clock, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

function formatWhen(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleString(undefined, {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch (e) {
    return '';
  }
}

export default function RecipeHistoryPanel({ history, onSelect, onClear }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-[var(--color-surface)] rounded-2xl shadow-sm border border-[var(--color-border)] transition-colors overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 cursor-pointer"
      >
        <div className="flex items-center space-x-2 text-sm font-semibold text-[var(--color-text)]">
          <History className="w-4 h-4 text-[var(--color-primary)]" />
          <span>Search History</span>
          <span className="text-[11px] font-bold text-[var(--color-primary)] bg-[var(--color-primary-soft)] px-2 py-0.5 rounded-full">
            {history.length}
          </span>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-[var(--color-text-muted)]" /> : <ChevronDown className="w-4 h-4 text-[var(--color-text-muted)]" />}
      </button>

      {open && (
        <div className="border-t border-[var(--color-border)] max-h-72 overflow-y-auto">
          {history.length === 0 ? (
            <p className="text-xs text-[var(--color-text-muted)] text-center py-6 px-4">
              Belum ada riwayat pencarian resep di perangkat ini.
            </p>
          ) : (
            <>
              <div className="divide-y divide-[var(--color-border)]/60">
                {history.map(entry => (
                  <button
                    key={entry.id}
                    type="button"
                    onClick={() => onSelect(entry)}
                    className="w-full text-left px-4 py-2.5 hover:bg-[var(--color-surface-alt)] transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-[var(--color-text)] truncate">
                        {entry.preferences?.cuisine || 'Any cuisine'} · {entry.preferences?.difficulty || 'any'}
                      </span>
                      <span className="text-[10px] text-[var(--color-text-muted)] flex items-center flex-shrink-0">
                        <Clock className="w-3 h-3 mr-1" />
                        {formatWhen(entry.createdAt)}
                      </span>
                    </div>
                    <p className="text-[11px] text-[var(--color-text-muted)] mt-0.5">
                      {entry.resultCount} resep · maks {entry.preferences?.maxCookingTime ?? '-'} menit
                    </p>
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={onClear}
                className="w-full flex items-center justify-center space-x-1.5 text-[11px] font-semibold text-[var(--color-danger)] py-2.5 hover:bg-[var(--color-danger-soft)] transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear history</span>
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
