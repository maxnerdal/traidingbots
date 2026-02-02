# Crypto Portfolio Backend

Backend service för Crypto Portfolio Management System, byggd med Spring Boot och PostgreSQL.

## Teknisk Stack

- **Java**: 17
- **Spring Boot**: 3.2.1
- **Database**: PostgreSQL
- **Security**: Spring Security + JWT
- **ORM**: Hibernate/JPA

## Förutsättningar

- Java 17 eller högre
- Maven 3.6+
- PostgreSQL 14+ (körande på localhost:5432)

## Database Setup

1. Installera PostgreSQL om du inte har det
2. Skapa databas:
```sql
CREATE DATABASE cryptoportfolio;
```

3. Uppdatera credentials i `src/main/resources/application.properties` om nödvändigt

## Köra Applikationen

```bash
# Bygg projektet
mvn clean install

# Kör applikationen
mvn spring-boot:run
```

Applikationen startar på `http://localhost:8080`

## Testa att det fungerar

```bash
curl http://localhost:8080/api/health
```

Förväntad response:
```json
{
  "status": "UP",
  "timestamp": "2026-01-26T...",
  "service": "Crypto Portfolio Backend",
  "version": "0.0.1-SNAPSHOT"
}
```

## Projektstruktur

```
src/main/java/com/cryptoportfolio/
├── CryptoPortfolioApplication.java  # Main application class
├── controller/                       # REST Controllers
├── service/                          # Business logic
├── repository/                       # Data access layer
├── model/                            # Entity models
├── dto/                              # Data Transfer Objects
├── config/                           # Configuration classes
└── security/                         # Security configuration
```

## Nästa Steg

- [ ] Konfigurera Spring Security
- [ ] Implementera JWT authentication
- [ ] Skapa User entity och repository
- [ ] Bygga registrering och login endpoints
