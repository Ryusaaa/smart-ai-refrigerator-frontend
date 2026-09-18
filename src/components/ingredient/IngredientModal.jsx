import React, { useRef } from 'react';
import { createPortal } from 'react-dom';
import IngredientForm from './IngredientForm';
import { gsap, useGSAP } from '../../lib/gsap';

export default function IngredientModal({ isOpen, onClose, ingredient, onSuccess }) {
  const modalRef = useRef(null);
  const backdropRef = useRef(null);

  useGSAP(() => {
    if (isOpen) {
      if (backdropRef.current) {
        gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.2, ease: 'power2.out' });
      }
      if (modalRef.current) {
        gsap.fromTo(
          modalRef.current,
          { opacity: 0, scale: 0.94, y: 16 },
          { opacity: 1, scale: 1, y: 0, duration: 0.25, ease: 'back.out(1.5)' }
        );
      }
    }
  }, { dependencies: [isOpen] });

  const handleClose = () => {
    if (modalRef.current && backdropRef.current) {
      const tl = gsap.timeline({ onComplete: onClose });
      tl.to(modalRef.current, { opacity: 0, scale: 0.95, y: 10, duration: 0.15, ease: 'power2.in' })
        .to(backdropRef.current, { opacity: 0, duration: 0.15 }, 0);
    } else {
      onClose();
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center overflow-y-auto p-4 py-8">
      <div
        ref={backdropRef}
        onClick={handleClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
      />

      <div
        ref={modalRef}
        className="bg-[var(--color-surface)] rounded-3xl shadow-elevated max-w-md w-full max-h-[90vh] overflow-y-auto p-7 z-10 border border-[var(--color-border)] transition-colors relative my-auto"
      >
        <h2 className="text-2xl font-bold font-serif text-[var(--color-text)] mb-6">
          {ingredient ? 'Edit Ingredient' : 'Add Ingredient'}
        </h2>
        <IngredientForm initialData={ingredient} onSubmit={onSuccess} onCancel={handleClose} />
      </div>
    </div>,
    document.body
  );
}