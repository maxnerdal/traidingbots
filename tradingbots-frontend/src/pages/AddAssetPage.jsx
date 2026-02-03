import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { assetService, portfolioService } from '../services/portfolioService';
import HamburgerMenu from '../components/HamburgerMenu';
import UserAvatar from '../components/UserAvatar';
import '../styles/SharedFormStyles.css';
import './AddAssetPage.css';

function AddAssetPage() {
  const [searchParams] = useSearchParams();
  const portfolioId = searchParams.get('portfolio');
  const navigate = useNavigate();
  
  const [portfolio, setPortfolio] = useState(null);
  const [assets, setAssets] = useState([]);
  const [formData, setFormData] = useState({
    assetId: '',
    quantity: '',
    averageBuyPrice: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [loadingAssets, setLoadingAssets] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!portfolioId) {
      navigate('/portfolio');
      return;
    }
    loadPortfolio();
    loadAssets();
  }, [portfolioId]);

  const loadPortfolio = async () => {
    try {
      const data = await portfolioService.getPortfolioById(portfolioId);
      setPortfolio(data);
    } catch (err) {
      console.error('Failed to load portfolio:', err);
      navigate('/portfolio');
    }
  };

  const loadAssets = async () => {
    try {
      setLoadingAssets(true);
      const data = await assetService.getAllAssets();
      setAssets(data);
    } catch (err) {
      setError('Could not load assets: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoadingAssets(false);
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

    // Validation
    const assetIdNum = parseInt(formData.assetId, 10);
    const quantityNum = parseFloat(formData.quantity);
    const priceNum = parseFloat(formData.averageBuyPrice);

    if (!formData.assetId || isNaN(assetIdNum) || assetIdNum <= 0) {
      setError('Select an asset');
      return;
    }
    if (!formData.quantity || isNaN(quantityNum) || quantityNum <= 0) {
      setError('Enter a valid quantity');
      return;
    }
    if (!formData.averageBuyPrice || isNaN(priceNum) || priceNum <= 0) {
      setError('Enter a valid average price');
      return;
    }

    const payload = {
      digitalAssetId: assetIdNum,
      quantity: quantityNum,
      averageBuyPrice: priceNum,
      notes: formData.notes.trim() || null
    };

    try {
      setLoading(true);
      await portfolioService.addPortfolioItem(portfolioId, payload);
      navigate('/portfolio');
    } catch (err) {
      console.error('Error adding portfolio item:', err);
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const selectedAsset = assets.find(a => a.id === parseInt(formData.assetId));

  if (!portfolio) {
    return <div className="loading-page">Loading...</div>;
  }

  return (
    <div className="page-container">
      {/* Top Header */}
      <header className="top-header">
        <div className="header-left">
          <HamburgerMenu />
          <div className="breadcrumb">
            <span className="breadcrumb-brand" onClick={() => navigate('/tradingbots')} style={{cursor: 'pointer'}}>traidingbots</span>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-page" onClick={() => navigate('/portfolio')} style={{cursor: 'pointer'}}>portfolio</span>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-page">add asset</span>
          </div>
        </div>
        <div className="header-right">
          <UserAvatar />
        </div>
      </header>

      {/* Main Content */}
      <main className="add-asset-content">
        <div className="add-asset-container">
          <h1>Add New Asset</h1>
          <p className="page-subtitle">
            Add a digital asset to portfolio "{portfolio.name}"
          </p>

          <form onSubmit={handleSubmit} className="add-asset-form">
            {/* Section 1: General */}
            <div className="form-section">
              <div className="section-number">1</div>
              <div className="section-content">
                <h2>General</h2>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="portfolio">
                      Portfolio <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="portfolio"
                      value={portfolio.name}
                      disabled
                      className="form-input disabled"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="assetId">
                      Asset <span className="required">*</span>
                    </label>
                    <select
                      id="assetId"
                      name="assetId"
                      value={formData.assetId}
                      onChange={handleChange}
                      className="form-select"
                      required
                    >
                      <option value="">Select an asset</option>
                      {assets.map(asset => (
                        <option key={asset.id} value={asset.id}>
                          {asset.name} ({asset.symbol})
                        </option>
                      ))}
                    </select>
                    <p className="form-hint">
                      Select which digital asset to add
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Details */}
            <div className="form-section">
              <div className="section-number">2</div>
              <div className="section-content">
                <h2>Details</h2>

                <div className="form-row two-columns">
                  <div className="form-group">
                    <label htmlFor="quantity">
                      Quantity <span className="required">*</span>
                    </label>
                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      step="0.00000001"
                      min="0"
                      placeholder="0.00000000"
                      className="form-input"
                      required
                    />
                    <p className="form-hint">How many units do you own?</p>
                  </div>

                  <div className="form-group">
                    <label htmlFor="averageBuyPrice">
                      Average Price (SEK) <span className="required">*</span>
                    </label>
                    <input
                      type="number"
                      id="averageBuyPrice"
                      name="averageBuyPrice"
                      value={formData.averageBuyPrice}
                      onChange={handleChange}
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      className="form-input"
                      required
                    />
                    <p className="form-hint">Average purchase price per unit</p>
                  </div>
                </div>

                {selectedAsset && formData.quantity && formData.averageBuyPrice && (
                  <div className="calculation-info">
                    <strong>Total value:</strong>{' '}
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'SEK'
                    }).format(parseFloat(formData.quantity) * parseFloat(formData.averageBuyPrice))}
                  </div>
                )}

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="notes">Notes</label>
                    <textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows="3"
                      placeholder="Add any notes..."
                      className="form-textarea"
                    />
                    <p className="form-hint">0/{formData.notes.length} characters</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="error-banner">
                {error}
              </div>
            )}

            {/* Action Buttons */}
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
                disabled={loading || loadingAssets}
              >
                {loading ? 'Adding...' : 'Add Asset'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default AddAssetPage;
