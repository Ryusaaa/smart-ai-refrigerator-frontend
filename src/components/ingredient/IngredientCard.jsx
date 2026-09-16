import { Edit2, Trash2 } from 'lucide-react';
import ExpiryBadge from './ExpiryBadge';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function IngredientCard({ ingredient, onEdit, onDelete }) {
  const id = ingredient.id || ingredient._id;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      whileHover={{ y: -3, transition: { duration: 0.15 } }}
      className="bg-[var(--color-surface)] rounded-2xl shadow-sm border border-[var(--color-border)] p-5 hover:shadow-md transition-all relative group flex flex-col justify-between"
    >
      <div className="absolute top-4 right-4 flex space-x-1.5 opacity-0 group-hover:opacity-100 transition-opacity bg-[var(--color-surface)]/90 backdrop-blur-xs p-1 rounded-xl shadow-xs border border-[var(--color-border)]/60">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => onEdit(ingredient)}
          aria-label="Edit ingredient"
          className="p-1.5 text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface-alt)] rounded-lg transition-colors"
        >
          <Edit2 className="w-3.5 h-3.5" />
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => onDelete(id)}
          aria-label="Delete ingredient"
          className="p-1.5 text-[var(--color-text-muted)] hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </motion.button>
      </div>
      
      <div>
        <Link to={`/refrigerator/${id}`}>
          <h3 className="font-semibold text-[var(--color-text)] text-lg mb-1 pr-16 truncate hover:text-[var(--color-primary)] transition-colors">
            {ingredient.name}
          </h3>
        </Link>
        
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="px-2.5 py-0.5 bg-[var(--color-surface-alt)] text-[var(--color-text-muted)] rounded-lg text-xs font-medium border border-[var(--color-border)]/50">
            {ingredient.category}
          </span>
          <span className="text-sm font-semibold text-[var(--color-text-muted)]">
            {ingredient.quantity} {ingredient.unit}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-3 pt-3 border-t border-[var(--color-border)]/60">
        <ExpiryBadge status={ingredient.expirationStatus || ingredient.expiryStatus} daysUntilExpiry={ingredient.daysUntilExpiry} />
        {ingredient.expiryDate && (
          <span className="text-xs text-[var(--color-text-muted)] font-medium">
            {new Date(ingredient.expiryDate).toLocaleDateString()}
          </span>
        )}
      </div>
    </motion.div>
  );
}
