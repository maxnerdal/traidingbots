import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import HamburgerMenu from '../components/HamburgerMenu';
import UserAvatar from '../components/UserAvatar';
import '../styles/Settings.css';

const Settings = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const menuItems = [
    {
      title: 'Profile',
      items: [
        { path: '/settings', label: 'Personal info', icon: '👤' },
        { path: '/settings/password', label: 'Change password', icon: '🔒' },
        { path: '/settings/delete', label: 'Delete account', icon: '🗑️' }
      ]
    },
    {
      title: 'Appearance',
      items: [
        { path: '/settings/appearance', label: 'Theme', icon: '🎨' }
      ]
    }
  ];

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
            <span className="breadcrumb-page" onClick={() => navigate('/settings')} style={{cursor: 'pointer'}}>settings</span>
          </div>
        </div>
        <div className="header-right">
          <UserAvatar />
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="settings-container">
          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            Settings Menu {mobileMenuOpen ? '▲' : '▼'}
          </button>

          {/* Sidebar Navigation */}
          <aside className={`settings-sidebar ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            <nav className="settings-nav">
              {menuItems.map((section, idx) => (
                <div key={idx} className="settings-nav-section">
                  <h3 className="settings-nav-title">{section.title}</h3>
                  <ul className="settings-nav-list">
                    {section.items.map((item) => (
                      <li key={item.path}>
                        <button
                          className={`settings-nav-item ${isActive(item.path) ? 'active' : ''}`}
                          onClick={() => {
                            navigate(item.path);
                            setMobileMenuOpen(false);
                          }}
                        >
                          <span className="nav-icon">{item.icon}</span>
                          {item.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </aside>

          {/* Main Settings Content */}
          <div className="settings-main">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
