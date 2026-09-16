import IngredientForm from './IngredientForm';
import { motion, AnimatePresence } from 'framer-motion';

export default function IngredientModal({ isOpen, onClose, ingredient, onSuccess }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2 }}
            className="bg-[var(--color-surface)] rounded-3xl shadow-elevated max-w-md w-full p-7 z-10 border border-[var(--color-border)] transition-colors"
          >
            <h2 className="text-2xl font-bold font-serif text-[var(--color-text)] mb-6">
              {ingredient ? 'Edit Ingredient' : 'Add Ingredient'}
            </h2>
            <IngredientForm initialData={ingredient} onSubmit={onSuccess} onCancel={onClose} />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
