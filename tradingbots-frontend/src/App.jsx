import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AddAssetPage from './pages/AddAssetPage';
import CreatePortfolioPage from './pages/CreatePortfolioPage';
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
                <Dashboard />
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
                <div style={{ padding: '40px', textAlign: 'center' }}>
                  <h1>TradingBots</h1>
                  <p>Coming soon...</p>
                </div>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/markets" 
            element={
              <ProtectedRoute>
                <div style={{ padding: '40px', textAlign: 'center' }}>
                  <h1>Markets</h1>
                  <p>Coming soon...</p>
                </div>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <div style={{ padding: '40px', textAlign: 'center' }}>
                  <h1>Profil</h1>
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
                  <h1>Inställningar</h1>
                  <p>Coming soon...</p>
                </div>
              </ProtectedRoute>
            } 
          />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
