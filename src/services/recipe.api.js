import api from './api';
export const recipeApi = {
  generate: (preferences) => api.post('/recipes/generate', { preferences }),
  getAll: () => api.get('/recipes'),
  getById: (id) => api.get(`/recipes/${id}`),
};
