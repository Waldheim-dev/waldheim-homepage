---
title: "Das geteilte Gehirn: copilot-instructions.md für dein Team"
description: "Wie die Datei .github/copilot-instructions.md die Copilot-Nutzung im Team konsistent und effizient macht. Beispiele, Pro-Tipps und Abschluss der Serie."
pubDate: "2025-08-22"
heroImage: "/blogs/copilot-team-copilot-instructions.png"
author: 'markus-waldheim'
keywords: "Copilot, Team, Instructions, Konsistenz, Produktivität, Entwickler-Tipps"
---
Bonus-Beitrag 11/11: Das geteilte Gehirn 🧠: Wie .github/copilot-instructions.md dein Team auf Kurs hält
Hallo zum ultimativen Bonus-Track unserer Copilot-Serie! 👋

Wir haben gelernt, wie WIR die KI anweisen. Aber wie stellen wir sicher, dass das gesamte Team die KI auf die gleiche Weise anweist, um konsistenten und hochwertigen Code zu erhalten? Die Antwort ist eine oft übersehene, aber extrem mächtige Datei.

Das Problem, das jedes Team kennt:
Entwickler A bringt Copilot bei, den team-eigenen Logger zu verwenden. Entwickler B vergisst das und Copilot schlägt das Standard-console.log vor. Ein neuer Kollege kommt ins Projekt und sein Copilot weiß von nichts. Das "Wissen" über die Projekt-Architektur ist auf die einzelnen Teammitglieder verteilt und inkonsistent.

Die Lösung im Detail: Eine Wahrheitsquelle für die KI
GitHub ermöglicht es, eine Datei namens copilot-instructions.md im .github-Ordner deines Repositories anzulegen. Diese Datei ist die zentrale, versionierte Anweisung für Copilot, die für jeden gilt, der an diesem Repository arbeitet.

Vorteile gegenüber individuellen Einstellungen:

Teamweit: Jeder, der das Repo klont, nutzt dieselben Anweisungen.
Versioniert: Änderungen an den Regeln sind nachvollziehbar und können per Pull Request diskutiert werden.
Mächtiges Markdown: Du kannst die Anweisungen mit Überschriften, Listen und Code-Beispielen klar strukturieren.

Konkretes Beispiel:
So könnte eure .github/copilot-instructions.md aussehen:

Markdown

# Anweisungen für GitHub Copilot in unserem Projekt "Phoenix"

Wir entwickeln eine E-Commerce-Plattform mit TypeScript, React und Node.js. Bitte beachte die folgenden Richtlinien für alle deine Vorschläge.

## 1. React Komponenten Stil

- Schreibe alle Komponenten als Functional Components mit Hooks.
- Verwende die Pfeilfunktions-Syntax: `export const MeinButton = () => { ... };`
- Nutze CSS-Module für das Styling (`.module.css`).

## 2. API-Aufrufe im Frontend

- Verwende ausschließlich die `axios`-Instanz aus `src/api/client.js`.
- Nutze niemals `fetch()` direkt.
- Jeder API-Aufruf muss in einem `try...catch`-Block zur Fehlerbehandlung gekapselt sein.

## 3. Genereller Ton

- Alle Kommentare und Dokumentationen sollen auf Deutsch verfasst werden.
Wenn nun ein Teammitglied Copilot bittet, "eine neue Komponente zu erstellen, die Produktdaten abruft", wird die KI eine Funktion vorschlagen, die exakt diesen Regeln folgt – ganz ohne, dass der Nutzer sie einzeln erwähnen muss.

✨ Pro-Tipp:
Nutzt diese Datei als lebende Dokumentation eurer Architektur-Entscheidungen. Wenn ihr im Team beschließt, eine neue Library einzuführen oder ein Muster zu ändern, passt ihr als Erstes die copilot-instructions.md an. So stellt ihr sicher, dass die KI sofort nach den neuen Regeln spielt.

Abschluss der Serie:
Mit diesem Feature wird Copilot vom persönlichen Assistenten zu einem echten Teammitglied, das die gemeinsamen Spielregeln kennt, einhält und verbreitet. Es ist der Schlüssel, um die Code-Qualität und Konsistenz im gesamten Team durch KI zu steigern.

Damit ist unsere Serie nun wirklich am Ende. Wir hoffen, ihr hattet viele Aha-Momente und seid inspiriert, diese Techniken in euren Alltag zu integrieren. Viel Erfolg! 🚀

-----

**Interessieren Sie sich für dieses Thema oder benötigen Sie Beratung?**  
Ich unterstütze Sie gerne bei Ihren Projekten. [Kontaktieren Sie mich für eine strategische Beratung.](mailto:admin@waldheim.dev)
