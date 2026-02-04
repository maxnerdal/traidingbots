import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/SharedFormStyles.css';

const PersonalInfo = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    // Simulate API call
    setTimeout(() => {
      setMessage({ type: 'success', text: 'Personal information updated successfully!' });
      setIsEditing(false);
    }, 1000);
  };

  return (
    <div>
      <div className="page-title">
        <h1>Personal Information</h1>
        <p className="page-description">Update your personal details</p>
      </div>

      {message.text && (
        <div className={`error-banner ${message.type === 'success' ? 'success-banner' : ''}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <div className="section-number">1</div>
          <div className="section-content">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled
              />
              <small className="form-hint">Email cannot be changed</small>
            </div>
          </div>
        </div>

        <div className="form-actions">
          {!isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="btn-submit"
            >
              Edit Information
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  if (user) {
                    setFormData({
                      firstName: user.firstName || '',
                      lastName: user.lastName || '',
                      email: user.email || ''
                    });
                  }
                }}
                className="btn-cancel"
              >
                Cancel
              </button>
              <button type="submit" className="btn-submit">
                Save Changes
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default PersonalInfo;
