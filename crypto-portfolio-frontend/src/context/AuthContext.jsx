import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  // Sätt axios default headers när token ändras
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
      
      // Hämta användarinfo från token (decodad eller från /api/user/me)
      fetchUserInfo();
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
      setUser(null);
      setLoading(false);
    }
  }, [token]);

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/user/me');
      setUser(response.data);
    } catch (error) {
      console.error('Failed to fetch user info:', error);
      // Om token är invalid, logga ut
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        email,
        password
      });
      
      const { token: newToken, email: userEmail, roles } = response.data;
      setToken(newToken);
      setUser({ email: userEmail, roles });
      
      return { success: true };
    } catch (error) {
      console.error('Login failed:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Login misslyckades'
      };
    }
  };

  const register = async (email, password, firstName, lastName) => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/register', {
        email,
        password,
        firstName,
        lastName
      });
      
      const { token: newToken, email: userEmail, roles } = response.data;
      setToken(newToken);
      setUser({ email: userEmail, roles });
      
      return { success: true };
    } catch (error) {
      console.error('Registration failed:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Registrering misslyckades'
      };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!token
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth måste användas inom AuthProvider');
  }
  return context;
};
