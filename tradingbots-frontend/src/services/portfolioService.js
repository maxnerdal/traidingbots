import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

// Axios instance med automatisk token
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor för att lägga till JWT token i alla requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Portfolio operations
export const portfolioService = {
  // Get all portfolios for current user
  getAllPortfolios: async () => {
    const response = await api.get('/portfolios');
    return response.data;
  },

  // Get specific portfolio by ID
  getPortfolioById: async (id) => {
    const response = await api.get(`/portfolios/${id}`);
    return response.data;
  },

  // Create new portfolio
  createPortfolio: async (portfolioData) => {
    const response = await api.post('/portfolios', portfolioData);
    return response.data;
  },

  // Update portfolio
  updatePortfolio: async (id, portfolioData) => {
    const response = await api.put(`/portfolios/${id}`, portfolioData);
    return response.data;
  },

  // Delete portfolio
  deletePortfolio: async (id) => {
    await api.delete(`/portfolios/${id}`);
  },

  // Get portfolio items
  getPortfolioItems: async (portfolioId) => {
    const response = await api.get(`/portfolios/${portfolioId}/items`);
    return response.data;
  },

  // Add item to portfolio
  addPortfolioItem: async (portfolioId, itemData) => {
    const response = await api.post(`/portfolios/${portfolioId}/items`, itemData);
    return response.data;
  },

  // Update portfolio item
  updatePortfolioItem: async (portfolioId, itemId, itemData) => {
    const response = await api.put(`/portfolios/${portfolioId}/items/${itemId}`, itemData);
    return response.data;
  },

  // Delete portfolio item
  deletePortfolioItem: async (portfolioId, itemId) => {
    await api.delete(`/portfolios/${portfolioId}/items/${itemId}`);
  },
};

// Digital Assets operations
export const assetService = {
  // Get all digital assets
  getAllAssets: async () => {
    const response = await api.get('/assets');
    return response.data;
  },

  // Get asset by ID
  getAssetById: async (id) => {
    const response = await api.get(`/assets/${id}`);
    return response.data;
  },

  // Get asset by symbol
  getAssetBySymbol: async (symbol) => {
    const response = await api.get(`/assets/symbol/${symbol}`);
    return response.data;
  },

  // Create new asset
  createAsset: async (assetData) => {
    const response = await api.post('/assets', assetData);
    return response.data;
  },

  // Delete asset
  deleteAsset: async (id) => {
    await api.delete(`/assets/${id}`);
  },
};

export default api;
