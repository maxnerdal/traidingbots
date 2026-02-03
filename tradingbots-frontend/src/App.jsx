import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import TradingBots from './pages/TradingBots';
import Portfolio from './pages/Portfolio';
import AddAssetPage from './pages/AddAssetPage';
import CreatePortfolioPage from './pages/CreatePortfolioPage';
import MarketPage from './pages/MarketPage';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/portfolio" 
            element={
              <ProtectedRoute>
                <Portfolio />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/add-asset" 
            element={
              <ProtectedRoute>
                <AddAssetPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/create-portfolio" 
            element={
              <ProtectedRoute>
                <CreatePortfolioPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard" 
            element={<Navigate to="/portfolio" replace />} 
          />
          <Route 
            path="/tradingbots" 
            element={
              <ProtectedRoute>
                <TradingBots />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/markets" 
            element={
              <ProtectedRoute>
                <MarketPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <div style={{ padding: '40px', textAlign: 'center' }}>
                  <h1>Profile</h1>
                  <p>Coming soon...</p>
                </div>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/settings" 
            element={
              <ProtectedRoute>
                <div style={{ padding: '40px', textAlign: 'center' }}>
                  <h1>Settings</h1>
                  <p>Coming soon...</p>
                </div>
              </ProtectedRoute>
            } 
          />
          <Route path="/" element={<Navigate to="/tradingbots" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
