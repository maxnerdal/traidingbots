# Implementation Log - Crypto Portfolio / Trading Bots

Detta dokument innehåller en detaljerad steg-för-steg guide över implementationen av projektet. Varje fas dokumenteras med exakta kommandon, konfigurationer och förklaringar om vad som görs och varför.

**Skapad:** 26 januari 2026  
**Senast uppdaterad:** 27 januari 2026

---

## 📋 Innehållsförteckning
- [Fas 0: Projektplanering](#fas-0-projektplanering)
- [Fas 1: Grundläggande Setup](#fas-1-grundläggande-setup)

---

## Fas 0: Projektplanering

### Beslut som togs

#### 1. **Databas:** PostgreSQL 14

**Vad är PostgreSQL:**
PostgreSQL är ett avancerat, open-source relationsdatabashanteringssystem (RDBMS) som har utvecklats sedan 1986. Det är känt för sin robusthet, ACID-compliance (Atomicity, Consistency, Isolation, Durability) och stöd för både relationella och icke-relationella datatyper (JSON, arrays, etc.).

**Varför PostgreSQL:**
- **ACID-garanti:** Alla transaktioner är säkra och konsistenta
- **Avancerade datatyper:** JSON/JSONB, UUID, Arrays, Hstore
- **Starkt community:** Stor open-source community och enterprise support
- **Excellent Spring Boot integration:** Automatisk konfiguration via Spring Data JPA
- **Skalbarhet:** Hanterar miljontals rader utan prestandaproblem
- **Full-text search:** Inbyggt stöd för avancerad textsökning

**Alternativ och jämförelser:**

| Databas | Fördelar | Nackdelar | När att välja |
|---------|----------|-----------|---------------|
| **MySQL** | Enklare setup, snabbare för enkla queries, populärast | Mindre avancerade features, sämre JSON-stöd | Enklare CRUD-applikationer |
| **H2** | In-memory, perfekt för tester, noll konfiguration | Inte för production, data försvinner vid restart | Development och testing |
| **MongoDB** | Schema-less, horisontell skalning, JSON-native | Ingen ACID över dokument, svårare joins | Dokumentbaserad data, microservices |
| **SQLite** | Fil-baserad, noll konfiguration, extremt lätt | Single-user, begränsad concurrency | Desktop apps, prototyper |

**Vårt val:** PostgreSQL för att vi behöver relationella strukturer (users → portfolios → transactions), robust ACID-stöd för finansiella transaktioner, och JSON-stöd för API-responses från crypto exchanges.

---

#### 2. **Frontend:** React 18+

**Vad är React:**
React är ett JavaScript-bibliotek (inte ett fullständigt ramverk) utvecklat av Meta (Facebook) för att bygga användargränssnitt baserat på komponenter. React använder en virtuell DOM för effektiv rendering och följer en "unidirectional data flow" (data flödar i en riktning).

**Kärnkoncept:**
- **Komponenter:** Återanvändbara UI-byggstenar
- **JSX:** JavaScript XML - HTML-liknande syntax i JavaScript
- **Virtual DOM:** React skapar en representation av DOM:en i minnet och uppdaterar endast det som ändrats
- **Hooks:** useState, useEffect, etc. - för att hantera state och side effects
- **One-way data binding:** Data flödar från parent till child via props

**Varför React:**
- **Komponent-baserat:** Återanvändbar kod, enklare att underhålla
- **Stort ekosystem:** Oändliga libraries (routing, state management, UI components)
- **Performance:** Virtual DOM ger snabba uppdateringar
- **Community:** Största community, mest Stack Overflow-svar, tutorials
- **Job market:** Mest efterfrågad frontend-skill
- **React Native:** Samma kod kan användas för mobila appar

**Alternativ och jämförelser:**

| Framework/Library | Arkitektur | Learning Curve | Storlek | När att välja |
|-------------------|------------|----------------|---------|---------------|
| **Vue.js** | Progressivt ramverk | Lättast | Minst (~30KB) | Små-medelstora projekt, nybörjare |
| **Angular** | Full framework | Svårast | Störst (~500KB) | Enterprise, TypeScript-first, full structure |
| **Svelte** | Compiler-baserad | Lätt | Minst runtime | Performance-kritiska apps |
| **Solid.js** | Finegrained reactivity | Medel | Liten | Max performance, mindre community |
| **Next.js** | React framework | Medel | Större | SEO viktigt, SSR/SSG behövs |

**Vårt val:** React för dess balans mellan flexibilitet och struktur, stort ekosystem för trading charts (Recharts, TradingView), och bäst dokumentation.

---

#### 3. **Backend:** Spring Boot 3.2.1

**Vad är Spring Boot:**
Spring Boot är ett opinionated ramverk byggt ovanpå Spring Framework (som funnits sedan 2002). Det förenklar skapandet av produktionsklara Spring-applikationer genom "convention over configuration". Spring Boot tillhandahåller auto-configuration, inbäddad server (Tomcat/Jetty), och production-ready features som health checks och metrics.

**Spring Framework vs Spring Boot:**
- **Spring Framework:** Stor, kraftfull men kräver mycket manuell konfiguration (XML eller Java config)
- **Spring Boot:** Förenklar Spring med auto-configuration, starter dependencies, och embedded servers

**Kärnkoncept i Spring Boot:**
1. **Dependency Injection (DI):** Spring hanterar objektens livscykel och dependencies
2. **Annotations:** @Controller, @Service, @Repository - definierar komponenttyper
3. **Auto-configuration:** Spring Boot konfigurerar automatiskt baserat på dependencies i classpath
4. **Starter Dependencies:** Förpaketerade dependency-grupper (t.ex. `spring-boot-starter-web` inkluderar Spring MVC, Tomcat, Jackson)
5. **Embedded Server:** Inget behov av extern Tomcat - servern är del av JAR-filen

**Varför Spring Boot:**
- **Enterprise-ready:** Battle-tested i tusentals företag globalt
- **Security:** Spring Security är branschstandard för autentisering/auktorisering
- **Database integration:** Spring Data JPA förenklar databasoperationer enormt
- **RESTful APIs:** Spring MVC gör det trivialt att skapa REST endpoints
- **Testing:** Excellent testing support med @SpringBootTest, MockMvc
- **Monitoring:** Actuator ger production-ready monitoring endpoints
- **Ecosystem:** Allt från batch-processing (Spring Batch) till messaging (Spring Cloud Stream)

**Alternativ och jämförelser:**

| Backend Stack | Språk | Arkitektur | Performance | Learning Curve | När att välja |
|---------------|-------|------------|-------------|----------------|---------------|
| **Spring Boot** | Java/Kotlin | Annotations, DI | God | Medel-Hög | Enterprise, komplex business logic |
| **Node.js + Express** | JavaScript | Middleware-baserad | Excellent för I/O | Lätt | Fullstack JS, real-time, microservices |
| **Django** | Python | MTV (Model-Template-View) | God | Medel | Rapid development, AI/ML integration |
| **FastAPI** | Python | Async, type hints | Excellent | Lätt-Medel | Modern Python, async APIs, auto-docs |
| **.NET Core** | C# | MVC, DI | Excellent | Medel-Hög | Microsoft stack, Windows-integration |
| **Ruby on Rails** | Ruby | Convention over config | God | Medel | Rapid prototyping, startups |
| **Go + Gin** | Go | Minimalist | Excellent | Medel | Microservices, high concurrency |
| **Laravel** | PHP | MVC, Eloquent ORM | God | Lätt-Medel | PHP-ekosystem, rapid development |

**Jämförelse med populäraste alternativen:**

**Spring Boot vs Node.js/Express:**
- **Spring Boot:** Bättre struktur för stora projekt, strong typing (Java), mature security libraries
- **Node.js:** Samma språk som frontend (JavaScript), bättre för WebSockets/real-time, mindre verbose
- **Performance:** Node.js snabbare för I/O-bound (många connections), Spring Boot bättre för CPU-bound

**Spring Boot vs Django/FastAPI:**
- **Spring Boot:** Striktare typing, bättre för stora teams, mer enterprise features
- **Django:** Batteries included (admin panel, ORM, auth ut ur lådan), snabbare development
- **FastAPI:** Modern Python, auto-generated API docs, async by default

**Vårt val:** Spring Boot för:
1. **Robust security:** Trading bots hanterar känsliga API-nycklar - Spring Security är best-in-class
2. **Type safety:** Java's strong typing förhindrar många runtime-errors
3. **Scheduled tasks:** @Scheduled annotation perfekt för trading bots som körs periodiskt
4. **Transaction management:** @Transactional säkerställer ACID för finansiella transaktioner
5. **Ecosystem maturity:** Proven at scale (används av Netflix, Amazon, etc.)

---

#### 4. **Databasnamn:** `tradingbots`

**Varför detta namn:**
- **Beskrivande:** Matchar projektets kärnfunktionalitet
- **Lowercase:** PostgreSQL best practice (undviker quoting issues)
- **Singular/Plural:** Vi använder `tradingbots` (plural) eftersom databasen innehåller många bots
- **No spaces/special chars:** Följer SQL naming conventions

**Namngivningskonventioner för databaser:**
- **snake_case:** trading_bots (rekommenderas för PostgreSQL)
- **camelCase:** tradingBots (kan kräva quotes i SQL)
- **PascalCase:** TradingBots (Windows-style, undvik i Linux/Mac)

**Vårt val:** `tradingbots` - enkelt, tydligt, inga problem med case-sensitivity

---

## Fas 1: Grundläggande Setup

### 1.1 Installera Node.js och npm

**Vad är Node.js:**
Node.js är en JavaScript runtime byggd på Chrome's V8 JavaScript-motor. Det låter dig köra JavaScript på servern (utanför webbläsaren). Lanserades 2009 av Ryan Dahl och revolutionerade JavaScript-utveckling genom att göra det möjligt att använda samma språk för både frontend och backend.

**Hur Node.js fungerar:**
- **Event-driven:** Använder en event loop för att hantera många connections samtidigt
- **Non-blocking I/O:** Operationer (t.ex. läsa filer, databas-queries) blockerar inte andra operationer
- **Single-threaded:** En huvudtråd med event loop, men kan använda worker threads vid behov
- **V8 Engine:** Samma motor som Chrome använder - kompilerar JS till maskinkod

**Vad är npm:**
npm (Node Package Manager) är världens största software registry med över 2 miljoner paket. Det består av:
1. **CLI-verktyg:** Kommandoradstool för att installera/hantera paket
2. **Registry:** Online-databas av JavaScript-paket (npmjs.com)
3. **package.json:** Manifest-fil som listar projektets dependencies

**Varför behöver vi Node.js för React:**
- **Development server:** Vite/Webpack kräver Node.js för att köra dev-servern
- **Build tools:** Babel (transpilering), Webpack/Vite (bundling) körs i Node.js
- **Package management:** npm installerar alla React libraries (react, react-dom, etc.)
- **Scripting:** npm scripts (npm run dev, npm run build) körs i Node.js

**Alternativ till npm:**
- **Yarn:** Utvecklad av Facebook, snabbare och mer deterministisk än npm (version 1-6)
- **pnpm:** Använder hard links, sparar diskutrymme, snabbast av alla
- **Bun:** Ny runtime + package manager, extremt snabb men mindre mogen

**Kommando:**
```bash
brew install node
```

**Verifiering:**
```bash
node --version  # v25.4.0
npm --version   # 11.7.0
```

---

### 1.2 Installera Maven

**Vad är Maven:**
Apache Maven är ett build automation och dependency management-verktyg för Java-projekt, lanserat 2004. Maven följer "convention over configuration"-principen och använder en standard projektstruktur.

**Kärnkoncept:**
1. **POM (Project Object Model):** XML-fil (pom.xml) som definierar projekt-metadata, dependencies, plugins och build-konfiguration
2. **Dependencies:** Maven laddar automatiskt ner bibliotek från Maven Central Repository
3. **Lifecycle:** Fördefinierade build-faser (compile → test → package → install → deploy)
4. **Plugins:** Utökar Maven's funktionalitet (t.ex. spring-boot-maven-plugin)
5. **Transitive dependencies:** Maven hanterar dependencies-of-dependencies automatiskt

**Maven Build Lifecycle:**
```
validate → compile → test → package → verify → install → deploy
```
- **validate:** Kontrollera att projektet är korrekt
- **compile:** Kompilera source code
- **test:** Kör unit tests
- **package:** Paketera compiled code (JAR/WAR)
- **install:** Installera paketet i lokal repository (~/.m2/repository)
- **deploy:** Kopiera paketet till remote repository

**Varför Maven:**
- **Standardisering:** Samma projektstruktur överallt (src/main/java, src/test/java)
- **Dependency management:** Automatisk nedladdning och version resolution
- **Reproducible builds:** pom.xml garanterar samma dependencies överallt
- **Plugin ecosystem:** Tusentals plugins för allt från code coverage till Docker
- **IDE integration:** IntelliJ, Eclipse, VS Code har excellent Maven-stöd

**Maven vs andra build tools:**

| Tool | Config | Flexibilitet | Performance | Learning Curve |
|------|--------|--------------|-------------|----------------|
| **Maven** | XML (verbose) | Begränsad | Långsammare | Medel |
| **Gradle** | Groovy/Kotlin DSL | Hög | Snabbare | Högre |
| **Ant** | XML | Högst | Varierande | Låg-Medel |

**Maven vs Gradle:**
- **Maven:** Enklare, mer konventionsbaserat, större community
- **Gradle:** Flexiblare, snabbare (incremental builds), används av Android
- **Spring Boot:** Stödjer båda - Maven är vanligare för enterprise

**Vårt val:** Maven för att Spring Initializr (Spring Boot project generator) använder Maven som default, och det finns fler tutorials med Maven än Gradle.

**Kommando:**
```bash
brew install maven
```

**Verifiering:**
```bash
mvn --version  # Apache Maven 3.9.12
```

---

### 1.3 Installera och konfigurera PostgreSQL

**Vad är PostgreSQL:**
PostgreSQL (ofta kallad "Postgres") är ett objekt-relationellt databashanteringssystem (ORDBMS) som började utvecklas på UC Berkeley 1986. Det är känt för att följa SQL-standarder noggrant och för sin extensibility.

**Kärnfunktioner:**
- **ACID-compliance:** Full transaktionssäkerhet
- **MVCC (Multi-Version Concurrency Control):** Readers blockerar aldrig writers
- **Advanced indexing:** B-tree, Hash, GiST, GIN, BRIN
- **JSON/JSONB:** Native JSON-stöd med indexering
- **Foreign Data Wrappers:** Kan query:a andra databaser
- **Extensions:** PostGIS (geografisk data), pg_trgm (fuzzy search)

**Varför en databas:**
Vi behöver persistent lagring för:
1. **Users:** Email, hashed password, roles
2. **Portfolios:** Crypto holdings per användare
3. **Transactions:** Köp/sälj historik med timestamps
4. **Trading Bots:** Strategi-konfigurationer, API-nycklar (encrypted)
5. **Price history:** Historiska priser för backtesting

**Relationsdatabas vs Alternativ:**

**När att använda SQL (PostgreSQL/MySQL):**
- Relationella data (users → portfolios → transactions)
- ACID-krav (finansiella transaktioner)
- Komplex queries med joins
- Strukturerad data med schema

**När att använda NoSQL:**
- **MongoDB:** Flexibelt schema, dokument-orienterad data
- **Redis:** Caching, sessions, real-time data
- **Cassandra:** Massiv skalning, time-series data
- **DynamoDB:** Serverless, AWS-integration

**Vårt val:** PostgreSQL för att crypto portfolio-data är relationell (users har portfolios som har transactions), och vi behöver ACID-garantier för finansiella operationer.

#### Installation
```bash
brew install postgresql@14
```

#### Starta PostgreSQL-servern
```bash
brew services start postgresql@14
```

**Förklaring:** Detta startar PostgreSQL som en bakgrundstjänst som alltid körs på din Mac.

#### Skapa databas
```bash
/opt/homebrew/opt/postgresql@14/bin/createdb tradingbots
```

**Förklaring:** Skapar en tom databas med namnet `tradingbots` som vårt Spring Boot-projekt kommer använda.

---

### 1.4 Backend Setup - Spring Boot

**Vad:** Spring Boot backend-applikation som kommer hantera all business logic, databaskommunikation och exponera REST APIs.

#### 1.4.1 Skapa projektstruktur

**Katalogstruktur:**
```
tradingbots-backend/
├── pom.xml                          # Maven konfiguration och dependencies
├── src/
│   └── main/
│       ├── java/
│       │   └── com/cryptoportfolio/
│       │       └── TradingBotsApplication.java  # Main klass
│       └── resources/
│           └── application.properties               # Applikationskonfiguration
```

#### 1.4.2 pom.xml - Maven Dependencies

**Vad är pom.xml:**
Project Object Model (POM) är Maven's konfigurationsfil. Den är hjärtat av ett Maven-projekt och innehåller all information Maven behöver för att bygga projektet.

**POM struktur:**
```xml
<project>
  <modelVersion>4.0.0</modelVersion>
  <groupId>com.tradingbots</groupId>      <!-- Organization/company -->
  <artifactId>crypto-backend</artifactId>     <!-- Project name -->
  <version>0.0.1-SNAPSHOT</version>           <!-- Version -->
  <packaging>jar</packaging>                  <!-- Output format -->
  
  <dependencies>...</dependencies>            <!-- Libraries -->
  <build><plugins>...</plugins></build>       <!-- Build config -->
</project>
```

**Viktiga dependencies och djupgående förklaringar:**

**1. spring-boot-starter-web**
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```
**Vad den gör:** "Starter"-dependencies är meta-packages som inkluderar flera relaterade libraries.

**Inkluderar:**
- **Spring MVC:** Model-View-Controller framework för web applications
- **Tomcat:** Embedded web server (ingen extern Tomcat behövs)
- **Jackson:** JSON serialization/deserialization (Java objects ↔ JSON)
- **Spring Boot Auto-configuration:** Konfigurerar allt automatiskt

**Varför vi behöver den:**
- Skapa REST API endpoints (@RestController)
- Hantera HTTP requests (GET, POST, PUT, DELETE)
- Automatisk JSON-konvertering av responses
- Embedded server så vi kan köra applikationen som en JAR

**Alternativ:**
- **spring-boot-starter-webflux:** Reactive, non-blocking web stack (för extremt hög concurrency)
- **Jersey:** JAX-RS implementation (alternativ till Spring MVC)
- **Micronaut/Quarkus:** Moderna altertnativ med snabbare startup

---

**2. spring-boot-starter-data-jpa**
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
```
**Vad är JPA:**
Java Persistence API - en specifikation för ORM (Object-Relational Mapping). Det låter dig jobba med databaser genom Java-objekt istället för SQL.

**Inkluderar:**
- **Hibernate:** JPA implementation (de facto standard)
- **Spring Data JPA:** Repository abstraction layer
- **HikariCP:** Connection pooling (återanvänder databas-connections)

**Vad är ORM:**
Object-Relational Mapping översätter mellan objekt (Java classes) och relationsdatabaser:
```java
// Java Entity
@Entity
public class User {
    @Id
    private Long id;
    private String email;
}

// Blir SQL
CREATE TABLE user (
    id BIGINT PRIMARY KEY,
    email VARCHAR(255)
);
```

**Fördelar med JPA/Hibernate:**
- Mindre SQL-kod (Hibernate genererar SQL automatiskt)
- Database-agnostic (samma kod fungerar med PostgreSQL, MySQL, etc.)
- Lazy loading (laddar relaterad data endast vid behov)
- Caching (second-level cache minskar databas-queries)
- Type safety (compile-time errors istället för runtime SQL-errors)

**Alternativ:**
- **MyBatis:** Mindre "magic", du skriver SQL själv (mer kontroll)
- **jOOQ:** Type-safe SQL med Java DSL
- **JDBC Template:** Spring's direkta JDBC wrapper (ingen ORM)

**Vårt val:** JPA för att det är Spring Boot-standard och minskar boilerplate enormt.

---

**3. postgresql**
```xml
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <scope>runtime</scope>
</dependency>
```
**Vad är JDBC Driver:**
JDBC (Java Database Connectivity) är Java's API för databas-communication. Varje databas behöver en driver som implementerar JDBC-gränssnittet.

**Hur det fungerar:**
```
Java App → JDBC API → PostgreSQL Driver → PostgreSQL Database
```

**scope=runtime:**
Drivern behövs endast när applikationen körs, inte vid kompilering. Detta är en Maven optimization.

**Driver per databas:**
- PostgreSQL: `org.postgresql:postgresql`
- MySQL: `com.mysql:mysql-connector-j`
- Oracle: `com.oracle.database.jdbc:ojdbc8`
- SQL Server: `com.microsoft.sqlserver:mssql-jdbc`

---

**4. spring-boot-starter-security**
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
```
**Vad är Spring Security:**
Ett kraftfullt authentication och access-control framework. Det är de facto standard för säkerhet i Java-applikationer.

**Kärnkoncept:**
- **Authentication:** Verifiera identitet ("Vem är du?")
- **Authorization:** Kontrollera permissions ("Vad får du göra?")
- **Principal:** Den autentiserade användaren
- **Authorities/Roles:** Användarens permissions (ROLE_USER, ROLE_ADMIN)

**Vad Spring Security gör:**
1. **Password hashing:** BCrypt, Argon2, PBKDF2
2. **Session management:** CSRF protection, session fixation prevention
3. **Method security:** @PreAuthorize, @Secured annotations
4. **CORS:** Cross-Origin Resource Sharing configuration
5. **OAuth2/OIDC:** Social login (Google, GitHub, etc.)

**Authentication metoder:**
- **Session-based:** Traditional cookies (stateful)
- **JWT-based:** Token i header (stateless) ← Vi använder denna
- **OAuth2:** Delegerad autentisering
- **LDAP:** Corporate directory integration

**Alternativ:**
- **Apache Shiro:** Enklare men mindre funktionalitet
- **JAAS:** Built-in Java security (very low-level)
- ** Egen lösning:** Ofta mindre säkert (svårt att få rätt)

---

**5. jjwt (JSON Web Tokens)**
```xml
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-api</artifactId>
    <version>0.11.5</version>
</dependency>
```
**Vad är JWT:**
JSON Web Token är en öppen standard (RFC 7519) för att säkert överföra information mellan parter som ett JSON-objekt.

**JWT struktur:**
```
header.payload.signature
```
**Exempel:**
```
eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyQGV4YW1wbGUuY29tIn0.signature
```

**Delar:**
1. **Header:** Typ (JWT) och algoritm (HS256, RS256)
```json
{"alg": "HS256", "typ": "JWT"}
```

2. **Payload:** Claims (data):
```json
{
  "sub": "user@example.com",
  "exp": 1640000000,
  "roles": ["USER"]
}
```

3. **Signature:** Kryptografisk signatur som verifierar integritet

**Fördelar med JWT:**
- **Stateless:** Server behöver inte lagra sessions
- **Scalable:** Fungerar i distributed systems
- **Mobile-friendly:** Enklare än cookies för mobile apps
- **Cross-domain:** Kan användas över olika domains

**JWT vs Sessions:**

| Aspekt | JWT | Sessions |
|--------|-----|----------|
| **Storage** | Client (localStorage/cookie) | Server (memory/Redis) |
| **Scalability** | Excellent (stateless) | Svårare (sticky sessions) |
| **Revocation** | Svårt (token lever till expiry) | Enkelt (ta bort från server) |
| **Size** | Större (skickas vid varje request) | Mindre (endast session ID) |

**Vårt val:** JWT för att det är modernt, stateless (enklare att skala), och standard för REST APIs.

---

**6. spring-boot-starter-validation**
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
```
**Vad är Bean Validation:**
Java standard (JSR 380) för att validera objekt med annotations.

**Exempel:**
```java
public class RegisterRequest {
    @NotBlank(message = "Email required")
    @Email(message = "Invalid email format")
    private String email;
    
    @Size(min = 8, message = "Password must be 8+ chars")
    private String password;
    
    @Min(18)
    private int age;
}
```

**Common annotations:**
- `@NotNull` - Får inte vara null
- `@NotBlank` - Får inte vara tom/whitespace
- `@Email` - Måste vara valid email
- `@Size(min, max)` - Längd-validering
- `@Pattern(regexp)` - Regex-matching
- `@Min/@Max` - Numerisk range

**Varför vi behöver det:**
- Input validation är kritiskt för säkerhet
- Förhindrar SQL injection, XSS
- Better user experience (tydliga error messages)
- Centraliserad validering (inte scattered if-statements)

---

**7. lombok**
```xml
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <optional>true</optional>
</dependency>
```
**Vad är Lombok:**
Ett compile-time annotation processor som auto-genererar Java boilerplate code.

**Före Lombok:**
```java
public class User {
    private String email;
    private String password;
    
    public User() {}
    
    public User(String email, String password) {
        this.email = email;
        this.password = password;
    }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    
    @Override
    public boolean equals(Object o) { /* 15 lines */ }
    
    @Override
    public int hashCode() { /* 5 lines */ }
    
    @Override
    public String toString() { /* 3 lines */ }
}
```

**Efter Lombok:**
```java
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    private String email;
    private String password;
}
```

**Populära Lombok annotations:**
- `@Data` - Genererar getters, setters, toString, equals, hashCode
- `@Getter/@Setter` - Endast getters/setters
- `@NoArgsConstructor` - Default constructor
- `@AllArgsConstructor` - Constructor med alla fields
- `@Builder` - Builder pattern
- `@Slf4j` - Logger field

**Kontroverser kring Lombok:**
- **Pro:** Mindre kod, mer läsbart
- **Con:** "Magic" (generad kod syns inte), IDE-kompatibilitet

---

**8. spring-boot-devtools**
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-devtools</artifactId>
    <scope>runtime</scope>
    <optional>true</optional>
</dependency>
```
**Vad den gör:**
- **Automatic restart:** Upptäcker kodändringar och startar om applikationen
- **LiveReload:** Refreshar browsern automatiskt
- **Development properties:** Disables caching, enables debug logging
- **Remote debugging:** Kan köra på remote server

**Hur automatic restart fungerar:**
Devtools har två classloaders:
1. **Base classloader:** Laddar dependencies (ändras sällan)
2. **Restart classloader:** Laddar din kod (ändras ofta)

När kod ändras, restart classloader byts ut (snabbt), base classloader återanvänds.

**Scope=runtime, optional=true:**
- Används endast under development
- Exkluderas automatiskt från production JAR

---

**Java Version: 17**
```xml
<properties>
    <java.version>17</java.version>
</properties>
```

**Java versioner och LTS:**

| Version | Release | Status | Features |
|---------|---------|--------|----------|
| Java 8 | 2014 | LTS (till 2030) | Lambdas, Streams, Optional |
| Java 11 | 2018 | LTS | HTTP Client, var keyword |
| **Java 17** | 2021 | **LTS** | Records, Sealed classes, Pattern matching |
| Java 21 | 2023 | LTS | Virtual threads, Pattern matching for switch |

**Varför Java 17:**
- **LTS:** Support till 2029 (minst)
- **Modern features:** Records minskar boilerplate
- **Performance:** G1GC improvements, better JIT
- **Spring Boot 3.x:** Kräver Java 17 minimum
- **Industry standard:** Mest använda LTS versionen 2024-2026

**Java 17 features vi använder:**
```java
// Records (immutable data classes)
public record LoginRequest(String email, String password) {}

// Text blocks
String sql = """
    SELECT * FROM users
    WHERE email = ?
    """;
    
// Pattern matching for instanceof
if (obj instanceof String s) {
    System.out.println(s.toUpperCase());
}
```

#### 1.4.3 application.properties

**Vad:** Konfigurationsfil där vi definierar databas-koppling, server-port och andra inställningar.

**Innehåll:**
```properties
# Server Configuration
server.port=8080

# PostgreSQL Database Configuration
spring.datasource.url=jdbc:postgresql://localhost:5432/tradingbots
spring.datasource.username=maxnerdal
spring.datasource.password=

# JPA/Hibernate Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

# JWT Configuration
jwt.secret=your-secret-key-change-this-in-production-make-it-at-least-256-bits
jwt.expiration=86400000

# Logging
logging.level.com.tradingbots=DEBUG
logging.level.org.springframework.security=DEBUG
```

**Förklaringar:**

- **server.port=8080**: Applikationen körs på http://localhost:8080
- **spring.datasource.url**: Anslutningssträngen till PostgreSQL-databasen
- **spring.datasource.username**: Din Mac-användare (PostgreSQL skapar automatiskt en user med samma namn)
- **spring.datasource.password**: Tom eftersom lokal PostgreSQL inte kräver lösenord
- **spring.jpa.hibernate.ddl-auto=update**: Hibernate skapar/uppdaterar databastabeller automatiskt från Java-entities
- **spring.jpa.show-sql=true**: Visar alla SQL-queries i loggen (bra för debugging)
- **jwt.secret**: Hemlig nyckel för att signera JWT tokens (måste vara minst 256 bits)
- **jwt.expiration**: Token giltighet i millisekunder (86400000 = 24 timmar)

#### 1.4.4 Main Application Class

**Fil:** `TradingBotsApplication.java`

```java
@SpringBootApplication
@EnableScheduling
public class TradingBotsApplication {
    public static void main(String[] args) {
        SpringApplication.run(TradingBotsApplication.class, args);
    }
}
```

**Förklaringar:**
- **@SpringBootApplication**: Kombinerar flera annotations, säger åt Spring att detta är en Spring Boot app
- **@EnableScheduling**: Aktiverar schemalagda tasks (för trading bots som körs periodiskt)

#### 1.4.5 Health Check Endpoint

**Fil:** `controller/HealthController.java`

**Vad:** En enkel endpoint för att verifiera att backend körs.

**Varför:** Bra för testning och monitoring. Kan användas av frontend eller externa verktyg för att kolla att API:t är igång.

```java
@RestController
@RequestMapping("/api/health")
public class HealthController {
    @GetMapping
    public ResponseEntity<Map<String, Object>> health() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "UP");
        response.put("timestamp", LocalDateTime.now());
        response.put("service", "Crypto Portfolio Backend");
        response.put("version", "0.0.1-SNAPSHOT");
        return ResponseEntity.ok(response);
    }
}
```

#### 1.4.6 Bygga och köra backend

**Bygga projektet:**
```bash
cd tradingbots-backend
mvn clean install
```

**Förklaring:**
- `clean`: Tar bort tidigare builds
- `install`: Kompilerar koden, kör tester och paketerar till en JAR-fil

**Starta applikationen:**
```bash
mvn spring-boot:run
```

**Vad händer:**
1. Maven laddar ner alla dependencies
2. Kompilerar Java-koden
3. Startar Tomcat-server på port 8080
4. Kopplar upp mot PostgreSQL
5. Hibernate skapar databas-tabeller

**Testa health endpoint:**
```bash
curl http://localhost:8080/api/health
```

**Förväntat svar:**
```json
{
  "status": "UP",
  "timestamp": "2026-01-26T17:01:47",
  "service": "Crypto Portfolio Backend",
  "version": "0.0.1-SNAPSHOT"
}
```

---

### 1.5 Frontend Setup - React

**Vad är en Single Page Application (SPA):**
En webbapplikation som laddar en enda HTML-sida och dynamiskt uppdaterar innehållet utan att ladda om sidan. All navigation sker på client-side genom JavaScript.

**Traditionell Multi-Page App vs SPA:**

**Multi-Page (Traditional):**
```
User clicks link → Browser request → Server renders HTML → Full page reload
```
- Varje navigation laddar om hela sidan
- Server renderar HTML
- Slow, "blinkar" mellan sidor

**Single-Page (SPA):**
```
User clicks → JavaScript updates DOM → Fetch data from API → Update view
```
- Endast initial page load
- JavaScript renderar UI
- Snabb, app-liknande känsla

**Varför SPA för crypto portfolio:**
- Real-time price updates utan page reload
- Snabb navigation mellan Portfolio, Bots, Settings
- Better user experience (känns som en desktop-app)
- API-driven (frontend och backend separata)

---

#### 1.5.1 Skapa React-projekt med Vite

**Vad är Vite:**
Vite (franskt ord för "snabb") är ett modernt frontend build-verktyg skapat av Evan You (Vue.js skapare) 2020. Det utnyttjar moderna browser-features för extremt snabb development.

**Hur Vite fungerar:**

**Development (Dev Server):**
1. **Native ES Modules:** Serverar källkod direkt till browsern (ingen bundling)
2. **On-demand compilation:** Kompilerar endast filer som används
3. **HMR (Hot Module Replacement):** Updates modules utan full reload

```
Traditional (Webpack):
[All files] → Bundle → Dev server → Browser
⏱️ Slow startup (10-30s för stora projekt)

Vite:
[Request] → Compile only requested file → Browser
⏱️ Instant startup (<1s)
```

**Production (Build):**
Använder Rollup för optimerad bundling:
- Code splitting (delar upp i mindre chunks)
- Tree shaking (tar bort oanvänd kod)
- Minification (komprimerar koden)

**Vite vs Create React App (CRA):**

| Feature | Vite | Create React App |
|---------|------|------------------|
| **Dev startup** | <1s | 10-30s |
| **HMR speed** | Instant | 1-3s |
| **Build tool** | Rollup | Webpack |
| **Config** | Minimal | Ejected eller craco |
| **Status** | Actively developed | Barely maintained |
| **Bundle size** | Smaller | Larger |

**Varför Vite:**
- **Developer experience:** Instant server start och HMR
- **Modern:** Byggt för modern JavaScript (ESM, native imports)
- **Framework agnostic:** Fungerar med React, Vue, Svelte, Vanilla JS
- **Active development:** CRA är i princip abandoned (sista release 2022)
- **Industry trend:** Nya projekt använder Vite, Next.js, eller Remix

**Alternativ till Vite:**
- **Next.js:** React framework med SSR, routing, API routes (full framework)
- **Remix:** Modern React framework, excellent data loading
- **Webpack:** Traditionell bundler (kraftfull men komplex config)
- **esbuild:** Extremt snabb bundler (skriven i Go)
- **Turbopack:** Ny bundler från Vercel (Next.js team), i beta

**Kommando:**
```bash
cd tradingbots-frontend
npx create-vite . --template react
```

**Frågor under installation:**
- "Use rolldown-vite (Experimental)?" → **No** (vi vill ha stabil version)

**Projektstruktur efter skapande:**
```
tradingbots-frontend/
├── package.json           # npm dependencies och scripts
├── vite.config.js         # Vite konfiguration
├── index.html             # HTML entry point
├── src/
│   ├── App.jsx           # Root React-komponent
│   ├── main.jsx          # Entry point för React
│   └── ...
└── public/                # Statiska filer
```

#### 1.5.2 Installera dependencies

```bash
npm install axios react-router-dom
```

**Förklaringar:**

---

**1. axios**

**Vad är Axios:**
Axios är ett promise-baserat HTTP-klient bibliotek för browser och Node.js. Det är en wrapper runt XMLHttpRequest (browser) och http module (Node.js).

**Axios vs Fetch API:**

| Feature | Axios | Fetch |
|---------|-------|-------|
| **JSON parsing** | Automatic | Manual (.json()) |
| **Error handling** | Rejects on HTTP errors | Only on network errors |
| **Interceptors** | Built-in | Manual |
| **Request/response transform** | Built-in | Manual |
| **Cancel requests** | Built-in | AbortController |
| **Browser support** | IE11+ | Modern only |
| **Bundle size** | ~13KB | 0 (native) |

**Fetch example:**
```javascript
fetch('/api/users')
  .then(res => {
    if (!res.ok) throw new Error('HTTP error');
    return res.json();
  })
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

**Axios example:**
```javascript
axios.get('/api/users')
  .then(res => console.log(res.data))
  .catch(err => console.error(err));
```

**Varför Axios för vårt projekt:**

1. **Interceptors för JWT:**
```javascript
// Lägg till JWT token i alla requests
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Hantera 401 (unauthorized) globally
axios.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      // Redirect to login
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);
```

2. **Automatisk JSON transformation:**
Axios konverterar automatiskt JavaScript objects till JSON och vice versa.

3. **Better error messages:**
```javascript
try {
  await axios.post('/api/login', {email, password});
} catch (error) {
  console.log(error.response.data);    // Server error message
  console.log(error.response.status);  // HTTP status code
  console.log(error.response.headers); // Response headers
}
```

4. **Request cancellation:**
```javascript
const controller = new AbortController();
axios.get('/api/prices', { signal: controller.signal });
controller.abort(); // Cancel request
```

**Alternativ:**
- **Native Fetch:** Lättare (ingen dependency), men mer boilerplate
- **ky:** Modern, mindre än Axios, fetch-baserad
- **got:** För Node.js (inte browser)
- **superagent:** Äldre, liknande Axios

---

**2. react-router-dom**

**Vad är React Router:**
Det dominerande routing-biblioteket för React, utvecklat av Remix team. Det möjliggör client-side routing i SPAs.

**Kärnkoncept:**

1. **BrowserRouter:** Använder HTML5 history API för clean URLs
```javascript
import { BrowserRouter } from 'react-router-dom';

<BrowserRouter>
  <App />
</BrowserRouter>
```

2. **Routes och Route:** Definierar URL-to-component mapping
```javascript
import { Routes, Route } from 'react-router-dom';

<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/login" element={<LoginPage />} />
  <Route path="/portfolio" element={<PortfolioPage />} />
  <Route path="/bots/:id" element={<BotDetailPage />} />
</Routes>
```

3. **Link:** Navigation utan page reload
```javascript
import { Link } from 'react-router-dom';

<Link to="/portfolio">My Portfolio</Link>
// Istället för <a href="/portfolio">
```

4. **useNavigate:** Programmatic navigation
```javascript
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();
navigate('/dashboard'); // Redirect efter login
```

5. **useParams:** Access URL parameters
```javascript
import { useParams } from 'react-router-dom';

function BotDetail() {
  const { id } = useParams(); // From /bots/:id
  // Fetch bot with id
}
```

**Routing strategies:**

| Type | URL Example | How it works |
|------|-------------|-------------|
| **BrowserRouter** | `/portfolio` | HTML5 pushState API (clean URLs) |
| **HashRouter** | `/#/portfolio` | URL hash (works without server config) |
| **MemoryRouter** | N/A | In-memory (testing, React Native) |

**Varför BrowserRouter:**
- Clean URLs (ingen `#`)
- Better SEO (om vi senare lägger till SSR)
- Modern standard

**Protected Routes exempel:**
```javascript
function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/login" />;
  }
  
  return children;
}

<Route path="/portfolio" element={
  <ProtectedRoute>
    <PortfolioPage />
  </ProtectedRoute>
} />
```

**Alternativ till React Router:**
- **TanStack Router:** Type-safe, moderna features
- **Wouter:** Minimal (1.5KB), enkel
- **Reach Router:** Deprecated, merged into React Router
- **Next.js:** File-based routing (automatic från mappar)

**React Router Versioner:**
- **v5:** Class-based, <Switch>, <Redirect>
- **v6:** Hooks-based, <Routes>, <Navigate> (vi använder denna)
- **v7:** Ny, Remix-inspirerad (beta)

**Vårt val:** React Router v6 för att det är industry standard och har excellent TypeScript support.

#### 1.5.3 Starta development server

```bash
npm run dev
```

**Vad händer:**
- Vite startar en development server (vanligtvis på http://localhost:5173)
- Hot Module Replacement aktiveras (ändringar syns direkt i browsern)
- Console visar URL där appen körs

---

### 1.6 Sammanfattning Fas 1

**Vad har vi uppnått:**
✅ Komplett backend med Spring Boot  
✅ PostgreSQL databas installerad och konfigurerad  
✅ React frontend-projekt skapat  
✅ Alla nödvändiga verktyg installerade (Node, Maven, PostgreSQL)  
✅ Health check endpoint fungerar  
✅ Grundläggande projektstruktur på plats  

**Vad händer när vi startar allt:**

1. **PostgreSQL:** Körs som bakgrundstjänst på port 5432
2. **Backend:** Startar Tomcat på port 8080, kopplar till PostgreSQL
3. **Frontend:** Development server på port 5173 (eller annan tillgänglig port)

**Frontend kan nu göra API-anrop till:** `http://localhost:8080/api/*`

---

### 1.7 Felsökning (Troubleshooting)

#### Problem: "role postgres does not exist"
**Lösning:** Använd ditt macOS användarnamn istället i `application.properties`:
```properties
spring.datasource.username=maxnerdal
```

#### Problem: "Port 8080 already in use"
**Lösning:** Döda processen som använder porten:
```bash
lsof -ti:8080 | xargs kill -9
```

#### Problem: "Maven command not found"
**Lösning:** Starta om terminalen efter Maven-installation

---

## Nästa Steg: Fas 2

I Fas 2 kommer vi att implementera:
- User entity och databas-schema
- Registrering och login endpoints
- JWT token generation och validation
- Spring Security konfiguration
- Frontend login/register formulär
- Protected routes

**Förberedelseläsning:**
- Spring Security koncept
- JWT (JSON Web Tokens) hur de fungerar
- Password hashing med BCrypt

---

## Användbara kommandon

### Backend
```bash
# Starta backend
cd tradingbots-backend && mvn spring-boot:run

# Bygg JAR-fil
mvn clean package

# Kör tester
mvn test
```

### Frontend
```bash
# Starta dev server
cd tradingbots-frontend && npm run dev

# Bygga för production
npm run build

# Preview production build
npm run preview
```

### PostgreSQL
```bash
# Starta PostgreSQL
brew services start postgresql@14

# Stoppa PostgreSQL
brew services stop postgresql@14

# Status
brew services list

# Koppla till databas via psql
/opt/homebrew/opt/postgresql@14/bin/psql tradingbots

# Lista alla databaser
/opt/homebrew/opt/postgresql@14/bin/psql -l
```

### Git (kommer i nästa steg)
```bash
# Initiera git repository
git init

# Första commit
git add .
git commit -m "Initial setup - Fas 1 complete"
```

---

**Slutsats Fas 1:** Grundläggande setup är klar. Projektet har en fungerande backend och frontend, och vi är redo att börja implementera affärslogik i Fas 2!

---

## Fas 3: Portfolio Management (Backend)

**Datum:** 28 januari 2026  
**Status:** ✅ Komplett (Backend)  
**Git Commit:** BACKUP-PUNKT 3

### Översikt

Fas 3 implementerar komplett portfolio management system där användare kan:
- Skapa och hantera kryptovalutor (Digital Assets)
- Skapa flera portfolios
- Lägga till/uppdatera/ta bort tillgångar i sina portfolios
- Se sina innehav med quantity och average buy price

### Implementerade Komponenter

#### 1. Entity-klasser (INGEN Lombok)

**Kritiskt designbeslut:** Alla klasser använder manuella getters/setters istället för Lombok eftersom vi hade problem med Lombok annotation processing i Maven.

**Nya filer skapade:**
- `DigitalAsset.java` - Representerar kryptovalutor (BTC, ETH, etc.)
- `Portfolio.java` - Användarens samling av digitala tillgångar  
- `PortfolioItem.java` - Specifika innehav i en portfolio

**Database schema (3 nya tabeller):**
- `digital_assets`: symbol (unique), name, coingecko_id, timestamps
- `portfolios`: user_id (FK), name, description, timestamps
- `portfolio_items`: portfolio_id + digital_asset_id (unique constraint), quantity, average_buy_price, notes

**Viktiga design patterns:**
- BigDecimal för finansiella värden (quantity: 8 decimaler, prices: 2 decimaler)
- @PrePersist/@PreUpdate för automatiska timestamps
- Cascade operations: Portfolio → PortfolioItem (orphanRemoval=true)
- Eager loading av DigitalAsset i PortfolioItem (nästan alltid behövs)
- Unique constraint förhindrar dubbletter: en asset per portfolio

#### 2. Repositories

Skapade 3 nya repositories:
- `DigitalAssetRepository`: findBySymbol(), existsBySymbol()
- `PortfolioRepository`: findByUserId()
- `PortfolioItemRepository`: findByPortfolioId(), findByPortfolioIdAndDigitalAssetId()

#### 3. DTOs (Data Transfer Objects)

Alla med manuella getters/setters (NO Lombok):
- `CreateDigitalAssetRequest` - symbol, name, coingeckoId
- `CreatePortfolioRequest` - name, description
- `AddPortfolioItemRequest` - digitalAssetId, quantity, averageBuyPrice, notes
- `UpdatePortfolioItemRequest` - quantity, averageBuyPrice, notes

#### 4. Services

**DigitalAssetService:**
- Full CRUD för digitala tillgångar
- Validering att symbol är unik

**PortfolioService:**
- CRUD för portfolios och items
- **KRITISK: Ownership validation** - alla metoder validerar att userId matchar portfolio owner
- Smart `addPortfolioItem`: uppdaterar befintlig item eller skapar ny

**Constructor Injection Pattern:**
```java
public PortfolioService(PortfolioRepository portfolioRepository,
                       PortfolioItemRepository portfolioItemRepository,
                       UserRepository userRepository,
                       DigitalAssetService digitalAssetService) {
    this.portfolioRepository = portfolioRepository;
    this.portfolioItemRepository = portfolioItemRepository;
    this.userRepository = userRepository;
    this.digitalAssetService = digitalAssetService;
}
```
Ingen @RequiredArgsConstructor - allt manuellt!

#### 5. Controllers

**DigitalAssetController:**
- `GET /api/assets` - Lista alla assets
- `GET /api/assets/{id}` - Hämta specifik asset
- `GET /api/assets/symbol/{symbol}` - Hämta via symbol
- `POST /api/assets` - Skapa ny asset
- `DELETE /api/assets/{id}` - Radera asset

**PortfolioController:**
- `GET /api/portfolios` - Lista användarens portfolios
- `POST /api/portfolios` - Skapa ny portfolio
- `GET /api/portfolios/{id}` - Hämta specifik portfolio
- `PUT /api/portfolios/{id}` - Uppdatera portfolio
- `DELETE /api/portfolios/{id}` - Radera portfolio
- `GET /api/portfolios/{id}/items` - Lista portfolio items
- `POST /api/portfolios/{id}/items` - Lägg till asset
- `PUT /api/portfolios/{id}/items/{itemId}` - Uppdatera item
- `DELETE /api/portfolios/{id}/items/{itemId}` - Radera item

Alla endpoints använder `@AuthenticationPrincipal User user` för automatisk user-extraktion från JWT.

#### 6. KRITISK FIX: JwtRequestFilter

**Problem:** `@AuthenticationPrincipal User user` returnerade `null` i alla controllers → NullPointerException

**Root Cause:**  
JwtRequestFilter satte Spring Security's `UserDetails` objekt som principal, men controllers förväntade sig vår custom `User` entity.

**Lösning:**
Uppdaterade `JwtRequestFilter.java`:
```java
@Component
public class JwtRequestFilter extends OncePerRequestFilter {
    private final UserRepository userRepository;  // TILLAGT!
    
    @Override
    protected void doFilterInternal(...) {
        if (jwtUtil.validateToken(jwt, userDetails)) {
            // NYTT: Hämta faktiska User entity från DB
            User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
            
            // NYTT: Sätt User entity som principal (inte UserDetails)
            UsernamePasswordAuthenticationToken authToken = 
                new UsernamePasswordAuthenticationToken(
                    user,  // User entity här istället för userDetails!
                    null, 
                    user.getRoles().stream()
                        .map(role -> new SimpleGrantedAuthority(role.name()))
                        .collect(Collectors.toList()));
            
            SecurityContextHolder.getContext().setAuthentication(authToken);
        }
    }
}
```

**Resultat:** @AuthenticationPrincipal fungerar nu perfekt i alla controllers!

### Package Migration

Flyttade för konsistens:
- `User.java`: model → entity package
- `Role.java`: model → entity package

**Uppdaterade imports i:**
- AuthService.java
- CustomUserDetailsService.java  
- UserRepository.java

### Testning med curl

#### Setup
```bash
# 1. Login och få token
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"portfoliotest@test.com","password":"test1234"}'

# 2. Spara token
export TOKEN="eyJhbGciOiJIUzI1NiJ9..."
```

#### Testade endpoints
```bash
# Skapa digital asset
curl -X POST http://localhost:8080/api/assets \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"symbol":"BTC","name":"Bitcoin","coingeckoId":"bitcoin"}'

# Skapa portfolio
curl -X POST http://localhost:8080/api/portfolios \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"name":"Min Crypto Portfolio","description":"Mina digitala tillgångar"}'

# Lista portfolios
curl http://localhost:8080/api/portfolios \
  -H "Authorization: Bearer $TOKEN"
```

**Verifiering i logs:**
```
Hibernate: select u1_0.id, u1_0.email... from users where email=?
Hibernate: select r1_0.user_id, r1_0.role from user_roles where user_id=?
Hibernate: insert into portfolios (created_at, description, name, updated_at, user_id) values (?, ?, ?, ?, ?)
```

✅ Alla endpoints fungerar korrekt!

### Build och Deployment

```bash
# 1. Rebuild med uppdaterad JwtRequestFilter
cd tradingbots-backend
mvn clean package -DskipTests

# 2. Starta backend
export JAVA_HOME=/opt/homebrew/opt/openjdk@17
$JAVA_HOME/bin/java -jar target/tradingbots-backend-0.0.1-SNAPSHOT.jar

# Backend startade på port 8080
```

### Git Commit

```bash
git add -A
git commit -m "Fas 3: Portfolio Management Backend - BACKUP-PUNKT 3"
git push origin main
```

### Lärdomar och Best Practices

1. **Ingen Lombok:** Manuella getters/setters ger full kontroll och enklare debugging. Lombok annotation processing var problematiskt.

2. **BigDecimal för finansiella värden:** ALDRIG använd double/float för pengar. BigDecimal ger exakt precision.

3. **Ownership validation i service layer:** Alla PortfolioService-metoder validerar att `userId` matchar portfolio owner. Kritiskt för säkerhet.

4. **@AuthenticationPrincipal kräver rätt principal-typ:** Om du sätter `UserDetails` i Security Context men försöker få `User` i controller → null. Måste matcha exakt.

5. **Cascade operations:** `orphanRemoval = true` på OneToMany städar upp automatiskt. När Portfolio raderas, raderas alla PortfolioItems.

6. **Unique constraints på databas-nivå:** `@UniqueConstraint(columnNames = {"portfolio_id", "digital_asset_id"})` förhindrar dubbletter även om application logic missar.

7. **FetchType.EAGER vs LAZY:**
   - EAGER: DigitalAsset i PortfolioItem (vi behöver nästan alltid asset-info)
   - LAZY: User i Portfolio (vi behöver inte alltid user-info)

8. **Constructor injection utan Lombok:** Skriv manuella constructors istället för @RequiredArgsConstructor. Mer verbose men tydligare dependencies.

9. **JWT token expires:** 24 timmar validity. Om token slutar fungera, logga in igen och få ny token med `export TOKEN="..."`.

### Nästa Steg: Fas 3 Frontend

Nu implementerar vi frontend för portfolio management:
- Portfolio dashboard med översikt
- Skapa ny portfolio (modal/form)
- Lägg till/ta bort assets i portfolio
- Visa innehav med current price från CoinGecko API
- Charts för portfolio value över tid (Recharts)
- Responsive design (mobile-first)
