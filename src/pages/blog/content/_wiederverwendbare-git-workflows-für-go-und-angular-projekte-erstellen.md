---
title: "Wiederverwendbare Git-Workflows für Go- und Angular-Projekte erstellen"
description: "Ich zeige, wie ich generische und wiederverwendbare GitHub Actions oder GitLab CI-Pipelines erstelle, die ich für verschiedene Go- und Angular-Projekte anpassen kann."
pubDate: "2025-12-19"
heroImage: "/images/blog/wiederverwendbare-git-workflows-für-go-und-angular-projekte-erstellen.webp"
imagePrompt: "Professional high-tech 3D render or minimalist illustration for a blog post titled 'Wiederverwendbare Git-Workflows für Go- und Angular-Projekte erstellen.'. Theme: Ich zeige, wie ich generische und wiederverwendbare GitHub Actions oder GitLab CI-Pipelines erstelle, die ich für verschiedene Go- und Angular-Projekte anpassen kann.. Style: Modern enterprise glass aesthetic, dark mode, accent colors (cyan, amber, or violet), high resolution, 16:9 aspect ratio."
author: "markus-waldheim"
keywords: "Git, Workflows, GitHub Actions, GitLab CI, Go, Angular, DevOps, CI/CD, Automatisierung"
---

## Effizienz durch Standardisierung: Warum jedes Team wiederverwendbare Workflows braucht

In der modernen Softwareentwicklung ist die CI/CD-Pipeline das Herzstück des Projekts. Doch oft kopieren Teams mühsam YAML-Konfigurationen von einem Repository in das nächste. Das Ergebnis sind inkonsistente Pipelines, die schwer zu warten sind. In diesem Beitrag zeige ich Ihnen, wie ich wiederverwendbare Workflows für meine Go- und Angular-Projekte erstelle, um Zeit zu sparen und die Qualität über alle Projekte hinweg zu sichern.

### 1. Das Prinzip der Reusable Workflows (GitHub Actions)

GitHub Actions bietet mit "Reusable Workflows" ein mächtiges Feature. Anstatt die Logik in jedem Projekt neu zu definieren, erstelle ich ein zentrales `.github` Repository, das die Standard-Workflows enthält.

*   **Zentralisierung:** Ein Workflow für den Go-Build existiert nur einmal. Wenn ich die Go-Version aktualisiere oder einen neuen Lint-Schritt hinzufüge, profitieren alle Projekte sofort davon.
*   **Parameterisierung:** Über `inputs` und `secrets` mache ich den Workflow flexibel. Das Projekt übergibt nur noch die spezifischen Informationen, wie den Namen des Binaries oder den Deployment-Target.

### 2. Standard-Pipeline für Go-Services

Mein Standard-Workflow für Go umfasst immer diese Schritte:

*   **Linting:** Nutzung von `golangci-lint` mit einem standardisierten Regelsatz.
*   **Testing:** Ausführung von `go test -v -race` mit Generierung von Coverage-Reports.
*   **Building:** Erstellung statischer Binaries für verschiedene Zielplattformen.
*   **Security Scan:** Automatisierte Prüfung auf Schwachstellen in Abhängigkeiten.

### 3. Standard-Pipeline für Angular-Frontends

Für Angular-Projekte sieht die wiederverwendbare Pipeline so aus:

*   **Dependency Check:** Sicherstellen, dass `npm install` oder `pnpm install` sauber durchläuft.
*   **Linting & Formatting:** Prüfung von TypeScript und SCSS gegen den Team-Standard.
*   **Unit Tests:** Ausführung von Karma oder Jest im Headless-Modus.
*   **Production Build:** Erstellung des optimierten Bundles mit AOT-Kompilierung.

### 4. GitLab CI: Templates und Includes

Auch in GitLab CI setze ich auf Wiederverwendbarkeit. Hier nutze ich das `include` Keyword, um Templates aus einem zentralen Repository einzubinden.

*   **Extends:** Über das `extends` Keyword können Projekte die Basis-Jobs laden und bei Bedarf spezifische Variablen oder Skripte überschreiben.
*   **Stages:** Die Abfolge von Build, Test und Deploy bleibt projektübergreifend konsistent, was den Onboarding-Prozess für neue Entwickler enorm erleichtert.

## Fazit: Weniger Wartung, mehr Fokus auf den Code

Wiederverwendbare Workflows sind eine Investition, die sich sofort auszahlt. Sie reduzieren den "Boilerplate"-Code in den Repositories und sorgen dafür, dass Sicherheits- und Qualitätsstandards überall eingehalten werden. Als Entwickler kann ich mich so voll auf die Geschäftslogik konzentrieren, während die Infrastruktur im Hintergrund zuverlässig und standardisiert arbeitet.

-----

**Möchten Sie Ihre CI/CD-Pipelines professionalisieren oder suchen Sie nach einer Strategie, um Ihre DevOps-Prozesse zu skalieren?**  
Ich unterstütze Sie bei der Konzeption und Implementierung von automatisierten Workflows, die perfekt auf Ihre Go- und Angular-Umgebungen zugeschnitten sind. [Lassen Sie uns Ihre Pipelines optimieren.](mailto:admin@waldheim.dev)
