import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { portfolioService } from '../services/portfolioService';
import HamburgerMenu from '../components/HamburgerMenu';
import UserAvatar from '../components/UserAvatar';
import '../styles/SharedFormStyles.css';
import '../styles/SharedPageStyles.css';
import './CreatePortfolioPage.css';

function CreatePortfolioPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      setError('Portfolio name is required');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      await portfolioService.createPortfolio(formData);
      navigate('/portfolio');
    } catch (err) {
      console.error('Failed to create portfolio:', err);
      setError(err.response?.data?.message || 'Could not create portfolio');
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <header className="top-header">
        <div className="header-left">
          <HamburgerMenu />
          <div className="breadcrumb">
            <img 
              src="/logo_light_mode.png" 
              alt="TraidingBots" 
              className="breadcrumb-logo"
              onClick={() => navigate('/tradingbots')} 
              style={{height: '40px', cursor: 'pointer', objectFit: 'contain', transform: 'translateY(1px)'}} 
            />
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-page" onClick={() => navigate('/portfolio')} style={{cursor: 'pointer'}}>portfolio</span>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-page">create portfolio</span>
          </div>
        </div>
        <div className="header-right">
          <UserAvatar />
        </div>
      </header>

      <main className="form-page-content">
        <div className="page-title">
          <h1>Create New Portfolio</h1>
          <p className="page-description">Organize and track your crypto assets in a new portfolio</p>
        </div>

        <form onSubmit={handleSubmit} className="create-portfolio-form">
          {error && (
            <div className="error-banner">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm1 13H7v-2h2v2zm0-3H7V4h2v6z"/>
              </svg>
              {error}
            </div>
          )}

          {/* Section 1: Basic Information */}
          <div className="form-section">
            <div className="section-number">1</div>
            <div className="section-content">
              <h2>Basic Information</h2>
              <p className="section-description">Give your portfolio a name and description</p>
              
              <div className="form-group">
                <label htmlFor="name">
                  Portfolio Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. My Crypto Portfolio"
                  disabled={loading}
                  required
                  autoFocus
                />
                <p className="field-hint">Choose a descriptive name for your portfolio</p>
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your portfolio and its investment strategy..."
                  rows="4"
                  disabled={loading}
                />
                <p className="field-hint">Optional: Add notes about this portfolio</p>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate('/portfolio')}
              className="btn-cancel"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-submit"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Portfolio'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default CreatePortfolioPage;
