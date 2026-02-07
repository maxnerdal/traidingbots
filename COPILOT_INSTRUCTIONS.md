# Copilot Instructions - Crypto Portfolio Project

**Skapad:** 27 januari 2026  
**Syfte:** Instruktioner för AI-assistenten om hur den ska arbeta med detta projekt

---

## 🚨 CRITICAL - LOCAL DEVELOPMENT FILES 🚨

### ⛔ LOCALHOST CONFIGURATION - DO NOT COMMIT ⛔

**WARNING:** The following files are configured for local development and are in `.gitignore`:

- `/tradingbots-frontend/vite.config.js`
- `/tradingbots-frontend/src/context/AuthContext.jsx`
- `/tradingbots-frontend/src/services/portfolioService.js`
- `/tradingbots-frontend/src/services/cryptoMarketService.js`
- `/tradingbots-frontend/src/services/userService.js`

**These files contain:**
- API URL fallbacks set to `http://localhost:8080/api` instead of production URLs
- Modified `vite.config.js` without the `define` block
- Modified `.gitignore` to exclude themselves from version control

**⚠️ BEFORE PRODUCTION DEPLOYMENT:**
1. Remove these files from `.gitignore`
2. Change all API fallbacks from `http://localhost:8080/api` to `https://traidingbots-production.up.railway.app/api`
3. Re-add the `define` block to `vite.config.js`:
   ```javascript
   define: {
     'import.meta.env.VITE_API_URL': JSON.stringify(
       process.env.VITE_API_URL || 'https://traidingbots-production.up.railway.app/api'
     )
   }
   ```
4. Commit and deploy

**WHY:** This setup allows local development without `.env.local` file while preventing accidental commits of localhost configuration to production.

---

## 🎯 Arbetsprinciper

### 1. **Utforska ALLTID före åtgärd**
- ✅ Använd `list_dir` för att se vilka filer som finns
- ✅ Använd `read_file` för att läsa befintliga filer INNAN du redigerar
- ✅ Använd `grep_search` eller `semantic_search` för att hitta befintlig kod
- ❌ Anta ALDRIG att du vet projektets nuvarande tillstånd baserat på workspace context

### 2. **Verifiera innan du skapar nya filer**
```bash
# Kolla först om filen redan finns
1. list_dir i målmappen
2. Om filen finns → read_file och föreslå uppdateringar
3. Om filen inte finns → skapa ny fil
```

### 3. **Läs HELA filer vid större ändringar**
- Läs minst 50-100 rader context vid editeringar
- Använd `multi_replace_string_in_file` för flera ändringar
- Inkludera 3-5 rader före/efter vid replace

### 4. **Dokumentera i IMPLEMENTATION_LOG.md**
- Uppdatera loggen efter varje större implementation
- Var pedagogisk - förklara VAD, VARFÖR, HUR
- Inkludera alternativ och jämförelser

---

## 📁 Projektstruktur

```
E-hälsomyndigheten/
├── COPILOT_INSTRUCTIONS.md          ← Denna fil
├── IMPLEMENTATION_LOG.md             ← Detaljerad implementationslogg
├── PROJECT_PLAN.md                   ← Projektplan med faser
├── PROJECT_NOTES.md                  ← Anteckningar
├── PROJEKTSAMMANFATTNING.md          ← Översikt
│
├── tradingbots-backend/         ← Spring Boot backend
│   ├── src/main/java/com/cryptoportfolio/
│   ├── src/main/resources/
│   ├── pom.xml
│   └── .gitignore
│
└── tradingbots-frontend/        ← React frontend
    ├── src/
    ├── package.json
    └── .gitignore
```

---

## 🛠️ Teknisk Stack

### Backend
- **Java 17** (LTS)
- **Spring Boot 3.2.1**
- **PostgreSQL 14** (native installation, inte Docker)
- **Maven** för build management
- **Embedded Tomcat** (port 8080)
- **⚠️ INGEN Lombok** - Alla klasser använder manuella getters/setters (Lombok annotation processing gav problem)

### Frontend
- **React 18+**
- **Vite** (dev server + build tool)
- **Axios** för HTTP requests
- **React Router** för routing

### Databas
- **PostgreSQL 14**
- Körs som macOS service: `brew services start postgresql@14`
- Databas: `tradingbots`
- User: `maxnerdal`
- Password: (tom)

---

## 🚀 Körkommandon

### Backend
```bash
cd tradingbots-backend
mvn clean install          # Bygg projekt
mvn spring-boot:run        # Starta backend (port 8080)
mvn test                   # Kör tester
```

### Frontend
```bash
cd tradingbots-frontend
npm install                # Installera dependencies
npm run dev                # Starta dev server (port 5173)
npm run build              # Bygg för production
```

### PostgreSQL
```bash
brew services start postgresql@14
brew services stop postgresql@14
/opt/homebrew/opt/postgresql@14/bin/psql tradingbots
```

---

## ✅ Workflow för implementation

### När du ska implementera en feature:

1. **Läs PROJECT_PLAN.md**
   - Se vilken fas vi är i
   - Kolla vad som är klart vs inte klart

2. **Utforska befintlig kod**
   ```
   - list_dir för att se struktur
   - read_file för relevanta filer
   - grep_search för liknande implementationer
   ```

3. **Skapa todo-list**
   ```
   - Använd manage_todo_list
   - Bryt ner feature i konkreta steg
   - Markera status: not-started → in-progress → completed
   ```

4. **Implementera steg för steg**
   ```
   - Markera todo som in-progress
   - Skapa/uppdatera filer
   - Testa (om möjligt)
   - Markera todo som completed
   ```

5. **Dokumentera**
   ```
   - Uppdatera IMPLEMENTATION_LOG.md
   - Förklara pedagogiskt vad som gjordes
   - Inkludera kod-exempel och alternativ
   ```

6. **Verifiera**
   ```
   - Kör backend/frontend för att se att det fungerar
   - Använd get_errors för att kolla kompileringsfel
   - Test med curl eller i browser
   ```

---

## 💬 Kommunikationsstil

### För användaren:
- **Kortfattat:** 1-3 meningar för enkla svar
- **Tydligt:** Förklara VAD du gör, inte bara ATT du gör det
- **Pedagogiskt:** Förklara VARFÖR när det är relevant
- **Inga onödiga fraser:** Skippa "Här kommer...", "Jag ska nu..."

### I IMPLEMENTATION_LOG.md:
- **Detaljerat:** Djupa förklaringar
- **Jämförelser:** Alternativ och trade-offs
- **Exempel:** Kod före/efter, use cases
- **Pedagogiskt:** Lär ut koncept samtidigt

---

## 🔍 Viktiga påminnelser

### ALDRIG:
- ❌ Skapa filer som redan finns utan att läsa dem först
- ❌ Anta projektstruktur baserat på workspace context
- ❌ Ignorera .gitignore filer som redan finns
- ❌ Använda Docker (vi kör native installations)
- ❌ Glömma att uppdatera IMPLEMENTATION_LOG.md efter implementationer
- ❌ **ANVÄND LOMBOK** - Alla klasser ska ha manuella getters/setters och constructors
- ❌ Använd double/float för finansiella värden - använd alltid BigDecimal

### ALLTID:
- ✅ Använd tools för att utforska innan åtgärd
- ✅ Läs befintlig kod innan redigering
- ✅ Använd multi_replace_string_in_file för flera edits
- ✅ Inkludera tillräcklig context (3-5 rader) vid replace
- ✅ Dokumentera pedagogiskt i IMPLEMENTATION_LOG.md
- ✅ Verifiera med get_errors efter kodändringar
- ✅ Uppdatera todo-list status löpande

### KOLLA FÖRST:
- 🔍 Finns filen redan? → `list_dir`
- 🔍 Vad innehåller filen? → `read_file`
- 🔍 Finns liknande kod? → `grep_search` / `semantic_search`
- 🔍 Är backend/frontend igång? → Fråga användaren
- 🔍 Finns kompileringsfel? → `get_errors`

---

## 🎓 Pedagogisk approach

Varje förklaring i IMPLEMENTATION_LOG.md ska innehålla:

1. **Vad:** Teknisk beskrivning
2. **Varför:** Motivering och use case
3. **Hur:** Implementationsdetaljer
4. **Alternativ:** Andra lösningar och jämförelser
5. **Exempel:** Konkret kod före/efter
6. **Best practices:** Tips och fallgropar

**Exempel-struktur:**
```markdown
### 1.X Feature namn

**Vad är X:**
[Teknisk förklaring]

**Hur X fungerar:**
[Arkitektur och koncept]

**Varför vi använder X:**
- Fördelar
- Use cases för projektet

**Alternativ:**
| Alt 1 | Alt 2 | Vårt val |
|-------|-------|----------|
| ...   | ...   | ...      |

**Implementation:**
[Kod-exempel]

**V årt val:**
[Motivering]
```

---

## 📝 Filnamn och konventioner

### Backend (Java):
- **Package struktur:** `com.tradingbots.entity`, `com.tradingbots.repository`, `com.tradingbots.service`, `com.tradingbots.controller`, `com.tradingbots.dto`, `com.tradingbots.security`
- **Entities:** `User.java`, `Portfolio.java`, `DigitalAsset.java` (singular, PascalCase)
  - ⚠️ **INGEN Lombok** - Manuella constructors (no-arg + all-args), getters och setters i ALLA klasser
  - Constructor injection: Manuella constructors istället för @RequiredArgsConstructor
- **Repositories:** `UserRepository.java` (PascalCase + Repository)
- **Services:** `AuthService.java` (PascalCase + Service)
- **Controllers:** `AuthController.java` (PascalCase + Controller)
- **DTOs:** `LoginRequest.java`, `AuthResponse.java` (PascalCase + Request/Response)
  - ⚠️ **INGEN Lombok** - Manuella getters/setters även i DTOs
- **Config:** `SecurityConfig.java` (PascalCase + Config)
- **Utils:** `JwtUtil.java` (PascalCase + Util)

### Frontend (React):
- **Components:** `LoginForm.jsx`, `Portfolio.jsx` (PascalCase)
- **Pages:** `LoginPage.jsx`, `DashboardPage.jsx` (PascalCase + Page)
- **Contexts:** `AuthContext.jsx` (PascalCase + Context)
- **Services:** `authService.js`, `apiService.js` (camelCase + Service)
- **Utils:** `formatters.js`, `validators.js` (camelCase)

---

## 🐛 Debugging workflow

1. **Kompileringsfel:**
   ```
   - Använd get_errors
   - Läs error messages
   - Fixa och verifiera
   ```

2. **Runtime errors:**
   ```
   - Kolla terminal output
   - Läs stack traces
   - Använd grep_search för att hitta problemkod
   ```

3. **API-test:**
   ```bash
   # Backend endpoints
   curl http://localhost:8080/api/health
   curl -X POST http://localhost:8080/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"password"}'
   ```

---

## 🎯 Nuvarande status

**Fas 1: ✅ KLAR**
- Backend setup
- Frontend setup
- PostgreSQL konfigurerad
- Health endpoint fungerar

**Fas 2: ✅ KLAR**
- User entity och authentication
- Spring Security konfiguration
- JWT implementation
- Login/Register endpoints

**Fas 3 Backend: ✅ KLAR**
- DigitalAsset, Portfolio, PortfolioItem entities
- Portfolio management endpoints
- Ownership validation i service layer
- KRITISK FIX: JwtRequestFilter sätter User entity som principal

**Nästa: Fas 3 Frontend**
- Portfolio dashboard
- Skapa/hantera portfolios
- Lägg till assets
- Visa innehav med priser

---

**Kom ihåg:** När i tvivel, UTFORSKA FÖRST! 🔍

---

## ⚠️ Kritiska Lärdomar från Fas 3

### 1. Lombok Problem
**Problem:** Maven compilation failures med Lombok annotations  
**Lösning:** ALDRIG använd Lombok - skriv alltid manuella getters/setters

**Template för entity:**
```java
@Entity
@Table(name = "example")
public class Example {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    
    // No-arg constructor
    public Example() {}
    
    // All-args constructor
    public Example(Long id, String name) {
        this.id = id;
        this.name = name;
    }
    
    // Manual getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}
```

### 2. @AuthenticationPrincipal NullPointerException Fix
**Problem:** `@AuthenticationPrincipal User user` returnerade null i controllers  
**Root Cause:** JwtRequestFilter satte UserDetails som principal, inte User entity

**KRITISK FIX i JwtRequestFilter:**
```java
@Component
public class JwtRequestFilter extends OncePerRequestFilter {
    private final UserRepository userRepository;  // MÅSTE INJICERAS!
    
    @Override
    protected void doFilterInternal(...) {
        if (jwtUtil.validateToken(jwt, userDetails)) {
            // Hämta User entity från databas
            User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
            
            // Sätt User entity som principal (INTE UserDetails!)
            UsernamePasswordAuthenticationToken authToken = 
                new UsernamePasswordAuthenticationToken(
                    user,  // User entity här!
                    null,
                    user.getRoles().stream()
                        .map(role -> new SimpleGrantedAuthority(role.name()))
                        .collect(Collectors.toList()));
            
            SecurityContextHolder.getContext().setAuthentication(authToken);
        }
    }
}
```

### 3. BigDecimal för Finansiella Värden
**Regel:** ALDRIG använd double eller float för pengar/quantities

```java
// RÄTT:
@Column(nullable = false, precision = 20, scale = 8)
private BigDecimal quantity;

@Column(name = "average_buy_price", precision = 20, scale = 2)
private BigDecimal averageBuyPrice;

// FEL:
private double quantity;  // ❌ Precision errors!
```

### 4. Ownership Validation i Service Layer
**Regel:** Validera ALLTID att användaren äger resursen

```java
private Portfolio getPortfolioById(Long id, Long userId) {
    Portfolio portfolio = portfolioRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Portfolio not found"));
    
    // KRITISK säkerhetskontroll
    if (!portfolio.getUser().getId().equals(userId)) {
        throw new RuntimeException("Unauthorized access to portfolio");
    }
    
    return portfolio;
}
```

### 5. JWT Token Management
**Problem:** Token går ut efter 24 timmar  
**Lösning:** 
```bash
# När token slutar fungera (403 Forbidden):
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@test.com","password":"password"}'

# Spara ny token
export TOKEN="nya_token_här"
```

### 6. Två-Terminal Setup för Testing
**Backend terminal:**
```bash
cd tradingbots-backend
export JAVA_HOME=/opt/homebrew/opt/openjdk@17
$JAVA_HOME/bin/java -jar target/tradingbots-backend-0.0.1-SNAPSHOT.jar
# Kör i foreground för att se logs
```

**Test terminal:**
```bash
# Sätt token
export TOKEN="din_jwt_token"

# Testa endpoints
curl http://localhost:8080/api/portfolios -H "Authorization: Bearer $TOKEN"
```

### 7. Cascade Operations och Unique Constraints
```java
// Portfolio → PortfolioItem
@OneToMany(mappedBy = "portfolio", cascade = CascadeType.ALL, orphanRemoval = true)
private List<PortfolioItem> items = new ArrayList<>();
// När portfolio raderas, raderas alla items automatiskt

// Förhindra duplicates på databas-nivå
@Table(name = "portfolio_items",
    uniqueConstraints = @UniqueConstraint(columnNames = {"portfolio_id", "digital_asset_id"}))
// En portfolio kan bara ha EN position av varje asset
```
