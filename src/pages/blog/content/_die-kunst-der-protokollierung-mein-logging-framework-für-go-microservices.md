---
title: "Die Kunst der Protokollierung: Mein Logging-Framework für Go-Microservices."
description: "Ich präsentiere meine Kriterien für ein gutes Logging und zeige, wie ich ein strukturiertes, performantes und nützliches Logging-System für Go-Anwendungen aufbaue."
pubDate: "2025-12-05"
heroImage: "/images/blog/die-kunst-der-protokollierung-mein-logging-framework-für-go-microservices.webp"
imagePrompt: "Professional high-tech 3D render or minimalist illustration for a blog post titled 'Die Kunst der Protokollierung: Mein Logging-Framework für Go-Microservices.'. Theme: Ich präsentiere meine Kriterien für ein gutes Logging und zeige, wie ich ein strukturiertes, performantes und nützliches Logging-System für Go-Anwendungen aufbaue.. Style: Modern enterprise glass aesthetic, dark mode, accent colors (cyan, amber, or violet), high resolution, 16:9 aspect ratio."
author: "markus-waldheim"
keywords: "Die, Kunst, der, Protokollierung:, Mein, Logging-Framework, für, Go-Microservices."
linkedinPost: "🚀 Neuer Blogbeitrag online: Die Kunst der Protokollierung: Mein Logging-Framework für Go-Microservices."
---

## Logging in Microservices: Mehr als nur Print-Statements

In einer monolithischen Anwendung reicht oft ein einfacher Log-Stream. In einer Microservice-Architektur hingegen werden Logs ohne Struktur und Kontext schnell zum unbrauchbaren Datenfriedhof. Wenn eine Anfrage über fünf verschiedene Services läuft und am Ende ein Fehler auftritt, müssen wir in der Lage sein, die gesamte Kette nachzuvollziehen. In diesem Beitrag zeige ich Ihnen mein Logging-Konzept für Go-Microservices, das auf Observability und Automatisierung setzt.

### 1. Strukturiertes Logging mit `slog`

Seit Go 1.21 haben wir mit dem Paket `log/slog` einen Standard für strukturiertes Logging direkt in der Standardbibliothek. Wir loggen nicht mehr nur Textzeilen, sondern Key-Value-Paare.

*   **Format:** In Produktion nutzen wir konsequent **JSON**. Dies ermöglicht es Systemen wie Elasticsearch oder Grafana Loki, die Logs ohne aufwendige Regex-Parser zu indizieren.
*   **Beispiel:** 
    ```go
    slog.Info("Bestellung verarbeitet", "order_id", 123, "duration_ms", 45)
    ```

### 2. Contextual Logging und Correlation IDs

Das wichtigste Element in verteilten Systemen ist die **Correlation ID** (oder Trace ID). Jede Anfrage erhält beim Eintritt in das System eine eindeutige ID, die über alle Service-Aufrufe hinweg (z.B. im HTTP-Header) weitergereicht wird.

*   **Middleware:** Ich nutze eine Middleware, die die Correlation ID aus dem Kontext extrahiert und automatisch jedem Log-Eintrag dieses Requests hinzufügt.
*   **Nutzen:** Bei einem Fehler suche ich nach der Trace-ID und sehe sofort alle beteiligten Services und deren Log-Meldungen in der chronologisch richtigen Reihenfolge.

### 3. Log-Level und Sampling

Zu viele Logs verursachen Kosten (Speicher, Netzwerk) und Performance-Einbußen. Zu wenige Logs machen das Debugging unmöglich.

*   **Dynamische Level:** Meine Services unterstützen das Ändern des Log-Levels zur Laufzeit (z.B. via API oder Config-Reloader), ohne dass der Dienst neu gestartet werden muss.
*   **Error-Context:** Im Falle eines Fehlers (`Error` Level) logge ich deutlich mehr Kontext-Informationen (z.B. den kompletten Request-Body, sofern datenschutzrechtlich zulässig), als bei einer erfolgreichen `Info`-Meldung.

### 4. Sensible Daten und PII-Protection

Logs sind eine häufige Quelle für Datenlecks. Passwörter, Kreditkartennummern oder personenbezogene Daten dürfen niemals im Klartext im Log landen.

*   **Maskierung:** Ich implementiere Wrapper für sensible Typen, die das `slog.LogValuer` Interface erfüllen. So wird z.B. eine E-Mail-Adresse automatisch als `u***@example.com` geloggt, egal wo sie im Code auftaucht.

## Fazit: Logs als Teil der Softwarearchitektur

Ein durchdachtes Logging-Framework ist kein "Nice-to-have", sondern eine überlebenswichtige Komponente für den Betrieb von Microservices. Durch den Einsatz von strukturiertem JSON-Logging, Correlation IDs und einer klaren Strategie für sensible Daten verwandeln wir rohe Daten in wertvolle Erkenntnisse. Gutes Logging verkürzt die "Mean Time to Recovery" (MTTR) drastisch und schont die Nerven des On-Call-Teams.

-----

**Haben Sie Schwierigkeiten bei der Fehlersuche in Ihrer Microservice-Landschaft?**  
Ich helfe Ihnen bei der Konzeption und Implementierung einer modernen Observability-Strategie mit Go und OpenTelemetry. [Kontaktieren Sie mich für ein Monitoring-Audit.](mailto:kontakt@waldheim.dev)
