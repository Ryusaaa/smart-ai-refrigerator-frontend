import api from './api';
export const recipeApi = {
  generate: (preferences) => api.post('/recipes/generate', { preferences }).then(r => r.data),
  getAll: () => api.get('/recipes').then(r => r.data),
  getById: (id) => api.get(`/recipes/${id}`).then(r => r.data),
};
