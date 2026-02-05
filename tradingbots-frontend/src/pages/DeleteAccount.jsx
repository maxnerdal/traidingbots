import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { userService } from '../services/userService';
import '../styles/SharedFormStyles.css';
import '../styles/DeleteAccount.css';

const DeleteAccount = () => {
  const { logout } = useAuth();
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    if (!window.confirm('Are you absolutely sure you want to delete your account? This action cannot be undone.')) {
      return;
    }

    try {
      await userService.deleteAccount();
      setMessage({ type: 'info', text: 'Account deleted successfully. You will be logged out...' });
      setTimeout(() => {
        logout();
      }, 2000);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to delete account. Please try again.';
      setMessage({ type: 'error', text: errorMessage });
    }
  };

  return (
    <div>
      <div className="page-title danger-title">
        <h1>Delete Account</h1>
        <p className="page-description">Permanently delete your account and all associated data</p>
      </div>

      {message.text && (
        <div className={`error-banner ${message.type === 'info' ? 'info-banner' : ''}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <div className="section-number">1</div>
          <div className="section-content">
            <p className="danger-description">⚠️ Warning: This action cannot be undone. All your data will be permanently deleted including your profile information, all portfolios and holdings, transaction history, and account settings.</p>
          </div>
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="btn-submit"
          >
            Delete My Account
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeleteAccount;
