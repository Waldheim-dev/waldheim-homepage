---
title: "Monitoring von Go-Microservices: Mein Stack mit Prometheus und Grafana."
description: "Eine praktische Anleitung, wie ich Go-Anwendungen instrumentiere und ein Monitoring-Dashboard mit Prometheus und Grafana aufsetze, um die Systemgesundheit im Blick zu behalten."
pubDate: "2026-01-07"
heroImage: "/images/blog/monitoring-von-go-microservices-mein-stack-mit-prometheus-und-grafana.webp"
imagePrompt: "Professional high-tech 3D render or minimalist illustration for a blog post titled 'Monitoring von Go-Microservices: Mein Stack mit Prometheus und Grafana.'. Theme: Eine praktische Anleitung, wie ich Go-Anwendungen instrumentiere und ein Monitoring-Dashboard mit Prometheus und Grafana aufsetze, um die Systemgesundheit im Blick zu behalten.. Style: Modern enterprise glass aesthetic, dark mode, accent colors (cyan, amber, or violet), high resolution, 16:9 aspect ratio."
author: "markus-waldheim"
keywords: "Monitoring, von, Go-Microservices:, Mein, Stack, mit, Prometheus, und, Grafana."
linkedinPost: "🚀 Neuer Blogbeitrag online: Monitoring von Go-Microservices: Mein Stack mit Prometheus und Grafana."
---

## Observability in Go: Wenn Metriken das Unsichtbare sichtbar machen

In einer Microservice-Architektur ist "Blindflug" keine Option. Wir müssen jederzeit wissen, wie viele Anfragen pro Sekunde eingehen, wie hoch die Fehlerquote ist und wo Latenzen entstehen. Go eignet sich hervorragend für das Monitoring, da es leichtgewichtige Metriken-Libraries bietet, die kaum Performance-Overhead verursachen. In diesem Beitrag zeige ich Ihnen meinen Standard-Stack für das Monitoring von Go-Services: Prometheus und Grafana.

### 1. Metriken-Exposition mit der Prometheus Library

Anstatt Daten aktiv an einen Server zu senden, nutzt Prometheus ein Pull-Modell. Der Go-Service bietet einen HTTP-Endpunkt (meist `/metrics`) an, von dem Prometheus die Daten abholt.

*   **Counter:** Für Ereignisse, die nur steigen (z.B. `http_requests_total`).
*   **Gauge:** Für Werte, die steigen und fallen können (z.B. `active_goroutines`).
*   **Histogram/Summary:** Für Latenz-Messungen (z.B. wie lange eine DB-Abfrage dauert).

### 2. Die "Four Golden Signals" im Fokus

Ich konzentriere mich beim Monitoring auf die vier wichtigsten Signale nach dem SRE-Modell von Google:

*   **Latency:** Zeit bis zur Beantwortung eines Requests.
*   **Traffic:** Die Last auf dem System (Requests pro Sekunde).
*   **Errors:** Die Rate der fehlgeschlagenen Anfragen (z.B. HTTP 5xx).
*   **Saturation:** Wie "voll" ist der Service? (CPU-Last, Memory-Usage).

### 3. Visualisierung und Dashboards in Grafana

Rohdaten in Prometheus sind nützlich, aber erst in Grafana werden sie zu handhabbarem Wissen.

*   **Standard-Dashboards:** Ich nutze Vorlagen für den Go-Collector, die sofort CPU, RAM und GC-Pausen visualisieren.
*   **Business-Dashboards:** Ich erstelle individuelle Panels, die fachliche Metriken zeigen (z.B. "Bestellungen pro Stunde").
*   **Vorteil:** Das gesamte Team hat einen Echtzeit-Blick auf die Gesundheit der Produktion.

### 4. Alerting: Proaktiv statt Reaktiv

Monitoring ist nutzlos, wenn niemand auf die Daten schaut.

*   **Prometheus Alertmanager:** Ich definiere Regeln, die bei Anomalien (z.B. Fehlerquote > 5 % über 2 Minuten) automatisch Benachrichtigungen an Slack oder PagerDuty senden.
*   **Slo-based Alerting:** Anstatt bei jeder kleinen Spitze zu alarmieren, setzen wir auf Service Level Objectives (SLOs). Wir alarmieren nur, wenn die langfristige Verfügbarkeit gefährdet ist.

## Fazit: Vertrauen ist gut, Metriken sind besser

Ein robuster Monitoring-Stack mit Go, Prometheus und Grafana ist die Lebensversicherung für Ihre Microservices. Er ermöglicht es uns, Probleme zu erkennen, bevor der Kunde sie bemerkt, und fundierte Entscheidungen über Skalierung und Optimierung zu treffen. In einer Welt verteilter Systeme ist Observability kein Zusatz-Feature, sondern ein Kernbestandteil der Architektur.

-----

**Haben Sie den Überblick über Ihre Microservices verloren?**  
Ich unterstütze Sie bei der Einführung von professionellem Monitoring und Alerting für Ihre Go-Infrastruktur. [Lassen Sie uns Ihre System-Transparenz erhöhen.](mailto:kontakt@waldheim.dev)
