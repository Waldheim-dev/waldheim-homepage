---
title: "Amigo: Autonomes Multi-Agent Framework in Go"
isTopProject: true
description: "Entwicklung von Amigo: Ein professionelles Go-Framework zur Orchestrierung spezialisierter KI-Agenten mit MCP-Support und Enterprise-Reliability."
shortDescription: "Ein autonomes Multi-Agenten-Framework für komplexe Software-Engineering-Tasks."
pubDate: "2026-04-10"
category: "entwicklung"
heroImage: "referenzen/waldheim-dev/amigo/amigo_main.png"
assets:
  [
    "referenzen/waldheim-dev/amigo/amigo_main.png",
    "referenzen/waldheim-dev/amigo/amigo_dashboard.png",
    "referenzen/waldheim-dev/amigo/amigo_tui.png",
  ]
problem: "KI-Modelle allein stoßen bei komplexen, mehrstufigen Aufgaben oft an Grenzen. Es fehlte ein robustes, performantes Framework, das spezialisierte Agenten koordiniert, Werkzeuge über standardisierte Protokolle (MCP) einbindet und Ausfallsicherheit für den Produktiveinsatz bietet."
solution: "Entwicklung von Amigo als Go-basiertes Framework für autonome Agenten-Teams. Implementierung von spezialisierten Rollen (Architect, Developer, QA), nativer MCP-Unterstützung und Enterprise-Features wie Circuit Breaker und Multi-Provider Fallback. Integration eines Echtzeit-HTMX-Dashboards und einer Bubble Tea TUI."
client: {
    name: "Waldheim.dev",
    web: {name: "waldheim.dev", url: "https://www.waldheim.dev"},
    description: "Kleinunternehmen für Design, Webentwicklung und Prozessoptimierung, mit Fokus auf maßgeschneiderte IT-Lösungen und KI-Integration.",
    shortDescription: "IT-Dienstleister für Design, Entwicklung und Optimierung"
    }
tags:
  [
    "Open Source",
    "Go",
    "AI Agents",
    "Multi-Agent Systems",
    "MCP Protocol",
    "LLM Orchestration",
    "HTMX",
    "Bubble Tea TUI",
    "SQLite",
    "Vector Search",
    "RAG",
    "Circuit Breaker",
    "Docker",
    "GitHub Actions",
    "Unit Testing",
    "Semantic Memory"
  ]
techStack: [
    "go",
    "htmx",
    "sqlite",
    "docker",
    "git",
    "github",
    "linux",
    "webstandards",
    "ts"
]
general: [
    "Entwicklung eines Frameworks für autonome KI-Agenten in Go",
    "Spezialisierte Agenten-Rollen: Architect, Developer, QA Engineer",
    "Native Unterstützung für das Model Context Protocol (MCP)",
    "Enterprise-Reliability durch Circuit Breaker und Dead Letter Queues",
    "Multi-Provider Fallback (Gemini, Claude, GPT-4o, Ollama)",
    "Open-Source-Ansatz für maximale Transparenz und Erweiterbarkeit"
]
frontend: [
    "Echtzeit-Monitoring-Dashboard basierend auf HTMX",
    "Interaktive Terminal-UI (TUI) mit Bubble Tea",
    "Responsive Web-Oberfläche für Agenten-Logs",
    "Visualisierung von Agenten-Entscheidungen und Tool-Aufrufen"
]
backend: [
    "Hochperformantes Go-Backend für parallele Agenten-Ausführung",
    "Zustandsverwaltung und episches Gedächtnis via SQLite",
    "Semantisches Gedächtnis (RAG) durch integrierte Vektorsuche",
    "Provider-agnostisches Interface für verschiedene LLM-Anbieter",
    "Robuste Fehlerbehandlung und automatische Wiederholungsversuche",
    "Integrierter Webserver für das Dashboard"
]
design: [
    "Modernes Terminal-Design für technische Zielgruppen",
    "Übersichtliche Darstellung komplexer Agenten-Interaktionen",
    "Fokus auf Informationsdichte und Echtzeit-Feedback",
    "Bernstein/Orange-Farbschema für Wiedererkennbarkeit"
]
keywords:
    - Amigo
    - AI Agents
    - Multi-Agent Framework
    - Go Lang
    - Autonomous Agents
    - MCP Support
    - Model Context Protocol
    - Agentic Loops
    - Architect Agent
    - Developer Agent
    - QA Agent
    - HTMX Dashboard
    - Bubble Tea TUI
    - Semantic Memory
    - RAG
    - Enterprise AI
    - Open Source
    - LLM Orchestration
    - waldheim.dev

---

## Projektübersicht

**Amigo** (Autonomous Multi-agent Interface in Go) ist ein professionelles Framework zum Aufbau autonomer Multi-Agenten-Systeme. Es orchestriert spezialisierte Agenten, um komplexe Software-Engineering-Aufgaben selbstständig zu lösen.

## Herausforderungen

- **Komplexität von KI-Tasks**: Einzelne LLM-Aufrufe reichen für Software-Projekte oft nicht aus.
- **Mangelnde Ausfallsicherheit**: KI-APIs können ausfallen oder unzuverlässige Antworten liefern.
- **Tool-Integration**: Es fehlte ein Standard für die Anbindung externer Werkzeuge an Agenten.
- **Transparenz**: Der Denkprozess von Agenten ist oft eine "Black Box" und schwer zu debuggen.

## Lösung

Amigo löst diese Probleme durch einen strukturierten, agentischen Ansatz:

- **Spezialisierung**: Klare Rollentrennung zwischen Planung (Architect), Umsetzung (Developer) und Validierung (QA).
- **Reliability Layer**: Circuit Breaker verhindern Kaskadenfehler; Fallbacks wechseln automatisch zwischen Anbietern (z.B. Gemini zu Claude).
- **MCP-Native**: Direkte Anbindung von Tools über das Model Context Protocol.
- **Episodisches Gedächtnis**: Alle Aktionen werden in SQLite geloggt und stehen für RAG-Analysen zur Verfügung.
- **Zwei Oberflächen**: Eine TUI für Power-User und ein HTMX-Dashboard für Echtzeit-Monitoring im Browser.

## Technische Highlights

### Architektur
- **Go-Engine**: Nutzt die Nebenläufigkeit von Go (Goroutinen) für effiziente Agenten-Koordination.
- **Provider Agnostic**: Unterstützt Gemini, Claude, OpenAI und lokale Modelle via Ollama.
- **Function Calling**: Robuste Implementierung von Tool-Aufrufen mit Validierung.

### Monitoring & UI
- **HTMX & Tailwind**: Leichtgewichtiges Dashboard ohne schweren SPA-Overhead.
- **Bubble Tea**: State-of-the-art Terminal-Erfahrung für Entwickler.
- **Live Logs**: Streaming von Agenten-Gedanken und Tool-Outputs.

### Memory System
- **Long-term Context**: Kombination aus SQLite für Logs und Vektorspeicher für semantische Suche.
- **Reflection Loops**: Agenten können ihre eigenen Ergebnisse kritisch hinterfragen und korrigieren.

## Ergebnis

Amigo ist seit **April 2026** als Open-Source-Projekt verfügbar. Es dient als Referenz für hochperformante KI-Orchestrierung und ermöglicht Entwicklern den Aufbau eigener autonomer Teams mit minimalem Konfigurationsaufwand.

- ✅ **Enterprise-Ready** durch Fallback-Strategien
- ✅ **Go Performance** für schnelle Reaktionszeiten
- ✅ **Open Source** auf GitHub für die Community
- ✅ **Einfache Tool-Anbindung** via MCP
- ✅ **Volle Transparenz** über das Dashboard

Amigo zeigt, wie die Zukunft der Softwareentwicklung durch synergetische Zusammenarbeit von Mensch und autonomen KI-Agenten aussieht.
