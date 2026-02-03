import { useAuth } from '../context/AuthContext';
import HamburgerMenu from '../components/HamburgerMenu';
import UserAvatar from '../components/UserAvatar';
import './TradingBots.css';

function TradingBots() {
  const { user } = useAuth();

  return (
    <div className="page-container">
      {/* Top Navigation */}
      <header className="top-header">
        <div className="header-left">
          <HamburgerMenu />
          <div className="breadcrumb">
            <span className="breadcrumb-brand">traidingbots</span>
          </div>
        </div>
        <div className="header-right">
          <UserAvatar />
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="welcome-section">
          <h1>Welcome to TradingBots</h1>
          <p className="subtitle">Your platform for crypto trading and portfolio management</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Portfolio Management</h3>
            <p>Manage and track your crypto assets in one place</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🤖</div>
            <h3>Trading Bots</h3>
            <p>Automate your trading with intelligent bots</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📈</div>
            <h3>Markets</h3>
            <p>Follow the market in real-time and find opportunities</p>
          </div>
        </div>

        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            <button className="action-btn" onClick={() => window.location.href = '/portfolio'}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/>
              </svg>
              View Portfolio
            </button>
            <button className="action-btn" onClick={() => window.location.href = '/create-portfolio'}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"/>
              </svg>
              Create Portfolio
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default TradingBots;
