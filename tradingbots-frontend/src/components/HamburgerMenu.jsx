import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './HamburgerMenu.css';

function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const navigateTo = (path) => {
    navigate(path);
    closeMenu();
  };

  const menuItems = [
    { label: 'TradingBots', path: '/tradingbots' },
    { label: 'Portfolio', path: '/portfolio' },
    { label: 'Markets', path: '/markets' },
  ];

  return (
    <>
      {/* Hamburger Button */}
      <button 
        className={`hamburger-button ${isOpen ? 'active' : ''}`}
        onClick={toggleMenu}
        aria-label="Menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div className="menu-overlay" onClick={closeMenu}></div>
      )}

      {/* Side Menu */}
      <div className={`side-menu ${isOpen ? 'open' : ''}`}>
        <nav className="side-menu-nav">
          {menuItems.map((item) => (
            <button
              key={item.path}
              className={`menu-item ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => navigateTo(item.path)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}

export default HamburgerMenu;
