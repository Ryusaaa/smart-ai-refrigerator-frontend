import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit2, Trash2, Calendar, Tag, Database } from 'lucide-react';
import { ingredientApi } from '../services/ingredient.api';
import ExpiryBadge from '../components/ingredient/ExpiryBadge';
import IngredientModal from '../components/ingredient/IngredientModal';
import LazyImage from '../components/common/LazyImage';

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

  if (loading) return <div className="flex justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-primary)] mt-20"></div></div>;
  if (error || !ingredient) return <div className="text-[var(--color-danger)] text-center p-4 bg-[var(--color-danger-soft)] rounded-2xl border border-[var(--color-danger)]/30">{error || 'Not found'}</div>;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <button onClick={() => navigate('/refrigerator')} className="flex items-center text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors cursor-pointer">
        <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Refrigerator
      </button>

      <div className="bg-[var(--color-surface)] rounded-3xl shadow-sm border border-[var(--color-border)] overflow-hidden transition-colors">
        {ingredient.imageUrl && (
          <LazyImage src={ingredient.imageUrl} alt={ingredient.name} aspectRatio="aspect-video" className="w-full max-h-72" />
        )}
        <div className="px-6 py-8 md:px-8 border-b border-[var(--color-border)] bg-[var(--color-surface-alt)]/30">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-bold font-serif text-[var(--color-text)]">{ingredient.name}</h1>
            <ExpiryBadge status={ingredient.expirationStatus || ingredient.expiryStatus} daysUntilExpiry={ingredient.daysUntilExpiry} />
          </div>
          <div className="flex gap-3">
            <button onClick={() => setIsEditOpen(true)} className="flex items-center px-4 py-2 bg-[var(--color-surface)] text-[var(--color-text)] border border-[var(--color-border)] rounded-xl text-sm font-medium hover:bg-[var(--color-surface-alt)] transition-colors shadow-xs cursor-pointer">
              <Edit2 className="w-4 h-4 mr-2 text-[var(--color-primary)]" /> Edit
            </button>
            <button onClick={handleDelete} className="flex items-center px-4 py-2 bg-[var(--color-danger-soft)] text-[var(--color-danger)] border border-[var(--color-danger)]/30 rounded-xl text-sm font-medium hover:opacity-80 transition-opacity shadow-xs cursor-pointer">
              <Trash2 className="w-4 h-4 mr-2" /> Delete
            </button>
          </div>
        </div>
        
        <div className="p-6 md:p-8">
          <h3 className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-6">Ingredient Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-4 p-4 bg-[var(--color-surface-alt)]/50 rounded-2xl border border-[var(--color-border)]/50">
              <div className="bg-[var(--color-surface)] p-2.5 rounded-xl shadow-xs text-[var(--color-primary)] border border-[var(--color-border)]/60"><Tag className="w-5 h-5" /></div>
              <div>
                <p className="text-xs text-[var(--color-text-muted)] font-medium">Category</p>
                <p className="text-[var(--color-text)] font-semibold">{ingredient.category}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-4 bg-[var(--color-surface-alt)]/50 rounded-2xl border border-[var(--color-border)]/50">
              <div className="bg-[var(--color-surface)] p-2.5 rounded-xl shadow-xs text-[var(--color-primary)] border border-[var(--color-border)]/60"><Database className="w-5 h-5" /></div>
              <div>
                <p className="text-xs text-[var(--color-text-muted)] font-medium">Quantity in Stock</p>
                <p className="text-[var(--color-text)] font-semibold">{ingredient.quantity} {ingredient.unit}</p>
              </div>
            </div>

            {ingredient.expiryDate && (
              <div className="flex items-center space-x-4 p-4 bg-[var(--color-surface-alt)]/50 rounded-2xl border border-[var(--color-border)]/50">
                <div className="bg-[var(--color-surface)] p-2.5 rounded-xl shadow-xs text-[var(--color-primary)] border border-[var(--color-border)]/60"><Calendar className="w-5 h-5" /></div>
                <div>
                  <p className="text-xs text-[var(--color-text-muted)] font-medium">Expiry Date</p>
                  <p className="text-[var(--color-text)] font-semibold">{new Date(ingredient.expiryDate).toLocaleDateString()}</p>
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
