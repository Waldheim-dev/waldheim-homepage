---
title: "Die perfekte Entwicklungsumgebung: Mein VS Code Setup für Go und Angular auf WSL"
description: "Ich teile mein optimiertes VS Code Setup inklusive Plugins und Konfigurationen für die produktive Full-Stack-Entwicklung mit Go und Angular unter Windows Subsystem for Linux."
pubDate: "2025-09-26"
heroImage: "/blogs/die-perfekte-entwicklungsumgebung-mein-vs-code-setup-fuer-go-und-angular-auf-wsl.png"
author: 'markus-waldheim'
keywords: VS Code, WSL, Go, Angular, Entwicklungsumgebung, Full-Stack, Konfiguration
---

## Die perfekte Entwicklungsumgebung: Mein optimiertes Full-Stack-Setup mit VS Code, Go, Angular und WSL

Als Full-Stack-Entwickler, der sowohl performante Go-Backends als auch dynamische Angular-Frontends entwickelt, ist eine nahtlose und hocheffiziente Entwicklungsumgebung der Schlüssel zur Produktivität. Das ständige Wechseln zwischen verschiedenen Werkzeugen, Terminals und Betriebssystem-Kontexten kann den Flow unterbrechen und zu Frustration führen. Glücklicherweise hat die Kombination aus Visual Studio Code (VS Code) und dem Windows Subsystem for Linux 2 (WSL 2) diese Herausforderung revolutioniert.

Ich habe über Jahre hinweg mein Setup perfektioniert, um eine Umgebung zu schaffen, in der die Entwicklung von Go und Angular auf einer Linux-Basis innerhalb von Windows nicht nur möglich, sondern unglaublich leistungsfähig und angenehm ist. In diesem Beitrag teile ich mein detailliertes Setup – von den grundlegenden Installationen bis zu den spezifischen VS Code-Erweiterungen und Konfigurationen, die meinen täglichen Workflow bestimmen.

### Das Fundament: Windows 11 mit WSL 2 und Ubuntu

* **Windows Terminal:** Dies ist mein zentraler Einstiegspunkt. Ich konfiguriere es so, dass es standardmäßig eine Ubuntu-Shell (meine bevorzugte WSL-Distribution) öffnet. Mit Tabs kann ich einfach zwischen verschiedenen Linux-Shells, der PowerShell und der Eingabeaufforderung wechseln.
* **WSL 2 Installation:** Ich installiere WSL 2 und Ubuntu direkt aus dem Microsoft Store. Die WSL 2-Engine mit ihrem echten Linux-Kernel ist entscheidend für die Performance, insbesondere bei I/O-lastigen Operationen wie `npm install` oder dem Kompilieren von Go.
* **Grundinstallation in Ubuntu:** Innerhalb meiner Ubuntu-Instanz installiere ich die neuesten Versionen der Kernwerkzeuge:
    ```bash
    # Go (ich installiere es manuell nach der offiziellen Anleitung, nicht über apt)
    # Node.js (ich verwende nvm, um zwischen verschiedenen Versionen wechseln zu können)
    curl -o- [https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh](https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh) | bash
    nvm install --lts
    
    # Angular CLI
    npm install -g @angular/cli
    
    # Git (ist meist vorinstalliert, aber sicherstellen, dass es aktuell ist)
    sudo apt update && sudo apt install git
    ```

### Das Herzstück: Visual Studio Code und die Remote-Entwicklung

Das magische Bindeglied ist die "Remote - WSL"-Erweiterung für VS Code.

1.  **Installation:** Ich installiere die Erweiterung **in meinem Windows-VS Code**.
2.  **Der Workflow:**
    * Ich öffne mein Windows Terminal mit der Ubuntu-Shell.
    * Ich navigiere in mein Projektverzeichnis (das sich **innerhalb des WSL-Dateisystems** befindet, z.B. `/home/markus/projects/my-app`, nicht unter `/mnt/c/`). Dies ist entscheidend für die Performance!
    * Ich gebe den Befehl `code .` ein.
    * VS Code startet auf Windows, aber verbindet sich sofort mit dem "WSL-Server". Die gesamte Code-Bearbeitung, das Debugging und die Terminal-Ausführung finden jetzt vollständig in der Linux-Umgebung statt. Man erkennt dies an der grünen Anzeige in der unteren linken Ecke von VS Code.

### Meine unverzichtbaren VS Code-Erweiterungen (installiert im WSL-Kontext)

Diese Erweiterungen installiere ich in jeder WSL-Umgebung:

* **Go (von Google):** Die offizielle Go-Erweiterung. Bietet IntelliSense, Debugging, Test-Integration und vieles mehr.
* **Angular Language Service (von Angular):** Bietet Autovervollständigung und Fehlerprüfung direkt in den Angular-HTML-Templates.
* **ESLint (von Microsoft):** Integriert den ESLint-Linter für TypeScript- und JavaScript-Code.
* **Prettier - Code formatter (von Prettier):** Sorgt für konsistente Code-Formatierung.
* **GitLens (von GitKraken):** Erweitert die Git-Funktionalität massiv (z.B. Git blame direkt im Editor).
* **Docker (von Microsoft):** Zur Verwaltung von Docker-Containern direkt aus VS Code.

### Meine `settings.json` für den perfekten Flow

Ich passe meine VS Code-Einstellungen an, um den Workflow zu optimieren. Hier ist ein Auszug aus meiner `settings.json` (die ich über Settings Sync synchronisiere):

```json
{
    // ----- Allgemein -----
    "terminal.integrated.defaultProfile.linux": "ubuntu",
    "files.eol": "\n", // Sicherstellen, dass immer Linux-Zeilenenden verwendet werden

    // ----- Go-spezifisch -----
    "go.lintTool": "golangci-lint",
    "go.lintOnSave": "package",
    "go.useLanguageServer": true,
    
    // ----- Angular/TypeScript-spezifisch -----
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
        "source.organizeImports": true,
        "source.fixAll.eslint": true
    },
    
    // ----- [go] und [typescript] spezifische Einstellungen -----
    "[go]": {
        "editor.defaultFormatter": "golang.go"
    },
    "[typescript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[html]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    }
}
```
**Was diese Einstellungen bewirken:**
* Beim Speichern wird der Code automatisch formatiert (`go fmt` für Go, Prettier für Angular).
* Imports werden automatisch organisiert.
* ESLint-Fehler werden automatisch korrigiert.
* `golangci-lint` prüft meinen Go-Code bei jedem Speichern auf Fehler und Sicherheitslücken.

### Der Debugging-Workflow

Einer der größten Vorteile dieses Setups ist das nahtlose Debugging.

* **Go-Backend:** Ich erstelle eine `launch.json`-Konfiguration in VS Code. Mit einem Klick auf "Start Debugging" wird mein Go-Programm innerhalb von WSL kompiliert und gestartet, und der Debugger verbindet sich. Ich kann Breakpoints setzen, Variablen inspizieren und den Call Stack analysieren, als würde ich nativ auf Linux entwickeln.
* **Angular-Frontend:** Ich nutze die "JavaScript Debugger"-Erweiterung. Mit einer passenden `launch.json`-Konfiguration kann ich VS Code an den Browser (Chrome oder Edge) anhängen und meine TypeScript-Dateien direkt in VS Code debuggen.

## Fazit: Eine kompromisslose Full-Stack-Umgebung

Die Kombination aus VS Code, WSL 2, Go und Angular ermöglicht eine Entwicklungsumgebung, die keine Kompromisse erfordert. Ich erhalte die Stabilität und die gewohnte Benutzeroberfläche von Windows, während meine gesamte Entwicklung in einer performanten, produktionsnahen Linux-Umgebung stattfindet. Dieses Setup hat meinen Workflow beschleunigt, die Konsistenz zwischen Entwicklung und Produktion verbessert und letztendlich die Qualität meiner Arbeit gesteigert. Es ist für mich die Definition einer perfekten, modernen Full-Stack-Entwicklungsumgebung.

-----

**Verbringen Sie mehr Zeit mit der Konfiguration Ihrer Werkzeuge als mit dem eigentlichen Entwickeln?**
Ich helfe Teams, ihre Entwicklungsumgebungen zu standardisieren und zu optimieren. Lassen Sie uns gemeinsam ein Setup schaffen, das Reibungsverluste minimiert und die Produktivität maximiert. [Kontaktieren Sie mich für einen Workshop zu effizienten Entwickler-Workflows.](/kontakt/)
-----

**Interessieren Sie sich für dieses Thema oder benötigen Sie Beratung?**  
Ich unterstütze Sie gerne bei Ihren Projekten. [Kontaktieren Sie mich für eine strategische Beratung.](mailto:admin@waldheim.dev)
