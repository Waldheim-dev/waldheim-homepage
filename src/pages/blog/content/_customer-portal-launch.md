---
title: "🎉 Das neue Waldheim Customer Portal ist live – Zentrale Verwaltung für alle unsere Produkte!"
description: "Wir stellen vor: Das Customer Portal – Ihre zentrale Plattform zur Verwaltung von Lizenzen, Abonnements und Support für Ecodrive, Socialverse und Silvacore. Mit vollständiger Stripe-Integration, Multi-User-System und 2FA-Sicherheit."
pubDate: "2025-10-09"
heroImage: "/referenzen/waldheim-dev/customer-portal/customer_portal_dashboard.webp"
imagePrompt: "Professional high-tech 3D render or minimalist illustration for a blog post titled '🎉 Das neue Waldheim Customer Portal ist live – Zentrale Verwaltung für alle unsere Produkte!'. Theme: Wir stellen vor: Das Customer Portal – Ihre zentrale Plattform zur Verwaltung von Lizenzen, Abonnements und Support für Ecodrive, Socialverse und Silvacore. Mit vollständiger Stripe-Integration, Multi-User-System und 2FA-Sicherheit.. Style: Modern enterprise glass aesthetic, dark mode, accent colors (cyan, amber, or violet), high resolution, 16:9 aspect ratio."
aiGenerated: false
author: "markus-waldheim"
keywords: "Customer Portal, Lizenzverwaltung, Abonnementverwaltung, Waldheim.dev, Ecodrive, Socialverse, Silvacore, SaaS, Stripe, Go, HTMX, PostgreSQL, 2FA, WebAuthn, Ticketing, Support-System"
---

## Das Customer Portal ist da – Ihre zentrale Verwaltungsplattform! 🚀

Ich freue mich riesig, Ihnen heute das **Waldheim Customer Portal** vorzustellen – eine zentrale Plattform, die die Verwaltung aller unserer Produkte (Ecodrive, Socialverse und Silvacore) revolutioniert! 🎯

## Was ist das Customer Portal? 🤔

Das Customer Portal ist Ihre **All-in-One-Lösung** für:

- **📜 Lizenzverwaltung**: Automatische Generierung und Verwaltung Ihrer Produktlizenzen
- **💳 Abonnements**: Vollständige Stripe-Integration für sichere Zahlungsabwicklung
- **🎫 Support**: Dialog-basiertes Ticket-System mit E-Mail-Benachrichtigungen
- **📊 Monitoring**: Echtzeit-Überwachung Ihrer Produktnutzung und Limits
- **👥 Multi-User**: Verwalten Sie Teamzugriffe mit rollenbasierter Zugriffskontrolle

## Kernfunktionen im Detail 🛠️

### Automatische Lizenzverwaltung
Keine manuellen Prozesse mehr! Das Portal generiert automatisch **UUID-basierte License Keys** für alle Ihre Produkte:
- **Ecodrive**: Fahrzeugkosten-Management
- **Socialverse**: AI Social Media Automatisierung
- **Silvacore**: WEG-Verwaltungssoftware

Jede Lizenz wird automatisch aktiviert, verlängert und bei Bedarf deaktiviert – vollständig automatisiert durch die Stripe-Integration.

### Intelligentes Ticket-System
Brauchen Sie Hilfe? Unser **dialog-basiertes Support-System** macht's einfach:
- 💬 Direkte Kommunikation mit unserem Support-Team
- 📧 Automatische E-Mail-Benachrichtigungen
- 📎 Dateianhänge für Screenshots oder Logs
- ⚡ Status-Tracking (Offen, In Bearbeitung, Geschlossen)

### Vollständige Stripe-Integration
Abonnements und Zahlungen? **Alles an einem Ort**:
- Sichere Checkout-Sessions
- Automatische Abonnementverwaltung
- Echtzeit-Webhook-Verarbeitung
- Zugriff auf Ihre Rechnungshistorie
- Plan-Upgrades und -Downgrades mit einem Klick

### Produktmonitoring in Echtzeit
Behalten Sie den Überblick über Ihre Nutzung:
- 🚗 **Ecodrive**: Anzahl Fahrzeuge, Benutzer, Trips
- 📱 **Socialverse**: Genutzte AI-Prompts, verbleibende Credits
- 🏢 **Silvacore**: Verwaltete WEGs, Storage-Nutzung

## Technische Highlights 💻

Als Entwickler bin ich besonders stolz auf den **modernen Tech-Stack**:

### Backend
- **Go 1.25** mit Gin Framework für Performance
- **PostgreSQL 18** für zuverlässige Datenhaltung
- **Valkey 8** (Redis-Fork) für Sessions und Caching
- **GORM** als elegante ORM-Lösung

### Frontend
- **Server-Side Rendering** mit Go Templates
- **HTMX** für moderne Interaktivität ohne JavaScript-Overhead
- **TailwindCSS + DaisyUI** für konsistentes, modernes Design
- **Alpine.js** für clientseitige Logik

### Sicherheit
Ihre Daten sind bei uns sicher:
- 🔐 **Session-basierte Authentifizierung** mit Secure Cookies
- 🔑 **2FA** mit TOTP (Google Authenticator, Authy)
- 🎫 **Passkey-Support** via WebAuthn
- 🛡️ **CSRF-Protection** und Rate Limiting
- 👮 **RBAC** mit drei Benutzerrollen (Admin, Kundenbetreuer, Kunde)

## Consulting-Buchungen jetzt verfügbar! ⏱️

Neu im Portal: Buchen Sie direkt **individuelle Consulting-Stunden** (70€/Stunde) für:
- Technische Beratung
- Custom Feature-Entwicklung
- Optimierung Ihrer Workflows
- Schulungen und Onboarding

Die Abrechnung erfolgt automatisch über Stripe – einfach, transparent und sicher.

## Für alle unsere Produkte 🌟

Das Portal unterstützt **alle drei Waldheim-Produkte** mit individuellen Pricing-Modellen:

### Ecodrive
Von kostenlos (1 Fahrzeug) bis Premium (unbegrenzt) – perfekt skalierbar für Privatpersonen und Unternehmen.

### Socialverse
AI-gestütztes Social Media Management mit flexiblen Pay-per-Use oder Abo-Optionen.

### Silvacore
WEG-Verwaltung mit skalierbarem Storage-Modell – ideal für Hausverwaltungen jeder Größe.

## Deployment & Infrastruktur 🚀

Das Portal läuft auf einer **robusten, produktionsreifen Infrastruktur**:
- Docker-basierte Containerisierung
- Traefik als Reverse Proxy mit automatischem Let's Encrypt SSL
- Automatisches Deployment via GitLab CI/CD
- Umfassendes Testing (E2E mit Playwright, Unit Tests)

## Was kommt als Nächstes? 🔮

Das ist erst der Anfang! Geplant sind:
- 📊 Erweiterte Analytics-Dashboards
- 🔔 Webhook-Integration für Produkt-Events
- 📱 Mobile App für unterwegs
- 🌍 Mehrsprachige Oberfläche
- 🎨 Customizable Dashboards

## Jetzt testen! 🎯

Das Customer Portal ist **ab sofort verfügbar** für alle Waldheim.dev-Kunden:

👉 **[Zum Customer Portal](https://portal.waldheim.dev)**

Noch kein Kunde? Testen Sie unsere Produkte kostenlos:
- [Ecodrive](https://www.eco-drive.app)
- [Socialverse](https://socialverse.eco-drive.app)
- [Silvacore](https://www.silvacore.app)

## Ihr Feedback ist Gold wert! 💎

Das Portal befindet sich in **aktiver Entwicklung** und wird kontinuierlich verbessert. Ihre Wünsche und Anregungen helfen uns, die beste Kundenerfahrung zu schaffen!

📧 **Kontakt**: support@waldheim.dev

---

**Technische Details:**
- **Stack**: Go, PostgreSQL, Valkey, HTMX, TailwindCSS
- **Testing**: Playwright E2E, Go Unit Tests
- **Security**: 2FA, Passkey, RBAC, CSRF-Protection
- **Integration**: Stripe Payments, E-Mail-Benachrichtigungen

Ich freue mich auf Ihr Feedback und darauf, gemeinsam die Zukunft der Kundenverwaltung zu gestalten! 🚀
-----

**Interessieren Sie sich für dieses Thema oder benötigen Sie Beratung?**  
Ich unterstütze Sie gerne bei Ihren Projekten. [Kontaktieren Sie mich für eine strategische Beratung.](mailto:kontakt@waldheim.dev)
