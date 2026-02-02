# Crypto Portfolio - Java/Spring Boot

## Projektstatus
**Datum:** 26 januari 2026  
**Status:** Fas 1 - Setup Slutförd ✅  
**Senast uppdaterad:** 26 januari 2026 kl 17:05

## Projektbeskrivning
Bygga ett crypto portfolio management system med Java Spring Boot backend och frontend.

## Arbetsmetodik
⚠️ **VIKTIGT:** Detta projekt ska byggas steg-för-steg
- Vi gör **EN SAK I TAGET**
- Vi **KOMMER ÖVERENS** innan vi går till nästa steg
- Vi **SPARAR BACKUP** efter varje lyckad del innan vi går vidare till nästa

## Teknisk Stack (Beslutad ✅)
- **Backend:** Java Spring Boot 3.2.1
- **Frontend:** React 18+ med Vite
- **Databas:** PostgreSQL 14
- **Databasnamn:** `tradingbots`
- **API:** CoinGecko (planerat)
- **Authentication:** Spring Security + JWT

## Projektstruktur
```
/Users/maxnerdal/Documents/E-hälsomyndigheten/
├── tradingbots-backend/
│   └── src/main/java/com/cryptoportfolio/
│   └── src/main/resources/
└── tradingbots-frontend/
```

## Referensprojekt
- Finns ett befintligt .NET TradingBots-projekt
- Dokumenterat i: `Projektrapport - TraidingBots.docx.pdf`
- PDF:en kunde inte läsas direkt (binärt format)
- **Nästa steg:** Få en sammanfattning av .NET-projektet för att informera Java-versionen

## Förslag på Utvecklingssteg (Ej bekräftade)
1. **Steg 1:** Användarautentisering och säkerhet
2. **Steg 2:** Crypto-priser (Databasstruktur + API-koppling + Frontend)
3. **Steg 3:** Portfolio-hantering
4. **Steg 4:** Utökade funktioner

## Genomförda Steg i Fas 1 (26 jan 2026)

### Installationer
✅ Node.js v25.4.0 och npm 11.7.0 - `brew install node`  
✅ Maven 3.9.12 - `brew install maven`  
✅ PostgreSQL 14 - `brew install postgresql@14`  
✅ PostgreSQL service startad - `brew services start postgresql@14`  
✅ Databas skapad - `createdb tradingbots`

### Backend Setup
✅ Spring Boot projekt skapat med dependencies:
- spring-boot-starter-web
- spring-boot-starter-data-jpa
- postgresql driver
- spring-boot-starter-security
- jjwt (JWT tokens)
- spring-boot-starter-validation
- lombok
- spring-boot-devtools

✅ Konfiguration i `application.properties`:
- Server port: 8080
- Database URL: `jdbc:postgresql://localhost:5432/tradingbots`
- Database user: `maxnerdal` (macOS användarnamn)
- Database password: (tom - lokal utveckling)
- Hibernate ddl-auto: update (auto-skapar tabeller)
- JWT secret och expiration konfigurerade

✅ Health check endpoint skapad: `/api/health`  
✅ Main application class med @SpringBootApplication och @EnableScheduling

### Frontend Setup
✅ React-projekt skapat med Vite  
✅ Dependencies installerade:
- axios (HTTP client)
- react-router-dom (routing)

### Viktiga Problem & Lösningar

**Problem 1:** PostgreSQL "role postgres does not exist"  
**Lösning:** Använde macOS användarnamn `maxnerdal` istället i `application.properties`

**Problem 2:** Interaktiva kommandon fungerade inte bra via verktyg  
**Lösning:** Svarade manuellt på Vite-prompts (No på rolldown-vite experimental)

### Verifiering
✅ Backend startar utan fel på port 8080  
✅ Databaskoppling fungerar  
✅ Health endpoint svarar korrekt  
✅ Frontend-projekt skapat och dependencies installerade

## Projektfiler Skapade

### Dokumentation
- `PROJECT_PLAN.md` - Övergripande projektplan med alla faser
- `PROJEKTSAMMANFATTNING.md` - Analys av .NET-projektet
- `IMPLEMENTATION_LOG.md` - Detaljerad steg-för-steg guide (ny!)

### Backend
- `pom.xml` - Maven konfiguration
- `application.properties` - Spring Boot konfiguration
- `TradingBotsApplication.java` - Main class
- `HealthController.java` - Health check endpoint
- `.gitignore` - Git ignore-regler
- `README.md` - Backend-dokumentation

### Frontend
- Vite React-projekt med standardstruktur
- `package.json` med axios och react-router-dom

## Öppna Frågor
- [x] Vilken databas ska användas? → **PostgreSQL**
- [x] Vilket frontend-ramverk? → **React med Vite**
- [x] Vilka crypto-API:er ska integreras? → **CoinGecko (planerat)**
- [ ] Exakt databasschema för alla entiteter?
- [ ] UI/UX design och komponentstruktur?
- [ ] Git repository setup och versionshantering?

## Användbara Kommandon

### Starta Allt
```bash
# Terminal 1 - Backend
cd tradingbots-backend && mvn spring-boot:run

# Terminal 2 - Frontend (när vi är redo)
cd tradingbots-frontend && npm run dev

# PostgreSQL status
brew services list
```

### Testa Backend
```bash
curl http://localhost:8080/api/health
```

## Viktiga Anteckningar

### Databaskonfiguration
- **Användare:** Använd alltid ditt macOS användarnamn för lokal PostgreSQL
- **Port:** PostgreSQL körs på 5432, Backend på 8080
- **Hibernate:** Auto-update mode betyder att tabeller skapas automatiskt från entities

### Dependencies
- **Lombok:** Kräver IDE-plugin för att fungera korrekt (IntelliJ har stöd)
- **DevTools:** Aktiverar auto-restart vid kodändringar
- **JWT:** Använder JJWT 0.12.3 för token-hantering

### Utvecklingsworkflow
1. Gör ändringar i kod
2. Backend: Maven kompilerar automatiskt (med devtools)
3. Frontend: Vite hot-reloads automatiskt
4. Testa endpoints med curl eller Postman
5. Commit efter varje fungerande feature

## Nästa Steg - Fas 2: Användarautentisering & Säkerhet

Planerade aktiviteter:
1. Skapa User entity och repository
2. Implementera registrering och login endpoints
3. JWT token generation och validation
4. Spring Security konfiguration
5. Frontend login/register formulär
6. Protected routes i React
7. Testa hela autentiseringsflödet

## Nästa Steg
1. Få sammanfattning av .NET TradingBots-projektet
2. Diskutera och bestämma funktioner för Java-versionen
3. Välja teknisk stack (databas, frontend-ramverk)
4. Börja implementera Steg 1 efter godkännande

## Anteckningar
- Användaren vill ha möjlighet att diskutera och potentiellt ta bort eller lägga till olika features
- Inget ska implementeras utan användarens godkännande först
