import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cryptoMarketService } from '../services/cryptoMarketService';
import HamburgerMenu from '../components/HamburgerMenu';
import UserAvatar from '../components/UserAvatar';
import './MarketPage.css';

const MarketPage = () => {
  const navigate = useNavigate();
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCryptos, setFilteredCryptos] = useState([]);

  useEffect(() => {
    loadMarketData();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredCryptos(cryptos);
    } else {
      const filtered = cryptos.filter(crypto =>
        crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCryptos(filtered);
    }
  }, [searchQuery, cryptos]);

  const loadMarketData = async () => {
    try {
      setLoading(true);
      console.log('Fetching market data from API...');
      const data = await cryptoMarketService.getTopCryptos(100, 1);
      console.log('Received data:', data);
      setCryptos(data);
      setFilteredCryptos(data);
    } catch (err) {
      console.error('Error loading market data:', err);
      setError('Failed to load market data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num) => {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
    return `$${num.toFixed(2)}`;
  };

  const formatPrice = (price) => {
    if (price >= 1) return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    if (price >= 0.01) return `$${price.toFixed(4)}`;
    return `$${price.toFixed(8)}`;
  };

  const formatPercentage = (value) => {
    if (!value) return '0.00%';
    const formatted = Math.abs(value).toFixed(2);
    return value >= 0 ? `+${formatted}%` : `-${formatted}%`;
  };

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
            <span className="breadcrumb-page">market</span>
          </div>
        </div>
        <div className="header-right">
          <UserAvatar />
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Market Header */}
        <div className="market-header">
          <div className="market-title">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
            </svg>
            <h1>Crypto Market</h1>
          </div>
          <div>
            <h1>Cryptocurrency Prices by Market Cap</h1>
            <p className="market-description">
              Live cryptocurrency prices and market data for the top 100 cryptocurrencies
            </p>
          </div>
          <button className="btn-refresh" onClick={loadMarketData}>
            Refresh
          </button>
        </div>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search cryptocurrencies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {error && (
          <div className="error-banner">
            {error}
          </div>
        )}

        {loading ? (
          <div className="loading-state">Loading market data...</div>
        ) : (
          <div className="market-table-container">
            <table className="market-table">
              <thead>
                <tr>
                  <th className="text-left">#</th>
                  <th className="text-left">Name</th>
                  <th className="text-right">Price</th>
                  <th className="text-right">24h %</th>
                  <th className="text-right">Market Cap</th>
                  <th className="text-right">Volume (24h)</th>
                </tr>
              </thead>
              <tbody>
                {filteredCryptos.map((crypto) => (
                  <tr key={crypto.id} className="market-row">
                    <td className="text-left rank-cell">{crypto.marketCapRank}</td>
                    <td className="text-left">
                      <div className="crypto-info">
                        <img
                          src={crypto.image}
                          alt={crypto.name}
                          className="crypto-icon"
                        />
                        <div>
                          <div className="crypto-name">{crypto.name}</div>
                          <div className="crypto-symbol">{crypto.symbol.toUpperCase()}</div>
                        </div>
                      </div>
                    </td>
                    <td className="text-right price-cell">
                      {formatPrice(crypto.currentPrice)}
                    </td>
                    <td className={`text-right ${crypto.priceChangePercentage24h >= 0 ? 'positive' : 'negative'}`}>
                      {formatPercentage(crypto.priceChangePercentage24h)}
                    </td>
                    <td className="text-right">
                      {formatNumber(crypto.marketCap)}
                    </td>
                    <td className="text-right">
                      {formatNumber(crypto.totalVolume)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default MarketPage;
