---
title: "Verwaltung von Umgebungen: Mein Git-Branching und Deployment-Modell für Dev, Staging und Prod"
description: "Ich erläutere meinen praxiserprobten Workflow zur Trennung von Umgebungen, der durch Git-Strukturen und CI/CD-Pipelines für maximale Sicherheit sorgt."
pubDate: "2025-11-23"
heroImage: "/images/blog/verwaltung-von-umgebungen-dev-staging-prod-mein-git-branching-und-deployment-modell.webp"
imagePrompt: "Professional high-tech 3D render or minimalist illustration for a blog post titled 'Verwaltung von Umgebungen: Mein Git-Branching und Deployment-Modell für Dev, Staging und Prod'. Theme: Ich erläutere meinen praxiserprobten Workflow zur Trennung von Umgebungen, der durch Git-Strukturen und CI/CD-Pipelines für maximale Sicherheit sorgt.. Style: Modern enterprise glass aesthetic, dark mode, accent colors (cyan, amber, or violet), high resolution, 16:9 aspect ratio."
author: "markus-waldheim"
keywords: "Git, Branching, Deployment, CI/CD, DevSecOps, Staging, Produktion, Workflow"
---

## Effiziente Umgebungsverwaltung: Von Code zum stabilen Release

Die größte Gefahr für die Stabilität eines Produkts ist nicht schlechter Code, sondern ein unstrukturierter Deployment-Prozess. Wenn Änderungen direkt in Produktion landen, ohne verschiedene Qualitätsstufen durchlaufen zu haben, sind Ausfälle vorprogrammiert. In diesem Beitrag teile ich mein bewährtes Git-Branching-Modell und wie ich die Trennung zwischen Development, Staging und Produktion technisch umsetze.

### Das 3-Stufen-Modell

Ich setze konsequent auf drei getrennte Umgebungen, die jeweils einen klaren Zweck erfüllen:

1.  **Development (DEV):** Hier landen alle neuen Features nach dem ersten Code-Review. Es ist die "Spielwiese" für Entwickler und interne Tests.
2.  **Staging (TEST):** Eine exakte Kopie der Produktion. Hier führen wir finale E2E-Tests durch und das Product Management gibt neue Versionen frei.
3.  **Production (PROD):** Die heilige Halle. Nur vollständig getesteter und freigegebener Code erreicht diese Umgebung.

### Git-Branching: Einfachheit schlägt Komplexität

Anstatt komplizierter Modelle wie GitFlow bevorzuge ich ein vereinfachtes, Trunk-basiertes Modell mit stabilen Environment-Branches oder Tags.

*   **Feature Branches:** Jede Änderung beginnt in einem kurzlebigen Feature-Branch. Nach erfolgreichen Tests und Review wird dieser in den `main` (oder `dev`) Branch gemergt.
*   **Der `main` Branch:** Repräsentiert immer den Stand der Development-Umgebung.
*   **Promotion per Tagging oder Merge:** Um Code von Staging nach Produktion zu heben, nutze ich Git-Tags oder dedizierte Branches (`staging`, `production`). Ein Merge in den `production`-Branch löst automatisch die Pipeline für die Live-Umgebung aus.

### CI/CD als Gatekeeper

Die Pipeline ist der einzige Weg, wie Code in eine Umgebung gelangen kann. Manuelle Eingriffe auf Servern sind tabu.

*   **Automatisierte Tests:** Bevor ein Build für Staging erstellt wird, müssen alle Unit- und Integrationstests grün sein.
*   **Infrastructure as Code (IaC):** Umgebungen unterscheiden sich oft in ihrer Konfiguration (Datenbank-URLs, API-Keys). Ich verwalte diese Unterschiede strikt über Umgebungsvariablen und IaC-Tools wie Terraform, um "Configuration Drift" zu vermeiden.
*   **Approval-Steps:** Während Deployments nach DEV automatisch erfolgen, erfordern Releases nach PROD immer eine manuelle Freigabe (Manual Approval) in der Pipeline – ein wichtiger Sicherheitsanker.

### Secrets Management: Trennung der Geheimnisse

Ein häufiger Fehler ist die Nutzung der gleichen API-Keys für alle Umgebungen.

*   **Isolierung:** Jede Umgebung hat ihre eigenen Secrets. DEV-Keys dürfen niemals Zugriff auf PROD-Daten haben. Ich nutze Tools wie GitHub Secrets oder HashiCorp Vault, um diese Informationen sicher in die jeweilige Pipeline zu injizieren.

## Fazit: Struktur schafft Freiheit

Ein klares Umgebungsmodell und ein strukturierter Git-Workflow nehmen den Stress aus den Deployments. Entwickler können mutiger Features bauen, weil sie wissen, dass das Sicherheitsnetz aus Staging und automatisierten Tests sie auffängt. Wer heute in die Automatisierung seiner Umgebungen investiert, spart morgen unzählige Stunden bei der Fehlersuche in Produktion.

-----

**Suchen Sie nach einem stabilen und sicheren Deployment-Modell für Ihre Softwareprojekte oder benötigen Sie Unterstützung bei der Optimierung Ihrer CI/CD-Pipelines?**  
Ich helfe Ihnen beim Aufbau professioneller Workflows, die Ihre Time-to-Market verkürzen und gleichzeitig die Qualität erhöhen. [Kontaktieren Sie mich für eine DevOps-Beratung.](mailto:admin@waldheim.dev)
