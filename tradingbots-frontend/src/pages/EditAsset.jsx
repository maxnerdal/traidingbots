import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { assetService, portfolioService } from '../services/portfolioService';
import HamburgerMenu from '../components/HamburgerMenu';
import UserAvatar from '../components/UserAvatar';
import '../styles/SharedFormStyles.css';
import '../styles/SharedPageStyles.css';
import './AddAssetPage.css';

function EditAsset() {
  const { portfolioId, itemId } = useParams();
  const navigate = useNavigate();
  
  const [portfolioItem, setPortfolioItem] = useState(null);
  const [assets, setAssets] = useState([]);
  const [formData, setFormData] = useState({
    assetId: '',
    quantity: '',
    averageBuyPrice: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadData();
  }, [portfolioId, itemId]);

  const loadData = async () => {
    try {
      setLoadingData(true);
      
      // Load assets
      const assetsData = await assetService.getAllAssets();
      setAssets(assetsData);
      
      // Load portfolio items to find the specific item
      const items = await portfolioService.getPortfolioItems(portfolioId);
      const item = items.find(i => i.id === parseInt(itemId));
      
      if (!item) {
        setError('Portfolio item not found');
        return;
      }
      
      setPortfolioItem(item);
      
      // Pre-fill form with existing data
      setFormData({
        assetId: item.digitalAsset.id.toString(),
        quantity: item.quantity.toString(),
        averageBuyPrice: item.averageBuyPrice?.toString() || '',
        notes: item.notes || ''
      });
      
    } catch (err) {
      setError('Could not load data: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoadingData(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    const quantityNum = parseFloat(formData.quantity);
    const priceNum = parseFloat(formData.averageBuyPrice);

    if (!formData.quantity || isNaN(quantityNum) || quantityNum <= 0) {
      setError('Enter a valid quantity');
      return;
    }
    if (!formData.averageBuyPrice || isNaN(priceNum) || priceNum <= 0) {
      setError('Enter a valid average price');
      return;
    }

    const payload = {
      quantity: quantityNum,
      averageBuyPrice: priceNum,
      notes: formData.notes.trim() || null
    };

    try {
      setLoading(true);
      await portfolioService.updatePortfolioItem(portfolioId, itemId, payload);
      setSuccess('Asset updated!');
      
      // Navigate back to portfolio after a short delay
      setTimeout(() => {
        navigate('/portfolio');
      }, 1500);
    } catch (err) {
      console.error('Error updating portfolio item:', err);
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to remove this asset from your portfolio?')) {
      return;
    }

    try {
      setLoading(true);
      await portfolioService.deletePortfolioItem(portfolioId, itemId);
      navigate('/portfolio');
    } catch (err) {
      setError('Could not delete asset: ' + (err.response?.data?.message || err.message));
      setLoading(false);
    }
  };

  if (loadingData) {
    return (
      <div className="page-container">
        <header className="top-header">
          <div className="header-left">
            <HamburgerMenu />
            <div className="breadcrumb">
              <span className="breadcrumb-brand" onClick={() => navigate('/tradingbots')} style={{cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px'}}>
                <img src="/logo.png" alt="Logo" style={{height: '32px', objectFit: 'contain'}} />
                traidingbots
              </span>
              <span className="breadcrumb-separator">/</span>
              <span className="breadcrumb-page" onClick={() => navigate('/portfolio')} style={{cursor: 'pointer'}}>portfolio</span>
              <span className="breadcrumb-separator">/</span>
              <span className="breadcrumb-current">edit asset</span>
            </div>
          </div>
          <div className="header-right">
            <UserAvatar />
          </div>
        </header>
        <main className="form-page-content">
          <p>Loading...</p>
        </main>
      </div>
    );
  }

  const selectedAsset = assets.find(a => a.id === parseInt(formData.assetId));

  return (
    <div className="page-container">
      {/* Top Navigation */}
      <header className="top-header">
        <div className="header-left">
          <HamburgerMenu />
          <div className="breadcrumb">
            <span className="breadcrumb-brand" onClick={() => navigate('/tradingbots')} style={{cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px'}}>
              <img src="/logo.png" alt="Logo" style={{height: '32px', objectFit: 'contain'}} />
              traidingbots
            </span>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-page" onClick={() => navigate('/portfolio')} style={{cursor: 'pointer'}}>portfolio</span>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">edit asset</span>
          </div>
        </div>
        <div className="header-right">
          <UserAvatar />
        </div>
      </header>

      {/* Main Content */}
      <main className="form-page-content">
        <div className="add-asset-container">
          <div className="page-title">
            <h1>Edit Asset</h1>
            <p className="page-description">Update details for your asset</p>
          </div>

          <form onSubmit={handleSubmit} className="add-asset-form">
            {error && <div className="error-banner">{error}</div>}
            {success && <div className="success-banner">{success}</div>}

            <div className="form-section">
              <div className="form-group">
                <label htmlFor="assetId">Asset *</label>
                <select
                  id="assetId"
                  name="assetId"
                  value={formData.assetId}
                  disabled={true}
                  className="disabled-select"
                >
                  {selectedAsset && (
                    <option value={selectedAsset.id}>
                      {selectedAsset.symbol} - {selectedAsset.name}
                    </option>
                  )}
                </select>
                <small>The asset cannot be changed</small>
              </div>

              <div className="form-group">
                <label htmlFor="quantity">Quantity *</label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  step="0.00000001"
                  min="0.00000001"
                  placeholder="0.00000000"
                  required
                  disabled={loading}
                />
                <small>Enter the number of units you own</small>
              </div>

              <div className="form-group">
                <label htmlFor="averageBuyPrice">Average Price (USD) *</label>
                <input
                  type="number"
                  id="averageBuyPrice"
                  name="averageBuyPrice"
                  value={formData.averageBuyPrice}
                  onChange={handleChange}
                  step="0.01"
                  min="0.01"
                  placeholder="0.00"
                  required
                  disabled={loading}
                />
                <small>Average purchase price per unit in USD</small>
              </div>

              <div className="form-group">
                <label htmlFor="notes">Notes</label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Optional notes about this holding..."
                  rows="3"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="form-actions">
              <div style={{flex: 1}}></div>
              <button
                type="button"
                onClick={handleDelete}
                disabled={loading}
                className="btn-danger"
              >
                Delete
              </button>
              <button
                type="button"
                onClick={() => navigate('/portfolio')}
                disabled={loading}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn-submit"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default EditAsset;
