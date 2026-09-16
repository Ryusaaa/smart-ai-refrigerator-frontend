import React from 'react';
import { Square } from 'lucide-react';
import { motion } from 'framer-motion';

export default function StopButton({ onStop }) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.95 }}
      onClick={onStop}
      type="button"
      className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[var(--color-surface)] text-[var(--color-danger)] border border-[var(--color-danger)]/40 shadow-xs hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
    >
      <Square className="w-3 h-3 fill-current" />
      <span>Stop generating</span>
    </motion.button>
  );
}
