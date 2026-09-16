import { Edit2, Trash2 } from 'lucide-react';
import ExpiryBadge from './ExpiryBadge';
import { Link } from 'react-router-dom';

export default function IngredientCard({ ingredient, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow relative group">
      <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={() => onEdit(ingredient)} className="text-gray-400 hover:text-blue-500">
          <Edit2 className="w-4 h-4" />
        </button>
        <button onClick={() => onDelete(ingredient.id || ingredient._id)} className="text-gray-400 hover:text-red-500">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      
      <Link to={`/refrigerator/${ingredient.id || ingredient._id}`}>
        <h3 className="font-semibold text-gray-900 text-lg mb-1 pr-12 truncate">{ingredient.name}</h3>
      </Link>
      
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">
          {ingredient.category}
        </span>
        <span className="text-sm text-gray-500 font-medium">
          {ingredient.quantity} {ingredient.unit}
        </span>
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
        <ExpiryBadge status={ingredient.expiryStatus} daysUntilExpiry={ingredient.daysUntilExpiry} />
        {ingredient.expiryDate && (
          <span className="text-xs text-gray-400">
            {new Date(ingredient.expiryDate).toLocaleDateString()}
          </span>
        )}
      </div>
    </div>
  );
}
