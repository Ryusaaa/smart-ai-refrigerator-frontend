// client/src/utils/difficultyColor.js
// Centralized styling utility for recipe difficulty badges per REDESIGN-INSTRUCTIONS.MD Section 3.A

export function getDifficultyStyle(difficulty) {
  const normalized = (difficulty || '').toLowerCase();
  switch (normalized) {
    case 'easy':
      return 'bg-[var(--color-success-soft)] text-[var(--color-success)] border border-[var(--color-success)]/30';
    case 'medium':
      return 'bg-[var(--color-warning-soft)] text-[var(--color-warning)] border border-[var(--color-warning)]/30';
    case 'hard':
      return 'bg-[var(--color-danger-soft)] text-[var(--color-danger)] border border-[var(--color-danger)]/30';
    default:
      return 'bg-[var(--color-surface-alt)] text-[var(--color-text-muted)] border border-[var(--color-border)]';
  }
}
