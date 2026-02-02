# Frontend TODO - TradingBots

**Skapad:** 2 februari 2026  
**Status:** Planering

---

## 📋 Navigation & Layout

### 0. Hamburger-meny & Sidomeny

#### 0.1 HamburgerMenu Komponent
- [ ] Skapa hamburger-ikon (☰) komponent
  - 3 horisontella streck
  - Placera i övre vänstra hörnet
  - Animation vid klick (streck → X)
  - Alltid synlig för alla skärmstorlekar

#### 0.2 SideMenu Komponent
- [ ] Skapa slide-in sidomeny
  - Öppnas från vänster
  - Menyval: TradingBots, Portfolio, Markets
  - Smooth slide-in/out animation
  - Ikoner för varje menyval (valfritt)

#### 0.3 Overlay
- [ ] Implementera mörk overlay
  - Visas när menyn är öppen
  - Semi-transparent bakgrund
  - Stäng meny vid klick på overlay
  - Fade in/out animation

#### 0.4 Nya Sidor
- [ ] Skapa TradingBots-sida (tom för nu)
  - React Router route: /tradingbots
  - Placeholder: "TradingBots - Coming soon"
  
- [ ] Skapa Markets-sida (tom för nu)
  - React Router route: /markets
  - Placeholder: "Markets - Coming soon"

- [ ] Uppdatera routing
  - /dashboard → /portfolio (nuvarande Dashboard)
  - Lägg till /tradingbots och /markets routes

#### 0.5 Integration
- [ ] Integrera HamburgerMenu i huvudlayout
  - Hamburger till vänster ☰
  - UserAvatar till höger 👤
  - Fungerar på alla sidor

---

## 📋 Användarmeny & Profil Features

### 1. UI Komponenter (Frontend)

#### 1.1 UserAvatar Komponent
- [ ] Skapa UserAvatar komponent (cirkel med initialer)
  - Hämta firstName + lastName från user
  - Visa första bokstaven från varje (t.ex. "MN")
  - Cirkulär design med appens färgschema
  - Responsiv storlek

#### 1.2 UserMenu Dropdown
- [ ] Skapa UserMenu komponent med dropdown
  - Klickbar UserAvatar som öppnar meny
  - Dropdown-meny med 3 alternativ:
    - Profil
    - Inställningar
    - Logga ut
  - Stäng meny vid klick utanför
  - Smooth animation (fade in/out)

#### 1.3 Integration
- [ ] Integrera UserMenu i Dashboard/huvudlayout
  - Placera i övre högra hörnet
  - Visa alltid när användare är inloggad
  - Responsiv placering (mobil + desktop)

#### 1.4 Cleanup
- [ ] Ta bort "Inloggad som: {user}" text från Dashboard
  - Ersätts av UserAvatar i övre högra hörnet

---

### 2. Profil-sida

#### 2.1 Visa Information
- [ ] Skapa Profil-sida komponent
  - Visa email (read-only tills redigering)
  - Visa firstName + lastName
  - Visa registreringsdatum (createdAt)
  - Tydlig layout med sektioner

#### 2.2 Redigera Namn
- [ ] Implementera redigering av namn
  - Edit-knapp för firstName/lastName
  - Inline eller modal-redigering
  - Validering (inte tomma fält)
  - Spara-knapp med laddningsindikator
  - Bekräftelse vid lyckad uppdatering

#### 2.3 Ändra Email
- [ ] Implementera ändra email
  - Edit-knapp för email
  - Email-validering (format)
  - Kolla om email redan används (backend)
  - Bekräftelse vid lyckad ändring

#### 2.4 Ändra Lösenord
- [ ] Implementera ändra lösenord
  - Separat sektion för säkerhet
  - Fält: Nuvarande lösenord, Nytt lösenord, Bekräfta nytt
  - Lösenordsstyrka-indikator
  - Validering (minst 8 tecken, etc.)
  - Bekräftelse vid lyckad ändring

---

### 3. Inställningar-sida

#### 3.1 Tema (Ljust/Mörkt)
- [ ] Skapa Inställningar-sida komponent
- [ ] Implementera tema-växling
  - Toggle switch (ljust/mörkt)
  - Spara val i localStorage
  - Applicera tema globalt (CSS variables eller tema-provider)
  - Smooth övergång mellan teman

#### 3.2 Språk (Svenska/Engelska)
- [ ] Implementera språkväxling
  - Dropdown eller toggle för SV/EN
  - Spara val i localStorage
  - Översätt UI-texter (i18n eller enkel lösning)
  - Möjlighet att lägga till fler språk senare

---

### 4. Backend API Endpoints

#### 4.1 Uppdatera Profil
- [ ] Backend: PUT /api/user/profile
  - Endpoint för att uppdatera firstName, lastName
  - Validering av input
  - Returnera uppdaterad user

- [ ] Backend: PUT /api/user/email
  - Endpoint för att ändra email
  - Kolla om email redan finns
  - Validering av email-format
  - Returnera uppdaterad user

#### 4.2 Ändra Lösenord
- [ ] Backend: PUT /api/user/password
  - Endpoint för att ändra lösenord
  - Verifiera nuvarande lösenord
  - Hash och spara nytt lösenord
  - Returnera success-meddelande

---

## 🎨 Design Notes

**Färgschema:** Använd befintligt (samma som resten av appen)  
**Placering UserMenu:** Övre högra hörnet (som Spotify)  
**Avatar:** Cirkel med initialer (firstName[0] + lastName[0])  
**Meny-items:** Profil, Inställningar, Logga ut  

---

## 📝 Implementation Notes

- UserAvatar ska vara återanvändbar (kan användas på fler ställen)
- Tema-funktionalitet kan utökas med fler färgscheman senare
- Språk-funktionalitet förberedd för fler språk
- Backend endpoints behöver ownership validation (user kan bara ändra sin egen profil)

---

## ✅ Progress Tracking

**Total:** 0/12 tasks completed  
**UI Components:** 0/3  
**Profil:** 0/4  
**Inställningar:** 0/2  
**Backend:** 0/3  

---

**Nästa steg:** Börja med UserAvatar och UserMenu komponenter
