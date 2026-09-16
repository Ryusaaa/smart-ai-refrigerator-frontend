import { useState, useCallback } from 'react';
import { recipeApi } from '../services/recipe.api';

export function useRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateRecipes = async (preferences) => {
    setLoading(true);
    setError(null);
    try {
      const data = await recipeApi.generate(preferences);
      setRecipes(data.recipes || data);
      return data;
    } catch (err) {
      setError(err.message || 'Failed to generate recipes');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchRecipes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await recipeApi.getAll();
      setRecipes(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch recipes');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchRecipe = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const data = await recipeApi.getById(id);
      setRecipe(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch recipe');
    } finally {
      setLoading(false);
    }
  }, []);

  return { recipes, recipe, loading, error, generateRecipes, fetchRecipes, fetchRecipe };
}
