// client/src/utils/recipeHistory.js
// Lightweight client-side history of recipe searches (no backend endpoint
// exists for this yet — see RECIPE-HISTORY section of the change notes).
// Stored in localStorage so it survives refreshes/tabs on this device.

const STORAGE_KEY = 'smartai_recipe_history';
const MAX_ENTRIES = 30;

export function getRecipeHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

export function addRecipeHistoryEntry({ preferences, recipes }) {
  try {
    const history = getRecipeHistory();
    const entry = {
      id: `${Date.now()}`,
      createdAt: new Date().toISOString(),
      preferences,
      resultCount: Array.isArray(recipes) ? recipes.length : 0,
      recipes: Array.isArray(recipes) ? recipes : [],
    };
    const next = [entry, ...history].slice(0, MAX_ENTRIES);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    return entry;
  } catch (e) {
    return null;
  }
}

export function clearRecipeHistory() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    // ignore
  }
}
