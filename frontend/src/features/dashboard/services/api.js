// src/features/dashboard/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Serviços para Vendas
export const vendasService = {
  getAll: () => api.get('/vendas'),
  create: (novaVenda) => api.post('/vendas', novaVenda),
  delete: (id) => api.delete(`/vendas/${id}`), // ← CERTIFIQUE-SE QUE ESTÁ ASSIM
};

// Serviços para Insights
export const insightsService = {
  getInsights: () => api.get('/insights'),
};

export default api;