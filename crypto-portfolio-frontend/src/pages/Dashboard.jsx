import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
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
        <h1>Välkommen till TradingBots!</h1>
        <div className="user-info-card">
          <h3>Din profil</h3>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Roller:</strong> {user?.roles?.join(', ')}</p>
          <p><strong>Status:</strong> {user?.authenticated ? 'Autentiserad ✓' : 'Ej autentiserad'}</p>
        </div>

        <div className="info-card">
          <h3>🎉 Autentisering fungerar!</h3>
          <p>Backend JWT-autentisering är nu kopplad till frontend.</p>
          <ul>
            <li>✅ Du är inloggad med JWT token</li>
            <li>✅ Token sparas i localStorage</li>
            <li>✅ Skyddade routes fungerar</li>
            <li>✅ Axios skickar automatiskt token</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
