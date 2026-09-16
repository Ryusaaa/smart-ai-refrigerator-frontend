import React from 'react';
import { RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RegenerateButton({ onRegenerate }) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.95 }}
      onClick={onRegenerate}
      type="button"
      className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-[var(--color-text-muted)] hover:text-[var(--color-primary)] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-2xs hover:bg-[var(--color-surface-alt)] transition-colors"
    >
      <RotateCcw className="w-3.5 h-3.5" />
      <span>Regenerate response</span>
    </motion.button>
  );
}
