import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit2, Trash2, Calendar, Tag, Database } from 'lucide-react';
import { ingredientApi } from '../services/ingredient.api';
import ExpiryBadge from '../components/ingredient/ExpiryBadge';
import IngredientModal from '../components/ingredient/IngredientModal';

export default function IngredientDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ingredient, setIngredient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const fetchIngredient = async () => {
    try {
      const data = await ingredientApi.getById(id);
      setIngredient(data);
    } catch (err) {
      setError(err.message || 'Error fetching ingredient');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIngredient();
  }, [id]);

  const handleUpdate = async (data) => {
    try {
      await ingredientApi.update(id, data);
      setIsEditOpen(false);
      fetchIngredient();
    } catch (e) {
      alert(e.message);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Delete this ingredient?')) {
      try {
        await ingredientApi.remove(id);
        navigate('/refrigerator');
      } catch (e) {
        alert(e.message);
      }
    }
  };

  if (loading) return <div className="flex justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mt-20"></div></div>;
  if (error || !ingredient) return <div className="text-red-500 text-center">{error || 'Not found'}</div>;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <button onClick={() => navigate('/refrigerator')} className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-1" /> Back to Refrigerator
      </button>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-8 md:px-8 border-b border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-bold text-gray-900">{ingredient.name}</h1>
            <ExpiryBadge status={ingredient.expiryStatus} daysUntilExpiry={ingredient.daysUntilExpiry} />
          </div>
          <div className="flex gap-3">
            <button onClick={() => setIsEditOpen(true)} className="flex items-center px-4 py-2 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
              <Edit2 className="w-4 h-4 mr-2" /> Edit
            </button>
            <button onClick={handleDelete} className="flex items-center px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors">
              <Trash2 className="w-4 h-4 mr-2" /> Delete
            </button>
          </div>
        </div>
        
        <div className="p-6 md:p-8">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-6">Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
              <div className="bg-white p-2 rounded-lg shadow-sm text-primary-600"><Tag className="w-5 h-5" /></div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Category</p>
                <p className="text-gray-900 font-medium">{ingredient.category}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
              <div className="bg-white p-2 rounded-lg shadow-sm text-primary-600"><Database className="w-5 h-5" /></div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Quantity</p>
                <p className="text-gray-900 font-medium">{ingredient.quantity} {ingredient.unit}</p>
              </div>
            </div>

            {ingredient.expiryDate && (
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                <div className="bg-white p-2 rounded-lg shadow-sm text-primary-600"><Calendar className="w-5 h-5" /></div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Expiry Date</p>
                  <p className="text-gray-900 font-medium">{new Date(ingredient.expiryDate).toLocaleDateString()}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <IngredientModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} ingredient={ingredient} onSuccess={handleUpdate} />
    </div>
  );
}
