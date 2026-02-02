import { useState, useEffect } from 'react';
import { assetService, portfolioService } from '../services/portfolioService';
import './AddAsset.css';

function AddAsset({ portfolio, onClose, onSuccess }) {
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
    loadAssets();
  }, []);

  const loadAssets = async () => {
    try {
      setLoadingAssets(true);
      const data = await assetService.getAllAssets();
      setAssets(data);
    } catch (err) {
      setError('Kunde inte ladda tillgångar: ' + (err.response?.data?.message || err.message));
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

    console.log('Form data:', formData);
    console.log('Parsed values:', { assetIdNum, quantityNum, priceNum });

    if (!formData.assetId || isNaN(assetIdNum) || assetIdNum <= 0) {
      setError('Välj en tillgång');
      return;
    }
    if (!formData.quantity || isNaN(quantityNum) || quantityNum <= 0) {
      setError('Ange ett giltigt antal');
      return;
    }
    if (!formData.averageBuyPrice || isNaN(priceNum) || priceNum <= 0) {
      setError('Ange ett giltigt snittpris');
      return;
    }

    const payload = {
      digitalAssetId: assetIdNum,  // Backend förväntar digitalAssetId, inte assetId
      quantity: quantityNum,
      averageBuyPrice: priceNum,
      notes: formData.notes.trim() || null
    };

    console.log('Sending payload:', payload);

    try {
      setLoading(true);
      const portfolioItem = await portfolioService.addPortfolioItem(portfolio.id, payload);
      console.log('Success:', portfolioItem);
      onSuccess(portfolioItem);
      onClose();
    } catch (err) {
      console.error('Error adding portfolio item:', err);
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const selectedAsset = assets.find(a => a.id === parseInt(formData.assetId));

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Lägg till tillgång</h2>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="portfolio-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="assetId">Tillgång *</label>
            {loadingAssets ? (
              <p>Laddar tillgångar...</p>
            ) : assets.length === 0 ? (
              <p className="no-assets">
                Inga tillgångar tillgängliga. 
                <br />
                <small>Du måste först skapa tillgångar via API:et.</small>
              </p>
            ) : (
              <select
                id="assetId"
                name="assetId"
                value={formData.assetId}
                onChange={handleChange}
                required
                disabled={loading}
              >
                <option value="">Välj tillgång...</option>
                {assets.map(asset => (
                  <option key={asset.id} value={asset.id}>
                    {asset.symbol} - {asset.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          {selectedAsset && (
            <div className="asset-info">
              <p><strong>Symbol:</strong> {selectedAsset.symbol}</p>
              <p><strong>Namn:</strong> {selectedAsset.name}</p>
              {selectedAsset.coingeckoId && (
                <p><strong>CoinGecko ID:</strong> {selectedAsset.coingeckoId}</p>
              )}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="quantity">Antal *</label>
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
            <small>Ange antal enheter du äger</small>
          </div>

          <div className="form-group">
            <label htmlFor="averageBuyPrice">Snittpris (SEK) *</label>
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
            <small>Genomsnittligt inköpspris per enhet i SEK</small>
          </div>

          <div className="form-group">
            <label htmlFor="notes">Anteckningar</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Valfria anteckningar om detta innehav..."
              rows="3"
              disabled={loading}
            />
          </div>

          <div className="modal-actions">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="btn btn-secondary"
            >
              Avbryt
            </button>
            <button
              type="submit"
              disabled={loading || assets.length === 0}
              className="btn btn-primary"
            >
              {loading ? 'Lägger till...' : 'Lägg till tillgång'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddAsset;
