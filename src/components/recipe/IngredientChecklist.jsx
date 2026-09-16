import { CheckCircle, XCircle } from 'lucide-react';

export default function IngredientChecklist({ ingredients = [] }) {
  const available = ingredients.filter(i => i.available);
  const missing = ingredients.filter(i => !i.available);

  return (
    <div className="space-y-6">
      {available.length > 0 && (
        <div>
          <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Available Ingredients</h4>
          <ul className="space-y-2">
            {available.map((ing, idx) => (
              <li key={idx} className="flex items-center text-sm text-gray-700">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                <span><span className="font-medium">{ing.amount} {ing.unit}</span> {ing.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {missing.length > 0 && (
        <div>
          <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Missing Ingredients</h4>
          <ul className="space-y-2">
            {missing.map((ing, idx) => (
              <li key={idx} className="flex items-center text-sm text-gray-700">
                <XCircle className="w-4 h-4 text-red-500 mr-2 flex-shrink-0" />
                <span><span className="font-medium">{ing.amount} {ing.unit}</span> {ing.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
