---
title: "Installation und Konfiguration einer kompletten Entwicklungsumgebung: Angular, Go, PostgreSQL auf Linux."
description: "Ein umfassender Leitfaden, wie ich einen Linux-Rechner von Grund auf als vollständige Entwicklungsmaschine für Full-Stack-Projekte einrichte."
pubDate: "2026-01-08"
heroImage: "/images/blog/installation-und-konfiguration-einer-kompletten-entwicklungsumgebung-angular-go-postgresql-auf-linux.webp"
imagePrompt: "Professional high-tech 3D render or minimalist illustration for a blog post titled 'Installation und Konfiguration einer kompletten Entwicklungsumgebung: Angular, Go, PostgreSQL auf Linux.'. Theme: Ein umfassender Leitfaden, wie ich einen Linux-Rechner von Grund auf als vollständige Entwicklungsmaschine für Full-Stack-Projekte einrichte.. Style: Modern enterprise glass aesthetic, dark mode, accent colors (cyan, amber, or violet), high resolution, 16:9 aspect ratio."
author: "markus-waldheim"
keywords: "Installation, und, Konfiguration, einer, kompletten, Entwicklungsumgebung:, Angular,, Go,, PostgreSQL, auf, Linux."
linkedinPost: "🚀 Neuer Blogbeitrag online: Installation und Konfiguration einer kompletten Entwicklungsumgebung: Angular, Go, PostgreSQL auf Linux."
---

## Die perfekte Schmiede: Full-Stack-Entwicklung unter Linux

Eine produktive Entwicklungsumgebung ist das wichtigste Werkzeug eines Programmierers. Sie sollte stabil, performant und leicht reproduzierbar sein. Während Windows und macOS beliebt sind, bietet Linux (insbesondere Distributionen wie Ubuntu oder Fedora) die direkteste Nähe zur späteren Produktionsumgebung. In diesem Beitrag zeige ich Ihnen mein Setup für eine komplette Full-Stack-Umgebung mit Angular, Go und PostgreSQL auf einem Linux-System.

### 1. Das Fundament: Go und Node.js installieren

Anstatt die oft veralteten Pakete der Distribution zu nutzen, verwende ich Versions-Manager.

*   **Go:** Ich lade das offizielle Tarball von `golang.org` herunter und entpacke es nach `/usr/local`. Wichtig ist das Setzen der `$PATH` Variablen in der `.bashrc` oder `.zshrc`.
*   **Node.js (für Angular):** Hier nutze ich konsequent **nvm** (Node Version Manager). Es erlaubt mir, zwischen verschiedenen Node-Versionen pro Projekt zu springen, ohne globale Berechtigungen (`sudo`) für NPM-Installationen zu benötigen.

### 2. Datenbank-Power: PostgreSQL und Docker

Für die lokale Entwicklung installiere ich PostgreSQL selten direkt im System.

*   **Docker-Compose:** Ich nutze ein `docker-compose.yml` File in jedem Projekt. Dies startet nicht nur die Datenbank, sondern auch Tools wie **pgAdmin** oder **Redis**.
*   **Vorteil:** Die Umgebung ist absolut isoliert. Wenn ich das Projekt wechsle, starte ich einfach einen anderen Container-Stack, ohne dass sich verschiedene Datenbank-Versionen in die Quere kommen.

### 3. Der Editor: VS Code Härtung

Visual Studio Code ist mein Zentrum für Angular und Go.

*   **Extensions:** 
    *   `Go` (offiziell von Google) für IntelliSense und Debugging.
    *   `Angular Language Service` für Template-Validierung.
    *   `EditorConfig` für konsistente Formatierung.
*   **Settings:** Ich aktiviere "Format on Save" und konfiguriere die Go-Extension so, dass sie `goimports` nutzt.

### 4. Workflow-Optimierung: Aliasse und Tools

Kleine Helfer sparen täglich wertvolle Minuten.

*   **Shell-Aliasse:** Ich definiere Aliasse für häufige Befehle wie `dc` für `docker-compose` oder `ga` für `git add`.
*   **HTTP-Clients:** Anstatt Postman nutze ich die VS Code Extension "REST Client", um API-Abfragen direkt aus `.http` Dateien im Repository zu starten. So können auch Teammitglieder die Test-Queries sofort nutzen.

## Fazit: Automatisierung beginnt lokal

Ein sauber konfiguriertes Linux-System ist die ideale Basis für moderne Web-Entwicklung. Durch den Einsatz von Versions-Managern und Docker bleibt das System sauber, während VS Code für die nötige Produktivität sorgt. Wer einmal die Geschwindigkeit und Flexibilität eines optimierten Linux-Workflows erlebt hat, möchte selten zurück.

-----

**Haben Sie Probleme beim Setup Ihrer Entwicklungsumgebung oder suchen nach Optimierungsmöglichkeiten?**  
Ich unterstütze Sie und Ihr Team bei der Einrichtung von standardisierten und effizienten Entwicklungs-Umgebungen unter Linux, Windows (WSL) und macOS. [Lassen Sie uns Ihre Produktivität steigern.](mailto:admin@waldheim.dev)

-----

**Interessieren Sie sich für dieses Thema oder benötigen Sie Beratung?**  
Ich unterstütze Sie gerne bei Ihren Projekten. [Kontaktieren Sie mich für eine strategische Beratung.](mailto:admin@waldheim.dev)