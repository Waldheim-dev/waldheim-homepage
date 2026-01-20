---
title: "Aether: Sicherer, ephemerer Dateitransfer"
isTopProject: true
description: "Entwicklung von Aether: Eine Plattform für sicheren, zeitlich begrenzten Dateitransfer mit Ende-zu-Ende-Verschlüsselung und Auto-Burn-Funktion."
shortDescription: "Entwicklung von Aether für sicheren, selbstzerstörenden Dateitransfer."
pubDate: "2025-12-01"
category: "entwicklung"
heroImage: "referenzen/waldheim-dev/aether/aether_homepage.png"
assets:
  [
    "referenzen/waldheim-dev/aether/aether_homepage.png",
    "referenzen/waldheim-dev/aether/aether_login.png",
    "referenzen/waldheim-dev/aether/aether_audit.png",
    "referenzen/waldheim-dev/aether/aether_dashboard.png",
    "referenzen/waldheim-dev/aether/aether_settings.png",
  ]
problem: "Traditionelle Cloud-Speicher sammeln Nutzerdaten, speichern Dateien dauerhaft und bieten keine Garantie für automatische Löschung. Für sensible Daten fehlt eine sichere, ephemere Alternative ohne Datenvermüllung."
solution: "Entwicklung von Aether als Plattform für zeitlich begrenzten Dateitransfer. Auto-Burn löscht Dateien nach Ablauf automatisch, TLS 1.3 und CDN sorgen für sichere Übertragung, DSGVO-konforme Infrastruktur in Deutschland. Von 100 MB (kostenlos) bis 50 GB (Pro-Tier)."
client: {
    name: "Waldheim.dev",
    web: {name: "waldheim.dev", url: "https://www.waldheim.dev"},
    description: "Kleinunternehmen für Design, Webentwicklung und Prozessoptimierung, mit Fokus auf maßgeschneiderte IT-Lösungen und Automatisierung.",
    shortDescription: "IT-Dienstleister für Design, Entwicklung und Optimierung"
    }
tags:
  [
    "Sicherheit",
    "Verschlüsselung",
    "TLS 1.3",
    "Auto-Burn",
    "Dateitransfer",
    "Go",
    "REST API",
    "PostgreSQL",
    "Valkey",
    "Docker",
    "CDN",
    "DSGVO",
    "Progressive Web App",
    "Tailwind CSS",
    "TypeScript",
    "Playwright"
  ]
techStack: [
    "go",
    "ts",
    "html",
    "css",
    "tailwind",
    "docker",
    "postgress",
    "valkey",
    "git",
    "gitlab",
    "linux",
    "playwright",
    "nodejs",
    "webstandards"
]
general: [
    "Entwicklung einer sicheren Plattform für ephemeren Dateitransfer",
    "Auto-Burn-Funktion für automatische Löschung nach Ablauf",
    "TLS 1.3 für Ende-zu-Ende-Verschlüsselung",
    "CDN-Integration für weltweite Beschleunigung",
    "DSGVO-konforme Infrastruktur in Deutschland",
    "Flexible Tier-Modelle von kostenlos bis Pro (50 GB)"
]
frontend: [
    "Progressive Web App für Desktop und Mobile",
    "Modernes UI mit Tailwind CSS und TypeScript",
    "Drag & Drop Upload mit Fortschrittsanzeige",
    "Dark Mode optimiert für bessere Lesbarkeit",
    "Responsive Design für alle Bildschirmgrößen",
    "End-to-End-Tests mit Playwright"
]
backend: [
    "Go-basiertes Backend für hohe Performance und Sicherheit",
    "REST-API-Architektur für flexible Integration",
    "PostgreSQL für Metadaten und Nutzerverwaltung",
    "Valkey für Session-Management und Caching",
    "TLS 1.3 für sichere Datenübertragung",
    "Auto-Burn-Scheduler für zeitgesteuerte Löschung",
    "CDN-Anbindung für globale Verfügbarkeit"
]
design: [
    "Minimalistisches, futuristisches Design (Particle-Wave-Matter Metapher)",
    "Klare Hierarchie für schnelle Orientierung",
    "Touch-optimierte Bedienung für mobile Geräte",
    "Konsistente Farbschemata (rot-gradients) für Branding"
]
keywords:
    - Aether
    - Dateitransfer
    - File Transfer
    - Verschlüsselung
    - TLS 1.3
    - Auto-Burn
    - Ephemeral Storage
    - Secure Sharing
    - DSGVO
    - CDN
    - Go
    - PostgreSQL
    - Valkey
    - Progressive Web App
    - waldheim.dev
    - Cloud Storage
    - Temporary Files
    - Self-Destructing

---

## Projektübersicht

**Aether** ist eine moderne Plattform für sicheren, zeitlich begrenzten Dateitransfer. Mit Auto-Burn-Funktion, TLS 1.3 und DSGVO-konformer Infrastruktur bietet Aether Entwicklern, Kreativen und Teams eine sichere Alternative zu traditionellen Cloud-Speichern.

## Herausforderungen

- **Dauerhafte Datenspeicherung**: Cloud-Anbieter löschen Dateien nicht automatisch
- **Fehlende Verschlüsselung**: Unverschlüsselte Übertragung sensibler Daten
- **Datenvermüllung**: Keine Kontrolle über Lebensdauer von Dateien
- **DSGVO-Compliance**: Intransparente Speicherorte und Datenverarbeitung
- **Vendor Lock-in**: Abhängigkeit von großen Cloud-Anbietern

## Lösung

Aether wurde als **ephemere Dateitransfer-Plattform** mit folgenden Kernfeatures entwickelt:

- **Auto-Burn**: Automatische Löschung nach Ablauf (24h bis 1 Jahr je nach Tier)
- **TLS 1.3**: Ende-zu-Ende-Verschlüsselung für sichere Übertragung
- **CDN-Beschleunigung**: Weltweite Verfügbarkeit und schnelle Downloads
- **DSGVO-konform**: Server-Standort Deutschland, transparente Datenverarbeitung
- **Flexible Tiers**: Von 100 MB (kostenlos) bis 50 GB (Pro)

## Technische Highlights

### Frontend
- **Progressive Web App**: Installation auf allen Plattformen
- **TypeScript**: Typsichere Entwicklung
- **Tailwind CSS**: Modernes, responsives Design
- **Drag & Drop**: Intuitive Upload-Erfahrung

### Backend
- **Go**: Hochperformantes, sicheres Backend
- **PostgreSQL**: Metadaten und Nutzerverwaltung
- **Redis**: Session-Management und Rate-Limiting
- **TLS 1.3**: Maximale Übertragungssicherheit
- **Scheduler**: Automatische Löschung abgelaufener Dateien

### DevOps
- **Docker**: Containerisierung für einfaches Deployment
- **CDN**: Cloudflare für globale Verfügbarkeit
- **Monitoring**: Audit-Logs für Compliance

## Tier-Modelle

### Particle (Free)
- 100 MB Limit
- 24 Stunden Retention
- 1 File Link

### Wave (8€/Monat)
- 5 GB Limit
- 30 Tage Retention
- 10 Links pro Datei

### Matter (24€/Monat)
- 50 GB Limit
- 1 Jahr Retention
- 50 Links pro Datei

## Ergebnis

Aether ist seit **Dezember 2025** unter [aether.waldheim.dev](https://aether.waldheim.dev) verfügbar und bietet:

- ✅ **Auto-Burn** für automatische Löschung
- ✅ **TLS 1.3** für maximale Sicherheit
- ✅ **CDN-beschleunigt** für weltweite Performance
- ✅ **DSGVO-konform** mit Server-Standort Deutschland
- ✅ **Kostenloser Tier** mit 100 MB für Einsteiger

Die Plattform wird kontinuierlich weiterentwickelt mit Fokus auf Sicherheit, Performance und Datenschutz.
