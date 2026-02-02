import { useState, useEffect } from 'react';
import { portfolioService } from '../services/portfolioService';
import './PortfolioDetail.css';

function PortfolioDetail({ portfolio, onClose, onAddAsset, onRefresh }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (portfolio) {
      loadPortfolioItems();
    }
  }, [portfolio]);

  const loadPortfolioItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await portfolioService.getPortfolioItems(portfolio.id);
      setItems(data);
    } catch (err) {
      console.error('Failed to load portfolio items:', err);
      setError('Kunde inte ladda innehåll');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteItem = async (itemId) => {
    if (!window.confirm('Är du säker på att du vill ta bort denna tillgång?')) {
      return;
    }

    try {
      await portfolioService.deletePortfolioItem(portfolio.id, itemId);
      setItems(items.filter(item => item.id !== itemId));
      onRefresh && onRefresh();
    } catch (err) {
      console.error('Failed to delete item:', err);
      alert('Kunde inte ta bort tillgång');
    }
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('sv-SE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 8,
    }).format(num);
  };

  const formatCurrency = (num) => {
    return new Intl.NumberFormat('sv-SE', {
      style: 'currency',
      currency: 'SEK',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  if (!portfolio) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2>{portfolio.name}</h2>
            {portfolio.description && (
              <p className="portfolio-subtitle">{portfolio.description}</p>
            )}
          </div>
          <button onClick={onClose} className="modal-close">
            ×
          </button>
        </div>

        <div className="portfolio-detail-content">
          <div className="portfolio-actions">
            <button onClick={onAddAsset} className="btn-primary">
              + Lägg till Tillgång
            </button>
          </div>

          {loading ? (
            <div className="loading">Laddar innehåll...</div>
          ) : error ? (
            <div className="error-message">
              <p>{error}</p>
              <button onClick={loadPortfolioItems} className="btn-primary">
                Försök igen
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="empty-state">
              <h3>Inga tillgångar än</h3>
              <p>Lägg till din första kryptotillgång i denna portfolio</p>
              <button onClick={onAddAsset} className="btn-primary">
                Lägg till tillgång
              </button>
            </div>
          ) : (
            <div className="items-table">
              <table>
                <thead>
                  <tr>
                    <th>Tillgång</th>
                    <th>Symbol</th>
                    <th className="text-right">Antal</th>
                    <th className="text-right">Snitt-pris</th>
                    <th className="text-right">Värde</th>
                    <th className="text-center">Åtgärder</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => {
                    const totalValue = item.quantity * (item.averageBuyPrice || 0);
                    return (
                      <tr key={item.id}>
                        <td className="asset-name">{item.digitalAsset.name}</td>
                        <td>
                          <span className="asset-symbol">{item.digitalAsset.symbol}</span>
                        </td>
                        <td className="text-right">{formatNumber(item.quantity)}</td>
                        <td className="text-right">
                          {item.averageBuyPrice ? formatCurrency(item.averageBuyPrice) : '-'}
                        </td>
                        <td className="text-right total-value">
                          {item.averageBuyPrice ? formatCurrency(totalValue) : '-'}
                        </td>
                        <td className="text-center">
                          <button
                            onClick={() => handleDeleteItem(item.id)}
                            className="btn-delete-small"
                            title="Ta bort"
                          >
                            ×
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PortfolioDetail;
