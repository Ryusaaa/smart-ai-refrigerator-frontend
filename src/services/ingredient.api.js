import api from './api';
export const ingredientApi = {
  getAll: (params) => api.get('/ingredients', { params }).then(r => r.data),
  getById: (id) => api.get(`/ingredients/${id}`).then(r => r.data),
  create: (data) => api.post('/ingredients', data).then(r => r.data),
  update: (id, data) => api.put(`/ingredients/${id}`, data).then(r => r.data),
  remove: (id) => api.delete(`/ingredients/${id}`).then(r => r.data),
};
