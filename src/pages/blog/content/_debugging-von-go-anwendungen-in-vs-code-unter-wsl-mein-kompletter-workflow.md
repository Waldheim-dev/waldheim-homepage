---
title: "Debugging von Go-Anwendungen in VS Code unter WSL: Mein kompletter Workflow."
description: "Eine Schritt-für-Schritt-Anleitung zur Konfiguration von VS Code, um Go-Anwendungen, die innerhalb von WSL laufen, nahtlos zu debuggen."
pubDate: "2025-12-20"
heroImage: "/images/blog/debugging-von-go-anwendungen-in-vs-code-unter-wsl-mein-kompletter-workflow.webp"
imagePrompt: "Professional high-tech 3D render or minimalist illustration for a blog post titled 'Debugging von Go-Anwendungen in VS Code unter WSL: Mein kompletter Workflow.'. Theme: Eine Schritt-für-Schritt-Anleitung zur Konfiguration von VS Code, um Go-Anwendungen, die innerhalb von WSL laufen, nahtlos zu debuggen.. Style: Modern enterprise glass aesthetic, dark mode, accent colors (cyan, amber, or violet), high resolution, 16:9 aspect ratio."
author: "markus-waldheim"
keywords: "Debugging, von, Go-Anwendungen, in, VS, Code, unter, WSL:, Mein, kompletter, Workflow."
linkedinPost: "🚀 Neuer Blogbeitrag online: Debugging von Go-Anwendungen in VS Code unter WSL: Mein kompletter Workflow."
---

## Go Debugging: Effiziente Fehlersuche zwischen Windows und Linux

Die Entwicklung von Go-Anwendungen unter Windows mit dem Windows Subsystem for Linux (WSL 2) ist heute eine der produktivsten Umgebungen für Backend-Entwickler. Wir nutzen den Komfort von Windows-Tools und die native Performance von Linux. Doch wenn es ans Debugging geht, kämpfen viele mit Verbindungsproblemen oder falsch konfigurierten Launch-Konfigurationen. In diesem Beitrag zeige ich Ihnen meinen kompletten Workflow, um Go-Services in VS Code unter WSL effizient zu debuggen.

### 1. Die Basis: Remote - WSL Extension

Der Schlüssel ist, dass VS Code nicht als Windows-Anwendung "von außen" auf das Linux-Dateisystem zugreift, sondern sich als Client-Server-Architektur versteht.

*   **Installation:** Die "Remote - WSL" Extension von Microsoft ist Pflicht. Sie installiert einen kleinen VS Code Server direkt in Ihrer WSL-Distribution.
*   **Vorteil:** Die offizielle Go-Extension läuft dann nativ unter Linux und hat direkten Zugriff auf den `dlv` (Delve) Debugger und die installierte Go-Toolchain.

### 2. Der Debugger: Delve (`dlv`) richtig konfigurieren

Delve ist der Standard-Debugger für Go. Er muss innerhalb der WSL-Umgebung installiert sein.

*   **Installation:** `go install github.com/go-delve/delve/cmd/dlv@latest`.
*   **Wichtig:** Stellen Sie sicher, dass Ihre WSL-Distribution aktuell ist, damit Delve vollen Zugriff auf die Prozess-Tracing-Features des Linux-Kernels hat.

### 3. Die `launch.json`: Projekte optimal starten

Für ein nahtloses Debugging-Erlebnis erstelle ich eine `.vscode/launch.json` Datei im Projektordner.

*   **Konfigurations-Beispiel:**
    ```json
    {
      "version": "0.2.0",
      "configurations": [
        {
          "name": "Debug Go Service",
          "type": "go",
          "request": "launch",
          "mode": "auto",
          "program": "${workspaceFolder}/cmd/api/main.go",
          "env": {
            "DB_URL": "postgres://localhost:5432/test",
            "LOG_LEVEL": "debug"
          }
        }
      ]
    }
    ```
*   **Feature:** Durch die `env` Sektion können wir Umgebungsvariablen für die Debug-Session setzen, ohne die globale Shell-Konfiguration zu verändern.

### 4. Fortgeschrittene Techniken: Unit-Tests und Remote Attach

Debugging beschränkt sich nicht auf das Starten der `main.go`.

*   **Test-Debugging:** In VS Code können Sie über jedem Unit-Test auf "debug test" klicken. Dies ist oft viel effizienter, als die gesamte Anwendung zu starten, um einen Logikfehler zu isolieren.
*   **Remote Attach:** Wenn Ihre Anwendung bereits in einem Docker-Container (innerhalb von WSL) läuft, können Sie Delve im "Headless-Mode" starten und VS Code per Netzwerk an den laufenden Prozess anhängen (`attach`).

## Fazit: Keine Angst vor komplexen Bugs

Mit dem richtigen Setup aus WSL 2, Delve und der VS Code Remote-Integration verschwindet die Grenze zwischen Entwicklung und Fehlersuche. Breakpoints setzen, Variablen inspizieren und Schritt-für-Schritt durch Goroutinen navigieren wird so einfach wie in einer rein nativen Umgebung. Ein sauberer Debugging-Workflow spart Ihnen Stunden an frustrierender Log-Analyse.

-----

**Haben Sie Probleme beim Setup Ihrer Entwicklungsumgebung unter WSL?**  
Ich helfe Ihnen und Ihrem Team bei der Konfiguration von produktiven Workflows für die Go- und Angular-Entwicklung. [Kontaktieren Sie mich für ein Tooling-Coaching.](mailto:admin@waldheim.dev)
