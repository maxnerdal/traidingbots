# Crypto Portfolio - Projektplan & Checklista
**Skapad:** 26 januari 2026  
**Senast uppdaterad:** 26 januari 2026

---

## 📋 PROJEKTFASER - ÖVERSIKT

### ✅ Fas 0: Projektplanering
- [x] Analysera befintligt .NET TradingBots-projekt
- [x] Skapa projektsammanfattning med alla funktioner
- [x] Sätta upp projektstruktur och dokumentation
- [x] **Beslut: Godkänn vilka features som ska inkluderas**
- [x] **Beslut: Välj databas (PostgreSQL/MySQL/H2)**
- [x] **Beslut: Bekräfta frontend-ramverk (React föreslaget)**

### ✅ Fas 1: Grundläggande Setup
- [x] Setup av backend-projekt (Spring Boot)
- [x] Setup av frontend-projekt (React)
- [x] Konfigurera databaskoppling
- [x] Setup av grundläggande projektstruktur
- [x] Git repository setup
- [x] **BACKUP-PUNKT 1**

### ✅ Fas 2A: Användarautentisering - Backend
- [x] Database schema för Users (User entity, Role enum)
- [x] Spring Security konfiguration (SecurityConfig)
- [x] JWT token implementation (JwtUtil, JwtRequestFilter)
- [x] UserDetailsService implementation
- [x] Registrera användare endpoint (POST /api/auth/register)
- [x] Login endpoint (POST /api/auth/login)
- [x] Skyddad endpoint för test (GET /api/user/me)
- [x] Testa autentisering med curl
- [x] **BACKUP-PUNKT 2A**

### ⬜ Fas 2B: Användarautentisering - Frontend
- [ ] AuthContext för global state
- [ ] Login-formulär komponent
- [ ] Registrerings-formulär komponent
- [ ] Token management (localStorage)
- [ ] Axios interceptor för JWT
- [ ] Protected routes i React Router
- [ ] Logout-funktionalitet
- [ ] Testa autentisering end-to-end
- [ ] **BACKUP-PUNKT 2B**

### ⬜ Fas 3: Portfolio Management (Grundläggande)
- [ ] Database schema: DigitalAssets, Portfolios, PortfolioItems
- [ ] Backend: CRUD för portfolios
- [ ] Backend: CRUD för portfolio items
- [ ] Frontend: Visa portfolios
- [ ] Frontend: Lägg till/ta bort portfolio items
- [ ] Frontend: Visa portfolio-sammanfattning
- [ ] Testa portfolio-funktionalitet
- [ ] **BACKUP-PUNKT 3**

### ⬜ Fas 4: Marknadsdata & Prisintegration
- [ ] Database schema: MarketData
- [ ] Integrera med CoinGecko API (eller annat API)
- [ ] Service för att hämta live-priser
- [ ] Service för historisk data (OHLCV)
- [ ] Frontend: Visa aktuella priser
- [ ] Frontend: Prishistorik diagram
- [ ] Cachning av marknadsdata
- [ ] **BACKUP-PUNKT 4**

### ⬜ Fas 5: Trading Bot System - Grundstruktur
- [ ] Database schema: TradingBots, UserBots, BotConfigurations
- [ ] Backend: Bot templates (endast DCA först?)
- [ ] Backend: Skapa user bot instances
- [ ] Backend: Bot configuration management
- [ ] Frontend: Lista tillgängliga bot templates
- [ ] Frontend: Skapa bot instance
- [ ] Frontend: Konfigurera bot (DCA settings)
- [ ] **BACKUP-PUNKT 5**

### ⬜ Fas 6: Backtesting System
- [ ] Database schema: TradingSessions, Trades, PerformanceMetrics
- [ ] Backend: Backtesting service
- [ ] Backend: Historisk data retrieval
- [ ] Backend: Performance metrics beräkning
- [ ] Frontend: Backtest form
- [ ] Frontend: Visa backtest resultat
- [ ] Frontend: Visa trades från session
- [ ] Frontend: Performance metrics visning
- [ ] **BACKUP-PUNKT 6**

### ⬜ Fas 7: Live Trading Automation
- [ ] Backend: Scheduled task system (@Scheduled)
- [ ] Backend: Live trading execution logic
- [ ] Backend: Bot status management (Active/Paused/Stopped)
- [ ] Backend: Next execution time calculation
- [ ] Backend: Budget check och auto-pause
- [ ] Frontend: Start/Stop/Pause bot controls
- [ ] Frontend: Live trading status visning
- [ ] Frontend: Next execution countdown
- [ ] Säkerhet: Confirm dialogs för live trading
- [ ] **BACKUP-PUNKT 7**

### ⬜ Fas 8: Advanced Features (Om tid/önskemål)
- [ ] Fler bot strategies (Grid Trading, etc.)
- [ ] Paper trading mode
- [ ] Email notifications
- [ ] Portfolio analytics & rapporter
- [ ] Export/import funktionalitet
- [ ] **BACKUP-PUNKT 8**

### ⬜ Fas 9: Polish & Deploy
- [ ] Error handling förbättringar
- [ ] Loading states och UX polish
- [ ] Responsive design optimering
- [ ] Security audit
- [ ] Performance optimering
- [ ] Deploy setup (Docker?)
- [ ] **SLUTLIG BACKUP**

---

## 🎯 NUVARANDE FOKUS

**Aktuell Fas:** Fas 1 - Grundläggande Setup  
**Nästa Steg:** 
1. Setup av Spring Boot backend-projekt
2. Konfigurera PostgreSQL databaskoppling
3. Setup av React frontend-projekt
4. Verifiera att allt fungerar

---

## 📊 FEATURE PRIORITERING

### 🔴 Must-Have (Kärnfunktionalitet)
- [ ] Användarautentisering
- [ ] Portfolio management
- [ ] Live priser från API
- [ ] DCA Bot med backtesting
- [ ] Live trading automation

### 🟡 Should-Have (Viktiga men inte kritiska)
- [ ] Historisk marknadsdata (OHLCV)
- [ ] Performance metrics & visualisering
- [ ] Paper trading mode
- [ ] Fler bot strategies

### 🟢 Could-Have (Nice to have)
- [ ] Email notifications
- [ ] Advanced analytics
- [ ] Export/Import
- [ ] Mobile responsiveness

### ⚪ Won't-Have (För denna version)
- [ ] Real exchange integration (Binance/Kraken API)
- [ ] Mobile app
- [ ] Social features

---

## 🛠️ TEKNISKA BESLUT

### Backend
- **Framework:** ✅ Spring Boot 3.x
- **Databas:** ✅ PostgreSQL
- **ORM:** ✅ Spring Data JPA / Hibernate
- **Security:** ✅ Spring Security + JWT
- **External API:** ✅ CoinGecko

### Frontend
- **Framework:** ✅ React 18+
- **State Management:** ⏳ TBD (Redux Toolkit/Zustand)
- **UI Library:** ⏳ TBD (Material-UI/TailwindCSS)
- **Charts:** ⏳ TBD (Recharts/Chart.js)

---

## 📝 MILESTOLPAR

| Milstolpe | Beskrivning | Målstatus | Faktisk Status |
|-----------|-------------|-----------|----------------|
| M1 | Projektplanering klar | Fas 0 slutförd | ✅ Slutförd |
| M2 | Setup & Auth fungerande | Fas 2 slutförd | ⬜ Ej påbörjad |
| M3 | Portfolio + Priser | Fas 4 slutförd | ⬜ Ej påbörjad |
| M4 | Bot System + Backtest | Fas 6 slutförd | ⬜ Ej påbörjad |
| M5 | Live Trading | Fas 7 slutförd | ⬜ Ej påbörjad |
| M6 | Production Ready | Fas 9 slutförd | ⬜ Ej påbörjad |

---

## ⚠️ RISKER & BLOCKERARE

- **API Rate Limits:** CoinGecko free tier kan ha begränsningar
- **Databas Choice:** Måste bestämmas innan Fas 1
- **Frontend Tech:** Måste bestämmas innan Fas 1
- **Testing Strategy:** Bör planeras tidigt

---

## 💾 BACKUP-PUNKTER

Backups ska göras efter varje slutförd fas:
1. Efter Fas 1 (Setup)
2. Efter Fas 2 (Auth)
3. Efter Fas 3 (Portfolio)
4. Efter Fas 4 (Marknadsdata)
5. Efter Fas 5 (Bot Grundstruktur)
6. Efter Fas 6 (Backtesting)
7. Efter Fas 7 (Live Trading)
8. Efter Fas 8 (Advanced Features)
9. Efter Fas 9 (Final)

**Backup-metod:** Git tags + commits med tydlig märkning
