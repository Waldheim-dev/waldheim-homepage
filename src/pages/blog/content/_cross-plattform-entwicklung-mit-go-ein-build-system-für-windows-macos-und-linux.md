---
title: "Cross-Plattform-Entwicklung mit Go: Ein Build-System für Windows, macOS und Linux."
description: "Ich zeige, wie ich ein automatisiertes Build-Skript einrichte, das aus einer einzigen Go-Codebasis native Binärdateien für alle drei großen Betriebssysteme erzeugt."
pubDate: "2025-12-07"
heroImage: "/images/blog/cross-plattform-entwicklung-mit-go-ein-build-system-für-windows-macos-und-linux.webp"
imagePrompt: "Professional high-tech 3D render or minimalist illustration for a blog post titled 'Cross-Plattform-Entwicklung mit Go: Ein Build-System für Windows, macOS und Linux.'. Theme: Ich zeige, wie ich ein automatisiertes Build-Skript einrichte, das aus einer einzigen Go-Codebasis native Binärdateien für alle drei großen Betriebssysteme erzeugt.. Style: Modern enterprise glass aesthetic, dark mode, accent colors (cyan, amber, or violet), high resolution, 16:9 aspect ratio."
author: "markus-waldheim"
keywords: "Cross-Plattform-Entwicklung, mit, Go:, Ein, Build-System, für, Windows,, macOS, und, Linux."
linkedinPost: "🚀 Neuer Blogbeitrag online: Cross-Plattform-Entwicklung mit Go: Ein Build-System für Windows, macOS und Linux."
---

## Go Everywhere: Ein Binary für alle Plattformen

Einer der größten Vorteile von Go ist die einfache Cross-Compilation. Ohne externe Abhängigkeiten können wir von einer Maschine aus für fast jedes Zielsystem bauen. In diesem Beitrag zeige ich Ihnen mein Setup mit Taskfiles und GitHub Actions, um diesen Prozess zu automatisieren und Binärdateien für Windows, macOS und Linux zuverlässig bereitzustellen.

### 1. GOOS und GOARCH verstehen

Go nutzt zwei zentrale Umgebungsvariablen, um das Zielsystem zu definieren: `GOOS` (das Betriebssystem) und `GOARCH` (die Prozessorarchitektur).

*   **Beispiele:**
    *   `GOOS=linux GOARCH=amd64 go build` (für Standard-Linux-Server)
    *   `GOOS=windows GOARCH=amd64 go build` (für Windows-Desktops)
    *   `GOOS=darwin GOARCH=arm64 go build` (für moderne Apple Silicon Macs)
*   **Vorteil:** Man benötigt keine Cross-Compiler-Toolchains wie in C/C++. Das Go-Tooling bringt alles mit.

### 2. Automatisierung mit `GoReleaser`

Für professionelle Releases ist das manuelle Setzen von Variablen zu fehleranfällig. Ich nutze daher konsequent **GoReleaser**.

*   **Konfiguration:** Über eine `.goreleaser.yaml` definiere ich alle Zielplattformen, Archive (ZIP/Tar), Paketformate (Deb/RPM) und sogar Docker-Images.
*   **Feature:** GoReleaser erstellt automatisch GitHub-Releases, generiert Checksummen und signiert die Artefakte.

### 3. Build-Management mit Taskfiles

Anstatt komplexer Makefiles nutze ich `Task` (taskfile.dev). Ein Taskfile ist in YAML geschrieben und deutlich lesbarer.

*   **Beispiel-Task:**
    ```yaml
    build-all:
      desc: Baut Binaries für alle Plattformen
      cmds:
        - task: build-linux
        - task: build-windows
        - task: build-macos
    ```
*   **Nutzen:** Entwickler können lokal mit einem einfachen `task build` genau denselben Prozess anstoßen, der später in der CI-Pipeline läuft.

### 4. CI/CD-Integration: GitHub Actions

Der finale Schritt ist die Integration in die Pipeline. Bei jedem Git-Tag wird der Build-Prozess automatisch gestartet.

*   **Workflow:** GitHub Actions checkt den Code aus, installiert Go und ruft GoReleaser auf. Innerhalb weniger Minuten stehen die fertigen Binärdateien für alle Plattformen zum Download bereit.

## Fazit: Maximale Reichweite mit minimalem Aufwand

Dank Go ist die Bereitstellung von Software für unterschiedliche Betriebssysteme kein technisches Hindernis mehr. Durch die Kombination von Go's eingebauter Cross-Compilation mit Tools wie GoReleaser und GitHub Actions schaffen wir einen hochautomatisierten Prozess, der die Time-to-Market reduziert und die Zuverlässigkeit unserer Releases erhöht.

-----

**Benötigen Sie ein robustes Build-System für Ihre Go-Projekte?**  
Ich unterstütze Sie bei der Einrichtung von CI/CD-Pipelines, die Ihre Software zuverlässig auf alle Plattformen bringen. [Kontaktieren Sie mich für eine DevOps-Beratung.](mailto:kontakt@waldheim.dev)
