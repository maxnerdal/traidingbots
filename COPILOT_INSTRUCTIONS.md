# Copilot Instructions - Crypto Portfolio Project

**Skapad:** 27 januari 2026  
**Syfte:** Instruktioner för AI-assistenten om hur den ska arbeta med detta projekt

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
├── crypto-portfolio-backend/         ← Spring Boot backend
│   ├── src/main/java/com/cryptoportfolio/
│   ├── src/main/resources/
│   ├── pom.xml
│   └── .gitignore
│
└── crypto-portfolio-frontend/        ← React frontend
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
cd crypto-portfolio-backend
mvn clean install          # Bygg projekt
mvn spring-boot:run        # Starta backend (port 8080)
mvn test                   # Kör tester
```

### Frontend
```bash
cd crypto-portfolio-frontend
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
- **Entities:** `User.java`, `Portfolio.java` (singular, PascalCase)
- **Repositories:** `UserRepository.java` (PascalCase + Repository)
- **Services:** `AuthService.java` (PascalCase + Service)
- **Controllers:** `AuthController.java` (PascalCase + Controller)
- **DTOs:** `LoginRequest.java`, `AuthResponse.java` (PascalCase + Request/Response)
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

**Nästa: Fas 2 - Authentication**
- User entity
- Spring Security
- JWT implementation
- Login/Register

---

**Kom ihåg:** När i tvivel, UTFORSKA FÖRST! 🔍
