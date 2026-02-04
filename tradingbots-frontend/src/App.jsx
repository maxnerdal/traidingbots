import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import TradingBots from './pages/TradingBots';
import Portfolio from './pages/Portfolio';
import AddAssetPage from './pages/AddAssetPage';
import EditAsset from './pages/EditAsset';
import CreatePortfolioPage from './pages/CreatePortfolioPage';
import MarketPage from './pages/MarketPage';
import Settings from './pages/Settings';
import PersonalInfo from './pages/PersonalInfo';
import ChangePassword from './pages/ChangePassword';
import DeleteAccount from './pages/DeleteAccount';
import AppearanceSettings from './pages/AppearanceSettings';
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
            path="/edit-asset/:portfolioId/:itemId" 
            element={
              <ProtectedRoute>
                <EditAsset />
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
            path="/settings" 
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          >
            <Route index element={<PersonalInfo />} />
            <Route path="password" element={<ChangePassword />} />
            <Route path="delete" element={<DeleteAccount />} />
            <Route path="appearance" element={<AppearanceSettings />} />
          </Route>
          <Route 
            path="/profile" 
            element={<Navigate to="/settings" replace />} 
          />
          <Route path="/" element={<Navigate to="/tradingbots" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
