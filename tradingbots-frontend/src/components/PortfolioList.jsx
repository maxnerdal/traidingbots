import { useState, useEffect } from 'react';
import { portfolioService } from '../services/portfolioService';
import './PortfolioList.css';

function PortfolioList({ onSelectPortfolio, onCreateClick }) {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadPortfolios();
  }, []);

  const loadPortfolios = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await portfolioService.getAllPortfolios();
      setPortfolios(data);
    } catch (err) {
      console.error('Failed to load portfolios:', err);
      setError('Kunde inte ladda portfolios');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (portfolioId, e) => {
    e.stopPropagation();
    if (!window.confirm('Är du säker på att du vill radera denna portfolio?')) {
      return;
    }

    try {
      await portfolioService.deletePortfolio(portfolioId);
      setPortfolios(portfolios.filter(p => p.id !== portfolioId));
    } catch (err) {
      console.error('Failed to delete portfolio:', err);
      alert('Kunde inte radera portfolio');
    }
  };

  if (loading) {
    return <div className="loading">Laddar portfolios...</div>;
  }

  if (error) {
    return (
      <div className="error-message">
        <p>{error}</p>
        <button onClick={loadPortfolios} className="btn-primary">
          Försök igen
        </button>
      </div>
    );
  }

  return (
    <div className="portfolio-list">
      <div className="portfolio-list-header">
        <h2>Mina Portfolios</h2>
        <button onClick={onCreateClick} className="btn-primary">
          + Skapa Portfolio
        </button>
      </div>

      {portfolios.length === 0 ? (
        <div className="empty-state">
          <h3>Du har inga portfolios än</h3>
          <p>Skapa din första portfolio för att börja spåra dina kryptotillgångar</p>
          <button onClick={onCreateClick} className="btn-primary">
            Skapa din första portfolio
          </button>
        </div>
      ) : (
        <div className="portfolio-grid">
          {portfolios.map((portfolio) => (
            <div
              key={portfolio.id}
              className="portfolio-card"
              onClick={() => onSelectPortfolio(portfolio)}
            >
              <div className="portfolio-card-header">
                <h3>{portfolio.name}</h3>
                <button
                  onClick={(e) => handleDelete(portfolio.id, e)}
                  className="btn-delete"
                  title="Radera portfolio"
                >
                  ×
                </button>
              </div>
              
              {portfolio.description && (
                <p className="portfolio-description">{portfolio.description}</p>
              )}
              
              <div className="portfolio-stats">
                <div className="stat">
                  <span className="stat-label">Antal tillgångar</span>
                  <span className="stat-value">{portfolio.items?.length || 0}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Skapad</span>
                  <span className="stat-value">
                    {new Date(portfolio.createdAt).toLocaleDateString('sv-SE')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PortfolioList;
