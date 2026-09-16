import { Link } from 'react-router-dom';
import ExpiryBadge from '../ingredient/ExpiryBadge';

export default function ExpiringCard({ ingredients = [] }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
        <h3 className="font-semibold text-gray-900">Expiring Soon</h3>
        <Link to="/refrigerator" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
          View All
        </Link>
      </div>
      <div className="p-6">
        {ingredients.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-4">No ingredients expiring soon. Great job!</p>
        ) : (
          <ul className="space-y-4">
            {ingredients.map((item) => (
              <li key={item.id || item._id} className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <span className="text-gray-900 font-medium">{item.name}</span>
                  <span className="text-gray-500 text-sm">{item.quantity} {item.unit}</span>
                </div>
                <ExpiryBadge status={item.expiryStatus} daysUntilExpiry={item.daysUntilExpiry} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
