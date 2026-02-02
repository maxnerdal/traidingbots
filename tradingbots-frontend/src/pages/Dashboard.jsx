import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import PortfolioList from '../components/PortfolioList';
import CreatePortfolio from '../components/CreatePortfolio';
import PortfolioDetail from '../components/PortfolioDetail';
import AddAsset from '../components/AddAsset';
import './Dashboard.css';

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAddAssetModal, setShowAddAssetModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSelectPortfolio = (portfolio) => {
    setSelectedPortfolio(portfolio);
  };

  const handleClosePortfolioDetail = () => {
    setSelectedPortfolio(null);
    setRefreshKey(prev => prev + 1); // Refresh portfolio list
  };

  const handleCreateSuccess = () => {
    setShowCreateModal(false);
    setRefreshKey(prev => prev + 1); // Refresh portfolio list
  };

  const handleAddAssetClick = () => {
    setShowAddAssetModal(true);
  };

  const handleAddAssetSuccess = () => {
    setShowAddAssetModal(false);
    setRefreshKey(prev => prev + 1); // Refresh portfolio detail
  };

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <div className="navbar-brand">
          <h2>TradingBots</h2>
        </div>
        <div className="navbar-user">
          <span>Inloggad som: {user?.email}</span>
          <button onClick={handleLogout} className="btn-secondary">
            Logga ut
          </button>
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>Mina Portfolios</h1>
          <button 
            onClick={() => setShowCreateModal(true)} 
            className="btn btn-primary"
          >
            + Skapa Portfolio
          </button>
        </div>

        <PortfolioList
          key={refreshKey}
          onSelectPortfolio={handleSelectPortfolio}
          onCreateClick={() => setShowCreateModal(true)}
        />
      </div>

      {showCreateModal && (
        <CreatePortfolio
          onClose={() => setShowCreateModal(false)}
          onSuccess={handleCreateSuccess}
        />
      )}

      {selectedPortfolio && (
        <PortfolioDetail
          portfolio={selectedPortfolio}
          onClose={handleClosePortfolioDetail}
          onAddAsset={handleAddAssetClick}
          onRefresh={() => setRefreshKey(prev => prev + 1)}
        />
      )}

      {showAddAssetModal && selectedPortfolio && (
        <AddAsset
          portfolio={selectedPortfolio}
          onClose={() => setShowAddAssetModal(false)}
          onSuccess={handleAddAssetSuccess}
        />
      )}
    </div>
  );
}

export default Dashboard;
