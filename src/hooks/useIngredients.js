import { useState, useCallback } from 'react';
import { ingredientApi } from '../services/ingredient.api';

export function useIngredients() {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchIngredients = useCallback(async (params) => {
    setLoading(true);
    setError(null);
    try {
      const data = await ingredientApi.getAll(params);
      setIngredients(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch ingredients');
    } finally {
      setLoading(false);
    }
  }, []);

  const createIngredient = async (data) => {
    setLoading(true);
    setError(null);
    try {
      await ingredientApi.create(data);
      await fetchIngredients();
    } catch (err) {
      setError(err.message || 'Failed to create ingredient');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateIngredient = async (id, data) => {
    setLoading(true);
    setError(null);
    try {
      await ingredientApi.update(id, data);
      await fetchIngredients();
    } catch (err) {
      setError(err.message || 'Failed to update ingredient');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteIngredient = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await ingredientApi.remove(id);
      await fetchIngredients();
    } catch (err) {
      setError(err.message || 'Failed to delete ingredient');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { ingredients, loading, error, fetchIngredients, createIngredient, updateIngredient, deleteIngredient };
}
