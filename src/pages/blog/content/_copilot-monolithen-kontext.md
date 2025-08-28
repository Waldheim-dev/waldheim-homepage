---
title: "Den Monolithen zähmen: Copilot im riesigen Projekt richtig nutzen"
description: "Wie du Copilot in großen, gewachsenen Codebases richtig anleitest. Tipps, Beispiele und Pro-Tipps."
pubDate: "2025-08-20"
heroImage: "/blogs/copilot-monolithen-kontext.png"
author: 'markus-waldheim'
keywords: "Copilot, Monolith, Kontext, Legacy-Code, Entwickler-Tipps"
---
Den Monolithen zähmen 🏛️: Wie bringst du Copilot die Regeln deines riesigen, bestehenden Projekts bei?
Hallo und willkommen zum vorletzten Teil unserer Serie! 👋

Wir haben gesehen, wie man ein Projekt von null startet. Aber die Realität sieht oft anders aus: Wir arbeiten in riesigen, über Jahre gewachsenen Monolithen. Hier kann ein "naiver" Copilot mehr schaden als nutzen.

Das Problem, das jeder kennt:
Du sollst eine kleine Änderung in einer riesigen Codebase machen. Die Dokumentation ist veraltet, es gibt unzählige "Helper"-Klassen mit unklaren Namen und über die Jahre haben sich verschiedene Programmierstile eingeschlichen. Ein Standard-Vorschlag von Copilot ignoriert all diese historisch gewachsenen "Regeln" und schlägt Code vor, der zwar modern, aber komplett inkompatibel mit der bestehenden Architektur ist.

Die Lösung im Detail: Werde vom Anwender zum Copilot-Trainer
Du musst Copilot aktiv anlernen und ihn mit dem richtigen Kontext füttern. Das ist eine Strategie aus mehreren Schritten:

Ermitteln mit @workspace: Bevor du eine Zeile Code schreibst, spiele Detektiv. Frage Copilot gezielt nach den Mustern im Projekt:

"@workspace Zeige mir, wie in diesem Projekt typischerweise Fehler in API-Controllern behandelt werden."
"@workspace Wo finde ich die zentrale Logik für die Benutzer-Authentifizierung?"

Kontext durch offene Dateien schaffen: Copilot gewichtet offene Tabs in deinem Editor höher. Öffne also die zentralen Dateien, die für deine Aufgabe relevant sind (z.B. die zentrale ApiService.cs, das User.java-Model, eine wichtige utils.js). So hat Copilot die "Blaupausen" direkt vor Augen.

Aktiv im Dialog korrigieren: Wenn Copilot etwas vorschlägt, das fast richtig ist, korrigiere ihn direkt im Inline-Chat. Statt den Vorschlag zu verwerfen, sage: "Gut, aber verwende hier die LegacyDatabaseManager.execute() Methode anstelle eines neuen DBContext." So lernt er "on the fly" für deine aktuelle Session.

Konkretes Beispiel:
Du sollst eine neue Funktion hinzufügen, die Nutzerdaten abruft.

👎 Der naive Ansatz:
Du schreibst einen Kommentar: // Funktion, die Nutzerdaten abruft. Copilot schlägt eine moderne async/await-Funktion mit fetch vor, die aber die komplexe, bestehende Caching- und Fehler-Logik des Monolithen ignoriert.

👍 Der trainierte Ansatz:
Du fragst zuerst: "@workspace Wie werden Nutzerdaten aktuell abgerufen?". Copilot verweist dich auf eine existierende UserService Klasse. Du öffnest diese Datei. Dann markierst du eine ähnliche, vorhandene Funktion und sagst zu Copilot: "Erstelle eine neue Funktion getPremiumUserDetails, die dem Muster der markierten Funktion folgt." Das Ergebnis wird Code sein, der sich nahtlos in die bestehende Architektur einfügt.

✨ Pro-Tipp:
Erstelle eine temporäre Datei namens CONTEXT.md in deinem Projekt. Bevor du eine komplexe Aufgabe beginnst, kopiere wichtige Klassendefinitionen, Schnittstellen oder Konfigurations-Snippets in diese Datei. Halte sie in einem Tab geöffnet. Copilot wird diesen hochkonzentrierten Kontext nutzen, um extrem passgenaue Vorschläge zu machen.

Abschluss & Ausblick:
Die Arbeit mit Copilot in einem Monolithen ist weniger "Frage-Antwort" und mehr ein Dialog. Indem du ihn führst, anleitest und ihm den richtigen Kontext gibst, wird er zu einem unschätzbar wertvollen Werkzeug, um auch in der komplexesten Codebase produktiv und sicher zu arbeiten.

Im letzten Teil unserer Serie widmen wir uns der Königsdisziplin: "Der Fachlogik-Flüsterer 🗣️: Wie vermittelst du der KI komplexe Business-Logik?"
