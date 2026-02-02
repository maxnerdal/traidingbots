import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import HamburgerMenu from '../components/HamburgerMenu';
import UserAvatar from '../components/UserAvatar';
import { portfolioService } from '../services/portfolioService';
import './Dashboard.css';

function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [portfolios, setPortfolios] = useState([]);
  const [selectedPortfolio, setSelectedPortfolio] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPortfolios();
  }, []);

  const loadPortfolios = async () => {
    try {
      setLoading(true);
      const data = await portfolioService.getAll();
      
      // Load items for each portfolio
      const portfoliosWithItems = await Promise.all(
        data.map(async (portfolio) => {
          try {
            const items = await portfolioService.getPortfolioItems(portfolio.id);
            return { ...portfolio, items };
          } catch (err) {
            console.error(`Failed to load items for portfolio ${portfolio.id}:`, err);
            return { ...portfolio, items: [] };
          }
        })
      );
      
      setPortfolios(portfoliosWithItems);
    } catch (err) {
      console.error('Failed to load portfolios:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAsset = (portfolioId) => {
    navigate(`/add-asset?portfolio=${portfolioId}`);
  };

  const handleDeletePortfolio = async (portfolioId) => {
    if (!window.confirm('Är du säker på att du vill ta bort denna portfolio?')) {
      return;
    }

    try {
      await portfolioService.deletePortfolio(portfolioId);
      loadPortfolios();
      if (selectedPortfolio === portfolioId) {
        setSelectedPortfolio('all');
      }
    } catch (err) {
      console.error('Failed to delete portfolio:', err);
      alert('Kunde inte ta bort portfolio');
    }
  };

  const getAllItems = () => {
    let allItems = [];
    portfolios.forEach(portfolio => {
      if (portfolio.items && portfolio.items.length > 0) {
        portfolio.items.forEach(item => {
          allItems.push({
            ...item,
            portfolioName: portfolio.name,
            portfolioId: portfolio.id
          });
        });
      }
    });
    return allItems;
  };

  const getItemsForPortfolio = (portfolioId) => {
    const portfolio = portfolios.find(p => p.id === parseInt(portfolioId));
    return portfolio?.items || [];
  };

  const displayItems = selectedPortfolio === 'all' 
    ? getAllItems()
    : getItemsForPortfolio(selectedPortfolio);

  return (
    <div className="page-container">
      {/* Top Navigation */}
      <header className="top-header">
        <div className="header-left">
          <HamburgerMenu />
          <div className="breadcrumb">
            <span className="breadcrumb-brand">traidingbots</span>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-page">portfolio</span>
          </div>
        </div>
        <div className="header-right">
          <UserAvatar />
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Portfolio Header */}
        <div className="portfolio-header">
          <div className="portfolio-title">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/>
            </svg>
            <h1>Portfolio</h1>
          </div>
          <div className="portfolio-actions">
            <select 
              className="portfolio-selector"
              value={selectedPortfolio}
              onChange={(e) => setSelectedPortfolio(e.target.value)}
            >
              <option value="all">by portfolio ▼</option>
              {portfolios.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
            <button onClick={() => navigate('/create-portfolio')} className="btn-new-portfolio">
              Ny portfolio +
            </button>
          </div>
        </div>

        {/* Portfolio Sections */}
        {loading ? (
          <div className="loading-state">Laddar portfolios...</div>
        ) : portfolios.length === 0 ? (
          <div className="empty-state">
            <p>Inga portfolios än</p>
            <button onClick={() => navigate('/create-portfolio')} className="btn-create">
              + Skapa Portfolio
            </button>
          </div>
        ) : (
          <>
            {selectedPortfolio === 'all' ? (
              // Show all portfolios as separate sections
              portfolios.map(portfolio => (
                <PortfolioSection 
                  key={portfolio.id} 
                  portfolio={portfolio}
                  onAddAsset={() => handleAddAsset(portfolio.id)}
                  onDelete={handleDeletePortfolio}
                />
              ))
            ) : (
              // Show selected portfolio
              <PortfolioSection 
                portfolio={portfolios.find(p => p.id === parseInt(selectedPortfolio))}
                onAddAsset={() => handleAddAsset(selectedPortfolio)}
                onDelete={handleDeletePortfolio}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}

// Portfolio Section Component
function PortfolioSection({ portfolio, onAddAsset, onDelete }) {
  if (!portfolio) return null;

  const formatNumber = (num) => {
    if (num === null || num === undefined) return '-';
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 8,
    }).format(num);
  };

  const formatCurrency = (num) => {
    if (num === null || num === undefined) return '-';
    return '$' + new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  const formatPercentage = (num) => {
    if (num === null || num === undefined) return '-';
    const sign = num >= 0 ? '▲' : '▼';
    return `${sign} ${Math.abs(num).toFixed(2)}%`;
  };

  const getPercentageClass = (num) => {
    if (num === null || num === undefined) return '';
    return num >= 0 ? 'text-positive' : 'text-negative';
  };

  const items = portfolio.items || [];

  return (
    <div className="portfolio-section">
      <div className="section-header">
        <div className="section-title">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 8a3 3 0 100-6 3 3 0 000 6zM3 14a5 5 0 1110 0H3z"/>
          </svg>
          <h2>{portfolio.name}</h2>
        </div>
        <div className="section-actions">
          <button className="btn-add-asset" onClick={onAddAsset}>
            + Lägg till tillgång
          </button>
          <button className="btn-delete-portfolio" onClick={() => onDelete(portfolio.id)} title="Ta bort portfolio">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
              <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
            </svg>
          </button>
          <span className="section-time">1 hour ago</span>
          <button className="btn-refresh">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 3a5 5 0 104.546 2.914.5.5 0 01.908-.417A6 6 0 118 2v1z"/>
              <path d="M8 4.466V.534a.25.25 0 01.41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 018 4.466z"/>
            </svg>
          </button>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="empty-portfolio">
          <p>Inga tillgångar i denna portfolio</p>
        </div>
      ) : (
        <div className="portfolio-table-wrapper">
          <table className="portfolio-table">
            <thead>
              <tr>
                <th className="text-left">Name</th>
                <th className="text-right">Price</th>
                <th className="text-right">1h%</th>
                <th className="text-right">24h%</th>
                <th className="text-right">7d%</th>
                <th className="text-right">Holdings</th>
                <th className="text-right">Avg Buy Price</th>
                <th className="text-right">Profit/Loss</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => {
                const currentPrice = item.digitalAsset?.currentPrice || 0;
                const holdings = item.quantity * currentPrice;
                const avgBuyPrice = item.averageBuyPrice || 0;
                const profitLoss = holdings - (item.quantity * avgBuyPrice);
                
                return (
                  <tr key={item.id || index}>
                    <td className="asset-cell">
                      <div className="asset-icon">₿</div>
                      <div className="asset-info">
                        <span className="asset-name">{item.digitalAsset?.name || 'Unknown'}</span>
                        <span className="asset-symbol">{item.digitalAsset?.symbol || 'N/A'}</span>
                      </div>
                    </td>
                    <td className="text-right">{formatCurrency(currentPrice)}</td>
                    <td className={`text-right ${getPercentageClass(item.digitalAsset?.change1h)}`}>
                      {formatPercentage(item.digitalAsset?.change1h || 0.34)}
                    </td>
                    <td className={`text-right ${getPercentageClass(item.digitalAsset?.change24h)}`}>
                      {formatPercentage(item.digitalAsset?.change24h || -0.02)}
                    </td>
                    <td className={`text-right ${getPercentageClass(item.digitalAsset?.change7d)}`}>
                      {formatPercentage(item.digitalAsset?.change7d || -11.00)}
                    </td>
                    <td className="text-right">{formatCurrency(holdings)}</td>
                    <td className="text-right">{formatCurrency(avgBuyPrice)}</td>
                    <td className={`text-right ${getPercentageClass(profitLoss)}`}>
                      {formatCurrency(profitLoss)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
