# PROJEKTSAMMANFATTNING: CryptoBot Trading Platform
## För migration till Java och React

---

## **PROJEKTÖVERSIKT**

En webbaserad kryptovaluta trading bot-plattform med följande kärnfunktioner:

1. **Användarautentisering & Session Management**
2. **Portfolio Management** 
3. **Trading Bot System** med backtesting
4. **Historisk Marknadsdata** (OHLCV candlesticks)
5. **Live Trading Automation**

---

## **DATABASSCHEMA (SQL Server → PostgreSQL/MySQL för Java)**

### **Huvudtabeller:**

#### 1. **Users**
```sql
- Id (BIGINT, PK, AUTO_INCREMENT)
- Username (VARCHAR, UNIQUE)
- Email (VARCHAR, UNIQUE)
- PasswordHash (VARCHAR)
- CreatedAt, UpdatedAt (TIMESTAMP)
```

#### 2. **DigitalAssets**
```sql
- Id (BIGINT, PK)
- Symbol (VARCHAR, UNIQUE) // BTC, ETH, etc.
- Name (VARCHAR)
- Description (TEXT)
```

#### 3. **Portfolios**
```sql
- Id (BIGINT, PK)
- UserId (FK → Users)
- Name (VARCHAR)
- Description (TEXT)
- CreatedAt, UpdatedAt
```

#### 4. **PortfolioItems**
```sql
- Id (BIGINT, PK)
- PortfolioId (FK → Portfolios, CASCADE)
- DigitalAssetId (FK → DigitalAssets)
- Quantity (DECIMAL(18,8))
- PurchasePrice (DECIMAL(18,8))
- PurchaseDate (TIMESTAMP)
- Notes (TEXT)
```

#### 5. **TradingBots** (Bot Templates)
```sql
- BotId (BIGINT, PK)
- Name (VARCHAR)
- Strategy (VARCHAR) // "DCA", "GridTrading", etc.
- Description (TEXT)
- Created (TIMESTAMP)
```

#### 6. **UserBots** (User instances of bots)
```sql
- UserBotId (BIGINT, PK)
- UserId (FK → Users)
- BotId (FK → TradingBots)
- Name (VARCHAR)
- Status (VARCHAR) // "Active", "Paused", "Stopped"
- LastRun (TIMESTAMP)
- NextExecutionTime (TIMESTAMP) // För automation
- Created (TIMESTAMP)
```

#### 7. **BotConfigurations**
```sql
- ConfigId (BIGINT, PK)
- UserBotId (FK → UserBots, UNIQUE)
- Parameters (JSON/TEXT) // Flexibel konfiguration
- CreatedAt, UpdatedAt
```

**Exempel på DCA Bot Configuration JSON:**
```json
{
  "TargetAsset": "BTC",
  "InvestmentAmount": 100.00,
  "Frequency": "Weekly",
  "DayOfWeek": "Monday",
  "MaxTotalInvestment": 10000.00,
  "EnableSmartDCA": true,
  "SmartDCAThreshold": -5.0
}
```

#### 8. **TradingSessions** (Backtest/Live runs)
```sql
- SessionId (BIGINT, PK)
- UserBotId (FK → UserBots)
- StartTime, EndTime (TIMESTAMP)
- Mode (VARCHAR) // "Backtest", "Paper Trade", "Live"
- InitialBalance (DECIMAL)
- FinalBalance (DECIMAL)
- Status (VARCHAR) // "Running", "Completed", "Failed"
```

#### 9. **Trades** (Individual transactions)
```sql
- TradeId (BIGINT, PK)
- SessionId (FK → TradingSessions)
- Symbol (VARCHAR)
- TradeType (VARCHAR) // "Buy", "Sell"
- Quantity (DECIMAL)
- Price (DECIMAL)
- TotalValue (DECIMAL)
- Timestamp (TIMESTAMP)
- Notes (TEXT)
```

#### 10. **PerformanceMetrics**
```sql
- MetricId (BIGINT, PK)
- SessionId (FK → TradingSessions, UNIQUE)
- TotalTrades (INT)
- ROI (DECIMAL) // Return on Investment %
- ProfitLoss (DECIMAL)
- CalculatedAt (TIMESTAMP)
```

#### 11. **MarketData** (OHLCV historisk data)
```sql
- Id (BIGINT, PK)
- Symbol (VARCHAR)
- TimeFrame (VARCHAR) // "1d", "1h", "15m"
- OpenTime, CloseTime (TIMESTAMP)
- OpenPrice, HighPrice, LowPrice, ClosePrice (DECIMAL(18,8))
- Volume (DECIMAL)
- CreatedAt (TIMESTAMP)
- INDEX på (Symbol, OpenTime)
```

---

## **BACKEND ARKITEKTUR (Java Spring Boot)**

### **Tech Stack:**
- **Framework:** Spring Boot 3.x
- **ORM:** Spring Data JPA / Hibernate
- **Database:** PostgreSQL eller MySQL
- **Security:** Spring Security (JWT tokens)
- **Scheduled Tasks:** Spring @Scheduled
- **REST API:** Spring Web MVC

### **Projekt Struktur:**
```
src/main/java/com/cryptobot/
├── config/
│   ├── SecurityConfig.java
│   ├── JwtAuthenticationFilter.java
│   └── SchedulerConfig.java
├── controller/
│   ├── AuthController.java
│   ├── PortfolioController.java
│   ├── TradingBotController.java
│   └── MarketDataController.java
├── model/
│   ├── User.java
│   ├── Portfolio.java, PortfolioItem.java
│   ├── TradingBot.java, UserBot.java
│   ├── BotConfiguration.java
│   ├── TradingSession.java, Trade.java
│   ├── PerformanceMetric.java
│   └── MarketData.java
├── repository/
│   ├── UserRepository.java
│   ├── PortfolioRepository.java
│   ├── TradingBotRepository.java
│   └── MarketDataRepository.java
├── service/
│   ├── AuthenticationService.java
│   ├── PortfolioService.java
│   ├── TradingBotService.java
│   ├── BacktestingService.java
│   ├── BtcPriceService.java (CoinGecko API)
│   └── LiveTradingScheduler.java
├── dto/
│   ├── LoginRequest.java, RegisterRequest.java
│   ├── PortfolioDTO.java
│   └── BotConfigurationDTO.java
└── security/
    ├── JwtTokenProvider.java
    └── UserDetailsServiceImpl.java
```

### **Viktiga Services:**

#### **1. AuthenticationService**
```java
@Service
public class AuthenticationService {
    - registerUser(RegisterRequest)
    - authenticateUser(LoginRequest) → returns JWT
    - validateToken(String token)
}
```

#### **2. TradingBotService**
```java
@Service
public class TradingBotService {
    - executeBotStrategy(Long userBotId)
    - executeDcaStrategy(...) // DCA logic
    - calculateNextExecutionTime(BotConfig, DateTime)
    - checkBudgetAndPause(userBotId, sessionId)
}
```

#### **3. BacktestingService**
```java
@Service
public class BacktestingService {
    - runHistoricalBacktest(userBotId, startDate, endDate)
    - getHistoricalPrice(symbol, date) // från MarketData
    - calculatePerformanceMetrics(sessionId)
    - getAvailableDataRange(symbol)
}
```

#### **4. LiveTradingScheduler**
```java
@Service
public class LiveTradingScheduler {
    @Scheduled(fixedRate = 60000) // varje minut
    public void executeActiveBots() {
        List<UserBot> activeBots = findBotsReadyToExecute();
        for(UserBot bot : activeBots) {
            tradingBotService.executeBotStrategy(bot.getId());
        }
    }
}
```

#### **5. BtcPriceService** (External API)
```java
@Service
public class BtcPriceService {
    private RestTemplate restTemplate;
    
    public BigDecimal getLivePrice(String symbol) {
        // Call CoinGecko API
        return price;
    }
}
```

---

## **FRONTEND ARKITEKTUR (React)**

### **Tech Stack:**
- **Framework:** React 18+
- **State Management:** Redux Toolkit eller Zustand
- **Routing:** React Router v6
- **HTTP Client:** Axios
- **UI Library:** Material-UI (MUI) eller TailwindCSS
- **Charts:** Recharts eller Chart.js
- **Forms:** React Hook Form + Yup validation

### **Projekt Struktur:**
```
src/
├── components/
│   ├── auth/
│   │   ├── LoginForm.jsx
│   │   └── RegisterForm.jsx
│   ├── portfolio/
│   │   ├── PortfolioList.jsx
│   │   ├── AddPortfolioItem.jsx
│   │   └── PortfolioSummary.jsx
│   ├── tradingBot/
│   │   ├── BotTemplateList.jsx
│   │   ├── CreateBotInstance.jsx
│   │   ├── BotConfigurationForm.jsx
│   │   ├── BacktestForm.jsx
│   │   └── TradingSessionList.jsx
│   └── common/
│       ├── Navbar.jsx
│       └── ProtectedRoute.jsx
├── pages/
│   ├── LoginPage.jsx
│   ├── PortfolioPage.jsx
│   └── TradingBotPage.jsx
├── services/
│   ├── api.js (axios instance)
│   ├── authService.js
│   ├── portfolioService.js
│   └── tradingBotService.js
├── store/
│   ├── authSlice.js
│   ├── portfolioSlice.js
│   └── botSlice.js
├── utils/
│   ├── authToken.js
│   └── formatters.js
└── App.jsx
```

### **Viktiga Komponenter:**

#### **1. TradingBotPage.jsx**
```jsx
// Visar 3 sektioner:
- Available Bot Templates
- My Active Bots (UserBots)
- Trading Sessions History
```

#### **2. BotConfigurationForm.jsx**
```jsx
// Dynamisk form baserat på bot strategy
- För "DCA": Target Asset, Amount, Frequency, Smart DCA settings
- JSON serialization för Parameters-fältet
```

#### **3. BacktestForm.jsx**
```jsx
// Inputs:
- Select UserBot
- Start Date, End Date (validering mot MarketData range)
- Initial Balance
// Submit → POST /api/tradingbot/backtest
```

---

## **REST API ENDPOINTS**

### **Authentication**
```
POST /api/auth/register
POST /api/auth/login → returns JWT
GET  /api/auth/me (requires JWT)
```

### **Portfolio**
```
GET    /api/portfolio
POST   /api/portfolio/add
PUT    /api/portfolio/edit/{id}
DELETE /api/portfolio/delete/{id}
GET    /api/portfolio/summary
```

### **Trading Bots**
```
GET  /api/tradingbot/templates
GET  /api/tradingbot/my-bots
POST /api/tradingbot/create-instance
PUT  /api/tradingbot/configure/{userBotId}
POST /api/tradingbot/start/{userBotId}
POST /api/tradingbot/pause/{userBotId}
POST /api/tradingbot/backtest
GET  /api/tradingbot/sessions
GET  /api/tradingbot/session/{id}/trades
GET  /api/tradingbot/data-range/{symbol}
```

### **Market Data**
```
GET /api/market/live-price/{symbol}
GET /api/market/history/{symbol}?from=&to=
```

---

## **KÄRNFUNKTIONALITET**

### **1. DCA (Dollar Cost Averaging) Strategy**
- Köper fast belopp på schemalagda intervaller
- Stöd för "Smart DCA" (köper extra vid prisfall)
- Budget tracking (pausar vid max investment)
- NextExecutionTime beräkning (veckodag, frekvens)

### **2. Backtesting Engine**
- Använder historisk MarketData
- Simulerar köp/sälj över tidsperiod
- Beräknar ROI, Profit/Loss, antal trades
- Jämför strategier

### **3. Live Trading Automation**
- Background scheduler körs varje minut
- Kontrollerar UserBots där `NextExecutionTime <= now()`
- Exekverar bot strategy
- Uppdaterar NextExecutionTime för nästa körning

### **4. Portfolio Tracking**
- Visar total investering vs current value
- Hämtar live priser från CoinGecko API
- Beräknar gain/loss per tillgång

---

## **SÄKERHETSÖVERVÄGANDEN**

1. **JWT Authentication** (Spring Security)
2. **Password Hashing** (BCrypt)
3. **CORS Configuration** (endast frontend URL)
4. **Input Validation** (Bean Validation annotations)
5. **SQL Injection Protection** (JPA/Hibernate)
6. **Rate Limiting** för API calls

---

## **DEPLOYMENT ÖVERVÄGANDEN**

### **Backend:**
- Dockerize Spring Boot app
- Environment variables för DB connection, JWT secret
- Railway/Render/AWS deployment

### **Frontend:**
- Build optimized React app
- Deploy till Vercel/Netlify
- Environment variables för API_BASE_URL

### **Database:**
- PostgreSQL managed instance (Supabase, Railway)
- Initial migration scripts
- Backup strategy

---

## **NÄSTA STEG FÖR IMPLEMENTATION**

1. **Setup Spring Boot projekt** med dependencies
2. **Skapa database schema** i PostgreSQL
3. **Implementera JPA Entities** och Repositories
4. **Bygg Authentication** med JWT
5. **Implementera Portfolio CRUD**
6. **Bygg Trading Bot system** (steg för steg)
7. **Setup React projekt** med routing
8. **Integrera API calls** med Axios
9. **Implementera UI komponenter**
10. **Testing** och deployment

---

## **SAMMANFATTNING AV NUVARANDE C# PROJEKT**

### **Program.cs (ASP.NET Core Configuration)**
- Cookie-based authentication
- Entity Framework Core med SQL Server
- Dependency Injection för alla services
- Background service för live trading automation
- Localization satt till en-US för decimal parsing

### **Services registrerade:**
- `IPortfolioService` - Portfolio CRUD operations
- `IBtcPriceService` - Live pris från CoinGecko
- `IAuthenticationService` - User login/register
- `IBotConfigurationService` - JSON config management
- `ITradingBotDAL` - Database access layer
- `ITradingBotService` - Bot execution logic
- `IBacktestingService` - Historical simulation
- `LiveTradingBackgroundService` - Scheduled bot execution

### **Authentication:**
- Cookie-based med 30 min sliding expiration
- Login path: `/Account/Login`
- Default route: Account/Login

### **Key Features implementerade:**
1. User registration/login med hashed passwords
2. Portfolio management (köp/sälj tracking)
3. Trading bot templates och user instances
4. JSON-baserad bot configuration
5. DCA strategy med Smart DCA
6. Backtesting med historisk MarketData
7. Live automation via background service
8. Performance metrics (ROI, profit/loss)

---

**Denna sammanfattning ger dig all information du behöver för att återskapa projektet i Java Spring Boot + React!**
