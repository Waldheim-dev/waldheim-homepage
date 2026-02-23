---
title: "Customer Portal: Lizenz- und Abonnement-Verwaltung für Waldheim-Produkte"
isTopProject: true
description: "Entwicklung des Customer Portals: Eine zentrale Plattform zur Verwaltung von Lizenzen, Support-Tickets und Abonnements für alle Waldheim-Produkte (Ecodrive, Socialverse, Silvacore). Mit vollständiger Stripe-Integration, Multi-User-System und Produktmonitoring."
shortDescription: "Entwicklung des Customer Portals für Lizenz- und Abonnement-Verwaltung."
results:
  - value: "100%"
    label: "Code Coverage"
  - value: "3"
    label: "SaaS Produkte"
  - value: "Multi"
    label: "Tenant Architecture"
overview:
  - title: "Branche"
    meta: "SaaS & Lizenzmanagement"
  - title: "Tech-Basis"
    meta: "Go & HTMX"
  - title: "Sicherheit"
    meta: "2FA & Passkey"
pubDate: "2025-11-05"
category: "entwicklung"
heroImage: "referenzen/waldheim-dev/customer-portal/customer_portal_dashboard.webp"
assets:
  [
    "referenzen/waldheim-dev/customer-portal/customer_portal_dashboard.webp",
    "referenzen/waldheim-dev/customer-portal/customer_portal_abos.webp",
    "referenzen/waldheim-dev/customer-portal/customer_portal_pricing.webp",
    "referenzen/waldheim-dev/customer-portal/customer_portal_consulting.webp",
    "referenzen/waldheim-dev/customer-portal/customer_portal_analytics.webp",
    "referenzen/waldheim-dev/customer-portal/customer_portal_ticketadmin.webp",
    "referenzen/waldheim-dev/customer-portal/customer_portal_admindashboard.webp",
    "referenzen/waldheim-dev/customer-portal/customer_portal_users.webp",
    "referenzen/waldheim-dev/customer-portal/customer_portal_change_plan.webp",
    "referenzen/waldheim-dev/customer-portal/customer_portal_invoice.webp",
    "referenzen/waldheim-dev/customer-portal/customer_portal_abrechnung.webp",
    "referenzen/waldheim-dev/customer-portal/customer_portal_support.webp",
    "referenzen/waldheim-dev/customer-portal/customer_portal_lizenzen.webp",
    "referenzen/waldheim-dev/customer-portal/customer_portal_dashboard_dark.webp",
    "referenzen/waldheim-dev/customer-portal/customer_portal_login.webp",
    "referenzen/waldheim-dev/customer-portal/customer_portal_register.webp",
  ]
problem: "Die Verwaltung von Lizenzen, Abonnements und Support-Anfragen für mehrere Produkte (Ecodrive, Socialverse, Silvacore) über verschiedene Plattformen hinweg war ineffizient und fehleranfällig. Es fehlte eine zentrale, automatisierte Lösung zur Kundenverwaltung, Zahlungsabwicklung und Support-Koordination."
solution: "Entwicklung eines modernen Customer Portals als zentrale Verwaltungsplattform für alle Waldheim.dev-Produkte. Die Lösung bietet automatische Lizenzverwaltung, Stripe-Integration für Abonnements, ein dialogbasiertes Ticket-System und Produktmonitoring. Durch die vollständige Automatisierung und RBAC-basierte Zugriffskontrolle wird die Kundenverwaltung erheblich vereinfacht und professionalisiert."
client: {
    name: "Waldheim.dev",
    web: {name: "waldheim.dev", url: "https://www.waldheim.dev"},
    description: "Kleinunternehmen für Design, Webentwicklung und Prozessoptimierung, mit Fokus auf maßgeschneiderte IT-Lösungen und Automatisierung.",
    shortDescription: "IT-Dienstleister für Design, Entwicklung und Optimierung"
    }
tags:
  [
    "Docker",
    "Go",
    "Gin Framework",
    "GORM",
    "PostgreSQL",
    "Valkey",
    "Redis",
    "HTMX",
    "TailwindCSS",
    "DaisyUI",
    "Stripe",
    "Traefik",
    "Playwright",
    "E2E-Testing",
    "Session-Auth",
    "2FA",
    "Passkey",
    "WebAuthn",
    "RBAC",
    "License Management",
    "Ticketing",
    "Multi-Product",
    "SaaS",
    "Subscription Management",
    "GitLab CI",
    "Code-Security",
    "Clean Code",
    "REST API"
  ]
techStack: [
    "go",
    "postgress",
    "redis",
    "valkey",
    "docker",
    "traefik",
    "tailwind",
    "playwright",
    "vitest",
    "git",
    "gitlab",
    "html",
    "css",
    "js",
    "linux"
]
general: [
    "Zentrale Verwaltungsplattform für drei Produkte (Ecodrive, Socialverse, Silvacore)",
    "Multi-User-System mit RBAC (Admin, Kundenbetreuer, Kunde)",
    "Automatische Lizenzverwaltung mit UUID-basierter Generierung",
    "Vollständige Stripe-Integration für Abonnements und Zahlungen",
    "Dialog-basiertes Ticket-System mit E-Mail-Benachrichtigungen",
    "Produktstatus-Monitoring und Limit-Tracking",
    "Consulting-Buchungssystem (Stundenbasis)",
    "Sicherheit durch Session-Auth, 2FA und Passkey-Support"
]
frontend: [
    "Modernes Server-Side Rendering mit Go HTML Templates",
    "HTMX für interaktive Elemente ohne JavaScript-Overhead",
    "TailwindCSS + DaisyUI für konsistentes Design",
    "Cyan-Teal Gradient Theme mit Glow-Effekten",
    "Alpine.js für clientseitige Interaktivität",
    "FontAwesome Pro für professionelle Icons",
    "Responsive Design für alle Endgeräte",
    "E2E-Testing mit Playwright",
    "Frontend Unit Tests mit Vitest",
    "Automatisches Asset-Building und Deployment"
]
backend: [
    "Go 1.25 mit Gin Web Framework",
    "GORM als ORM für PostgreSQL",
    "Viper für Konfigurationsmanagement",
    "Valkey (Redis-Fork) für Caching und Sessions",
    "Session-basierte Authentifizierung mit Secure Cookies",
    "2FA mit TOTP (Time-based One-Time Password)",
    "WebAuthn für Passkey-Support",
    "RBAC mit drei Benutzerrollen",
    "REST API für Lizenzvalidierung",
    "Stripe Webhooks für Zahlungsereignisse",
    "E-Mail-Versand mit SMTP (Gomail)",
    "Cron Jobs für automatische Synchronisation",
    "CSRF-Protection und Rate Limiting",
    "UUID-basierte Datenbankmodelle",
    "Umfassendes Unit Testing (100% Coverage-Ziel)"
]
design: [
    "TailwindCSS-basiertes UI mit DaisyUI-Komponenten",
    "Cyan-Teal Farbschema mit modernen Glow-Effekten",
    "Konsistente Designsprache über alle Seiten",
    "Responsive Design für Mobile, Tablet und Desktop",
    "Accessibility-Optimierungen (WCAG-konform)",
    "Intuitive Navigation und User Experience",
    "Dark Mode Support durch DaisyUI",
    "Moderne Card-basierte Layouts"
]
devops: [
    "Docker und Docker Compose für Containerisierung",
    "Traefik als Reverse Proxy mit Let's Encrypt SSL",
    "Multi-Stage Dockerfiles für optimierte Images",
    "GitLab CI/CD Pipeline",
    "Air für Hot-Reload in Development",
    "Automatisches Frontend-Asset-Building",
    "PostgreSQL 18 und Valkey 8 Container",
    "Mailhog für lokale E-Mail-Vorschau",
    "Production-Ready Deployment mit docker-compose.prod.yml",
    "Environment-basierte Konfiguration (.env)"
]
features: [
    "Lizenzverwaltung",
    "Automatische Generierung von Produktlizenzen",
    "UUID-basierte License Keys (Format: PRODUCT-XXXX-XXXX-XXXX-XXXX)",
    "API-Endpunkt zur Lizenzvalidierung für Produkte",
    "Limit-Tracking (Fahrzeuge, WEGs, Prompts, Storage)",
    "Automatische Aktivierung/Deaktivierung",
    "Ticket-System",
    "Dialog-basierte Support-Tickets",
    "E-Mail-Benachrichtigungen bei neuen Nachrichten",
    "Status-Tracking (Offen, In Bearbeitung, Geschlossen)",
    "Dateianhänge für Tickets",
    "Kundenbetreuer-Zuweisung",
    "Stripe-Integration",
    "Vollständige Abonnementverwaltung",
    "Checkout-Session-Erstellung",
    "Webhook-Verarbeitung für Zahlungsereignisse",
    "Automatische Lizenzverlängerung bei Zahlung",
    "Kundenportal für Abonnementsverwaltung",
    "Produktmonitoring",
    "Status-Tracking für Ecodrive, Socialverse, Silvacore",
    "Metriken-Erfassung (Fahrzeuge, Benutzer, WEGs, etc.)",
    "API-Endpunkt für Produktstatus-Updates",
    "Automatische Benachrichtigungen bei Limitüberschreitung",
    "Consulting",
    "Stundenbuchungssystem (70€/Stunde)",
    "Historische Buchungsübersicht",
    "Automatische Rechnung über Stripe"
]
products: [
    "Ecodrive (Fahrzeugkosten-Management)",
    "Free: 1 Fahrzeug, 1 Benutzer",
    "Basic: 3 Fahrzeuge, 1 Benutzer (5€/Monat)",
    "Pro: 10 Fahrzeuge, 10 Benutzer (15€/Monat)",
    "Premium: Unbegrenzt (250€/Monat)",
    "Socialverse (AI Social Media Management)",
    "Free: Basis-Features",
    "Pay-per-Use: 0,33€ pro Prompt",
    "Pro: 100 Prompts/Monat (31,35€)",
    "Premium: 1000 Prompts/Monat (313,50€)",
    "Silvacore (WEG-Verwaltung)",
    "Starter: 1 WEG, 2GB Storage (kostenlos)",
    "Professional: 6 WEGs, 2GB/WEG (25€/Monat)",
    "Enterprise: Unbegrenzt (individuell)",
    "Zusatzkosten: +5€/WEG, +2€/GB Storage"
]
security: [
    "HTTPS mit Let's Encrypt in Production",
    "Session-basierte Authentifizierung mit Secure Cookies",
    "2FA mit TOTP (Google Authenticator, Authy)",
    "Passkey-Support via WebAuthn",
    "RBAC mit drei Rollen (Admin, Kundenbetreuer, Kunde)",
    "CSRF-Protection auf allen Formularen",
    "Rate Limiting für API-Endpunkte",
    "Bcrypt für Passwort-Hashing",
    "Sichere Session-Verwaltung mit Valkey",
    "Input-Validierung und Sanitization"
]
testing: [
    "Backend Unit Tests mit Go Testing",
    "Coverage-Reports mit go tool cover",
    "E2E-Tests mit Playwright (TypeScript)",
    "Frontend Unit Tests mit Vitest",
    "Automatische Test-Ausführung in CI/CD",
    "100% Coverage-Ziel für kritische Komponenten"
]
keywords:
  - Customer Portal
  - Lizenzverwaltung
  - License Management
  - Subscription Management
  - Abonnementverwaltung
  - Ticket-System
  - Support-System
  - Multi-Product
  - SaaS
  - Stripe Integration
  - Go
  - Golang
  - HTMX
  - TailwindCSS
  - PostgreSQL
  - Redis
  - Valkey
  - Docker
  - Traefik
  - 2FA
  - Passkey
  - WebAuthn
  - RBAC
  - Ecodrive
  - Socialverse
  - Silvacore
  - waldheim.dev
  - REST API
  - Session Auth
  - E2E Testing
  - Playwright


---

## 📋 Projektübersicht

Das **Customer Portal** ist eine zentrale Verwaltungsplattform für alle Waldheim-Produkte. Es ermöglicht die vollautomatische Verwaltung von Lizenzen, Abonnements, Support-Tickets und Produktstatus für **Ecodrive** (Fahrzeugkosten-Management), **Socialverse** (AI Social Media) und **Silvacore** (WEG-Verwaltung).

### Kernfunktionen
- **Lizenzverwaltung**: Automatische Generierung, Validierung und Verwaltung von Produktlizenzen
- **Stripe-Integration**: Vollständige Zahlungs- und Abonnementverwaltung
- **Ticket-System**: Dialog-basierter Support mit E-Mail-Benachrichtigungen
- **Multi-User-System**: RBAC mit Admin, Kundenbetreuer und Kunden-Rollen
- **Produktmonitoring**: Status-Tracking und Limit-Überwachung
- **Consulting**: Stundenbuchungssystem für individuelle Dienstleistungen

## 🛠️ Technische Highlights

### Backend-Architektur
- **Go 1.23** für Performance und Typsicherheit
- **Gin Framework** für effizientes Routing
- **GORM** als elegante ORM-Lösung
- **PostgreSQL 18** für zuverlässige Datenhaltung
- **Valkey 8** (Redis-Fork) für Sessions und Caching

### Frontend-Ansatz
- **Server-Side Rendering** mit Go Templates
- **HTMX** für moderne Interaktivität ohne JavaScript-Overhead
- **TailwindCSS + DaisyUI** für konsistentes Design
- **Alpine.js** für clientseitige Logik

### Sicherheit & Authentifizierung
- Session-basierte Auth mit Secure Cookies
- 2FA mit TOTP (Google Authenticator)
- Passkey-Support via WebAuthn
- CSRF-Protection und Rate Limiting

### DevOps & Testing
- Docker-basierte Containerisierung
- Traefik mit Let's Encrypt SSL
- E2E-Tests mit Playwright
- Unit Tests mit 100% Coverage-Ziel
- GitLab CI/CD Pipeline

## 📊 Produktintegration

Das Portal verwaltet drei unterschiedliche Produkte mit jeweils eigenen Pricing-Modellen:

### Ecodrive
Fahrzeugkosten-Management mit flexiblen Plänen von kostenlos bis Enterprise.

### Socialverse
AI-gestütztes Social Media Management mit Pay-per-Use Option.

### Silvacore
WEG-Verwaltungssoftware mit skalierbarem Storage-Modell.

## 🎯 Technische Herausforderungen & Lösungen

### Challenge: Multi-Product-Lizenzierung
**Lösung**: UUID-basierte License Keys mit produktspezifischen Prefixes (z.B. ECODRIVE-XXXX-XXXX-XXXX-XXXX)

### Challenge: Stripe-Synchronisation
**Lösung**: Webhook-basierte Event-Verarbeitung mit automatischer Lizenzverlängerung und Cron-Jobs für periodische Synchronisation

### Challenge: Skalierbare Session-Verwaltung
**Lösung**: Valkey (Redis-Fork) als Session-Store mit automatischer Expiration

### Challenge: E2E-Testing komplexer Flows
**Lösung**: Playwright-basierte Tests mit TypeScript für Payment-, Auth- und Ticket-Workflows

## 📈 Entwicklungsprozess

- **Projektdauer**: Kontinuierliche Entwicklung seit 2025
- **Team**: Solo-Entwicklung (Waldheim.dev)
- **Methodik**: Agile Entwicklung mit GitLab Issues
- **Testing**: Test-Driven Development mit 100% Coverage-Ziel
- **Deployment**: Automatisiert via Docker Compose und GitLab CI/CD

## 🚀 Deployment & Infrastruktur

- **Production**: Docker Compose mit Traefik Reverse Proxy
- **SSL**: Automatisches Let's Encrypt
- **Database**: PostgreSQL 18 mit GORM Migrations
- **Caching**: Valkey 8 für Sessions und Performance
- **Monitoring**: Produktstatus-API für alle integrierten Produkte
- **Email**: SMTP mit Mailhog für lokale Entwicklung

## 🔗 API-Dokumentation

Das Portal bietet REST-APIs für:
- Lizenzvalidierung (für Produkt-Integration)
- Produktstatus-Updates
- Webhook-Verarbeitung (Stripe)
- Swagger-Dokumentation unter `/api/docs`

## 📚 Lessons Learned

- **Go's Typsicherheit** reduziert Bugs erheblich im Vergleich zu dynamisch getypten Sprachen
- **HTMX** ermöglicht moderne UX ohne komplexe Frontend-Frameworks
- **Server-Side Rendering** vereinfacht Deployment und SEO
- **Stripe Webhooks** erfordern sorgfältiges Error Handling und Idempotenz
- **E2E-Tests** sind kritisch für Payment-Flows

## 🎓 Erkenntnisse & Best Practices

- Strikte Trennung von Business Logic (Services) und HTTP Handlern
- UUID-basierte Datenmodelle für bessere Skalierbarkeit
- Environment-basierte Konfiguration mit Viper
- Umfassendes Testing (Unit, Integration, E2E)
- Docker Multi-Stage Builds für kleinere Images
- Rate Limiting als First-Class Citizen

---

**Status**: In aktiver Entwicklung  
**Maintainer**: Waldheim.dev Development  
**Lizenz**: Proprietär  
**Kontakt**: support@waldheim.dev
