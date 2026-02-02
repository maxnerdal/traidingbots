import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './UserAvatar.css';

function UserAvatar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const getInitials = () => {
    if (!user) return '?';
    
    const firstName = user.firstName || '';
    const lastName = user.lastName || '';
    
    if (firstName && lastName) {
      return `${firstName[0]}${lastName[0]}`.toUpperCase();
    } else if (user.email) {
      return user.email[0].toUpperCase();
    }
    return '?';
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleMenuClick = (action) => {
    setIsMenuOpen(false);
    if (action === 'profile') {
      navigate('/profile');
    } else if (action === 'settings') {
      navigate('/settings');
    } else if (action === 'logout') {
      handleLogout();
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div className="user-avatar-container" ref={menuRef}>
      <button className="user-avatar" onClick={toggleMenu} aria-label="User menu">
        <span className="avatar-initials">{getInitials()}</span>
      </button>

      {isMenuOpen && (
        <div className="user-menu-dropdown">
          <div className="user-menu-header">
            <div className="user-menu-email">{user?.email}</div>
          </div>
          <div className="user-menu-divider"></div>
          <button className="user-menu-item" onClick={() => handleMenuClick('profile')}>
            Profil
          </button>
          <button className="user-menu-item" onClick={() => handleMenuClick('settings')}>
            Inställningar
          </button>
          <div className="user-menu-divider"></div>
          <button className="user-menu-item danger" onClick={() => handleMenuClick('logout')}>
            Logga ut
          </button>
        </div>
      )}
    </div>
  );
}

export default UserAvatar;
