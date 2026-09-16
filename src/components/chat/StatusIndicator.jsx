import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export default function StatusIndicator({ status }) {
  if (!status) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      className="flex items-center space-x-2 text-xs text-[var(--color-primary)] font-medium mb-4 px-3 py-1.5 bg-[var(--color-surface-alt)]/80 rounded-xl w-fit border border-[var(--color-border)]/50"
    >
      <Loader2 className="w-3.5 h-3.5 animate-spin text-[var(--color-primary)]" />
      <span>{status}</span>
    </motion.div>
  );
}
