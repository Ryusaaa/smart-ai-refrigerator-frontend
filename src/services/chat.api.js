import api from './api';
export const chatApi = {
  sendMessage: (conversationId, message) => api.post('/chat', { conversationId, message }),
  getConversations: () => api.get('/chat/conversations'),
  getConversation: (id) => api.get(`/chat/conversations/${id}`),
  deleteConversation: (id) => api.delete(`/chat/conversations/${id}`),
};
