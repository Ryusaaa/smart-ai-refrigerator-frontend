import IngredientForm from './IngredientForm';

export default function IngredientModal({ isOpen, onClose, ingredient, onSuccess }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900 bg-opacity-50 transition-opacity">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          {ingredient ? 'Edit Ingredient' : 'Add Ingredient'}
        </h2>
        <IngredientForm initialData={ingredient} onSubmit={onSuccess} onCancel={onClose} />
      </div>
    </div>
  );
}
