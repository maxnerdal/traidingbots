import { useState } from 'react';
import { portfolioService } from '../services/portfolioService';
import './CreatePortfolio.css';

function CreatePortfolio({ onClose, onSuccess }) {
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
      setError('Portfolio-namn krävs');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const newPortfolio = await portfolioService.createPortfolio(formData);
      
      onSuccess(newPortfolio);
      onClose();
    } catch (err) {
      console.error('Failed to create portfolio:', err);
      setError(err.response?.data?.message || 'Kunde inte skapa portfolio');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Skapa Ny Portfolio</h2>
          <button onClick={onClose} className="modal-close">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="create-portfolio-form">
          {error && (
            <div className="error-banner">
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="name">Portfolio-namn *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="t.ex. Min Crypto Portfolio"
              disabled={loading}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Beskrivning (valfritt)</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Beskriv din portfolio..."
              rows="4"
              disabled={loading}
            />
          </div>

          <div className="modal-actions">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
              disabled={loading}
            >
              Avbryt
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
            >
              {loading ? 'Skapar...' : 'Skapa Portfolio'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePortfolio;
