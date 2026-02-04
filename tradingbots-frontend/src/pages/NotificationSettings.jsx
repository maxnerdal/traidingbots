import React, { useState } from 'react';
import '../styles/NotificationSettings.css';

const NotificationSettings = () => {
  const [settings, setSettings] = useState({
    emailNotifications: {
      priceAlerts: true,
      portfolioUpdates: true,
      weeklyReport: false,
      tradingBotAlerts: true,
      systemUpdates: false
    },
    pushNotifications: {
      priceAlerts: false,
      portfolioUpdates: false,
      tradingBotAlerts: false
    }
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleToggle = (category, setting) => {
    setSettings({
      ...settings,
      [category]: {
        ...settings[category],
        [setting]: !settings[category][setting]
      }
    });
  };

  const handleSave = () => {
    setMessage({ type: 'info', text: 'Saving preferences...' });
    
    // TODO: API call to save notification settings
    setTimeout(() => {
      setMessage({ type: 'success', text: 'Notification preferences saved!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    }, 1000);
  };

  return (
    <div className="notification-settings">
      <div className="settings-header">
        <h1>Notifications</h1>
        <p className="settings-subtitle">Choose what updates you want to receive</p>
      </div>

      {message.text && (
        <div className={`settings-message ${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="settings-section">
        <h2 className="section-title">Email Notifications</h2>
        <p className="section-description">
          Receive email updates about your portfolio and trading activity
        </p>
        
        <div className="notification-list">
          <div className="notification-item">
            <div className="notification-info">
              <h3>Price Alerts</h3>
              <p>Get notified when assets reach your target prices</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={settings.emailNotifications.priceAlerts}
                onChange={() => handleToggle('emailNotifications', 'priceAlerts')}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>

          <div className="notification-item">
            <div className="notification-info">
              <h3>Portfolio Updates</h3>
              <p>Daily summary of your portfolio performance</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={settings.emailNotifications.portfolioUpdates}
                onChange={() => handleToggle('emailNotifications', 'portfolioUpdates')}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>

          <div className="notification-item">
            <div className="notification-info">
              <h3>Weekly Report</h3>
              <p>Comprehensive weekly portfolio analysis</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={settings.emailNotifications.weeklyReport}
                onChange={() => handleToggle('emailNotifications', 'weeklyReport')}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>

          <div className="notification-item">
            <div className="notification-info">
              <h3>Trading Bot Alerts</h3>
              <p>Updates about your automated trading bots</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={settings.emailNotifications.tradingBotAlerts}
                onChange={() => handleToggle('emailNotifications', 'tradingBotAlerts')}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>

          <div className="notification-item">
            <div className="notification-info">
              <h3>System Updates</h3>
              <p>Important system announcements and maintenance notices</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={settings.emailNotifications.systemUpdates}
                onChange={() => handleToggle('emailNotifications', 'systemUpdates')}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>
      </div>

      <div className="settings-section">
        <h2 className="section-title">Push Notifications</h2>
        <p className="section-description">
          Receive instant notifications on your devices
        </p>
        
        <div className="notification-list">
          <div className="notification-item">
            <div className="notification-info">
              <h3>Price Alerts</h3>
              <p>Instant alerts for significant price movements</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={settings.pushNotifications.priceAlerts}
                onChange={() => handleToggle('pushNotifications', 'priceAlerts')}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>

          <div className="notification-item">
            <div className="notification-info">
              <h3>Portfolio Updates</h3>
              <p>Critical portfolio changes</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={settings.pushNotifications.portfolioUpdates}
                onChange={() => handleToggle('pushNotifications', 'portfolioUpdates')}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>

          <div className="notification-item">
            <div className="notification-info">
              <h3>Trading Bot Alerts</h3>
              <p>Immediate alerts for bot activity</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={settings.pushNotifications.tradingBotAlerts}
                onChange={() => handleToggle('pushNotifications', 'tradingBotAlerts')}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>
      </div>

      <div className="form-actions">
        <button onClick={handleSave} className="btn-primary">
          Save Preferences
        </button>
      </div>
    </div>
  );
};

export default NotificationSettings;
