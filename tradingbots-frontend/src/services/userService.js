import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

export const userService = {
  // Update personal information
  updateProfile: async (userData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/user/profile`, userData);
      return response.data;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  },

  // Change password
  changePassword: async (passwordData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/user/password`, passwordData);
      return response.data;
    } catch (error) {
      console.error('Error changing password:', error);
      throw error;
    }
  },

  // Delete account
  deleteAccount: async () => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/user/account`);
      return response.data;
    } catch (error) {
      console.error('Error deleting account:', error);
      throw error;
    }
  },

  // Update theme preference
  updateTheme: async (theme) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/user/theme`, { theme });
      return response.data;
    } catch (error) {
      console.error('Error updating theme:', error);
      throw error;
    }
  }
};
