import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://traidingbots-production.up.railway.app/api';
const API_URL = `${API_BASE_URL}/crypto`;

// Axios instance for crypto market data (no auth required)
const cryptoApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Crypto Market operations
export const cryptoMarketService = {
  /**
   * Get top cryptocurrencies by market cap
   * @param {number} limit - Number of cryptos to fetch (default 100)
   * @param {number} page - Page number (default 1)
   * @returns {Promise} List of top cryptocurrencies
   */
  getTopCryptos: async (limit = 100, page = 1) => {
    const response = await cryptoApi.get(`/top?limit=${limit}&page=${page}`);
    return response.data;
  },

  /**
   * Get current price for a specific cryptocurrency
   * @param {string} coinId - CoinGecko coin ID (e.g., "bitcoin", "ethereum")
   * @returns {Promise} Price data with USD price and 24h change
   */
  getCoinPrice: async (coinId) => {
    const response = await cryptoApi.get(`/price/${coinId}`);
    return response.data;
  },

  /**
   * Get prices for multiple cryptocurrencies
   * @param {Array<string>} coinIds - Array of CoinGecko coin IDs
   * @returns {Promise} Map of coin ID to price data
   */
  getMultiplePrices: async (coinIds) => {
    const coinIdsParam = coinIds.join(',');
    const response = await cryptoApi.get(`/prices?coinIds=${coinIdsParam}`);
    return response.data;
  },

  /**
   * Search for cryptocurrencies by name or symbol
   * @param {string} query - Search query
   * @returns {Promise} List of matching cryptocurrencies
   */
  searchCoins: async (query) => {
    const response = await cryptoApi.get(`/search?query=${encodeURIComponent(query)}`);
    return response.data;
  },
};

export default cryptoMarketService;
