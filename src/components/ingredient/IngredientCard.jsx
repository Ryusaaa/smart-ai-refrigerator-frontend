import React, { useRef } from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import ExpiryBadge from './ExpiryBadge';
import { Link } from 'react-router-dom';
import { gsap, useGSAP } from '../../lib/gsap';
import LazyImage from '../common/LazyImage';

export default function IngredientCard({ ingredient, onEdit, onDelete }) {
  const id = ingredient.id || ingredient._id;
  const cardRef = useRef(null);

  useGSAP(() => {
    if (!cardRef.current) return;
    gsap.from(cardRef.current, {
      opacity: 0,
      y: 16,
      duration: 0.35,
      ease: 'power2.out',
    });
  }, { scope: cardRef });

  const handleDeleteClick = () => {
    if (!cardRef.current) {
      onDelete(id);
      return;
    }
    gsap.to(cardRef.current, {
      opacity: 0,
      scale: 0.9,
      y: -10,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: () => onDelete(id),
    });
  };

  const handlePointerDown = (e) => {
    gsap.to(e.currentTarget, { scale: 0.9, duration: 0.1, yoyo: true, repeat: 1 });
  };

  return (
    <div
      ref={cardRef}
      className="bg-[var(--color-surface)] rounded-2xl shadow-sm border border-[var(--color-border)] p-5 hover:shadow-md transition-shadow relative group flex flex-col justify-between overflow-hidden"
    >
      <div className="absolute top-4 right-4 z-10 flex space-x-1.5 opacity-0 group-hover:opacity-100 transition-opacity bg-[var(--color-surface)]/90 backdrop-blur-xs p-1 rounded-xl shadow-xs border border-[var(--color-border)]/60">
        <button
          onPointerDown={handlePointerDown}
          onClick={() => onEdit(ingredient)}
          aria-label="Edit ingredient"
          className="p-1.5 text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface-alt)] rounded-lg transition-colors cursor-pointer"
        >
          <Edit2 className="w-3.5 h-3.5" />
        </button>
        <button
          onPointerDown={handlePointerDown}
          onClick={handleDeleteClick}
          aria-label="Delete ingredient"
          className="p-1.5 text-[var(--color-text-muted)] hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      <div>
        {ingredient.imageUrl && (
          <div className="mb-3.5 rounded-xl overflow-hidden border border-[var(--color-border)]/50">
            <LazyImage
              src={ingredient.imageUrl}
              alt={ingredient.name}
              aspectRatio="aspect-16/9"
              className="h-28 w-full object-cover"
            />
          </div>
        )}

        <Link to={`/refrigerator/${id}`}>
          <h3 className="font-semibold text-[var(--color-text)] text-lg mb-1 pr-14 truncate hover:text-[var(--color-primary)] transition-colors">
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
        <ExpiryBadge
          status={ingredient.expirationStatus || ingredient.expiryStatus}
          daysUntilExpiry={ingredient.daysUntilExpiry}
        />
        {ingredient.expiryDate && (
          <span className="text-xs text-[var(--color-text-muted)] font-medium">
            {new Date(ingredient.expiryDate).toLocaleDateString()}
          </span>
        )}
      </div>
    </div>
  );
}
