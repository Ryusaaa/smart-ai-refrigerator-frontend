import api from './api';
export const chatApi = {
  sendMessage: (conversationId, message) => api.post('/chat', { conversationId, message }).then(r => r.data),
  getConversations: () => api.get('/chat/conversations').then(r => r.data),
  getConversation: (id) => api.get(`/chat/conversations/${id}`).then(r => r.data),
  deleteConversation: (id) => api.delete(`/chat/conversations/${id}`).then(r => r.data),
};
