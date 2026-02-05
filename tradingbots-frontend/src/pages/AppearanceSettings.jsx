import React, { useState } from 'react';
import { userService } from '../services/userService';
import '../styles/SharedFormStyles.css';
import '../styles/AppearanceSettings.css';

const AppearanceSettings = () => {
  const [theme, setTheme] = useState('light');
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleThemeChange = async (selectedTheme) => {
    setTheme(selectedTheme);
    setMessage({ type: 'info', text: 'Applying theme...' });
    
    try {
      await userService.updateTheme(selectedTheme);
      // Apply theme to document and save to localStorage
      document.documentElement.setAttribute('data-theme', selectedTheme);
      localStorage.setItem('theme', selectedTheme);
      setMessage({ type: 'success', text: 'Theme updated successfully!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update theme. Please try again.';
      setMessage({ type: 'error', text: errorMessage });
    }
  };

  return (
    <div>
      <div className="page-title">
        <h1>Theme</h1>
        <p className="page-description">Customize how the application looks</p>
      </div>

      {message.text && (
        <div className={`error-banner ${message.type === 'success' ? 'success-banner' : message.type === 'info' ? 'info-banner' : ''}`}>
          {message.text}
        </div>
      )}

      <div className="form-section">
        <div className="section-number">1</div>
        <div className="section-content">
          <div className="theme-options">
            <button
              className={`theme-option ${theme === 'light' ? 'active' : ''}`}
              onClick={() => handleThemeChange('light')}
            >
              <div className="theme-preview light-preview">
                <div className="preview-header"></div>
                <div className="preview-content">
                  <div className="preview-text"></div>
                  <div className="preview-text short"></div>
                </div>
              </div>
              <div className="theme-label">
                <span className="theme-icon">☀️</span>
                <span>Light</span>
              </div>
            </button>

            <button
              className={`theme-option ${theme === 'dark' ? 'active' : ''}`}
              onClick={() => handleThemeChange('dark')}
            >
              <div className="theme-preview dark-preview">
                <div className="preview-header"></div>
                <div className="preview-content">
                  <div className="preview-text"></div>
                  <div className="preview-text short"></div>
                </div>
              </div>
              <div className="theme-label">
                <span className="theme-icon">🌙</span>
                <span>Dark</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppearanceSettings;
