---
title: "Das Gedächtnis der KI: Kontext mit @workspace und /instructions"
description: "Wie du Copilot mit @workspace und /instructions den richtigen Projekt-Kontext gibst. Beispiele, Pro-Tipps und Ausblick."
pubDate: "2025-08-18"
heroImage: "/blogs/copilot-kontext-instructions.png"
author: 'markus-waldheim'
keywords: "Copilot, Kontext, Instructions, Workspace, Produktivität, Entwickler-Tipps"
---
Das Gedächtnis der KI 🧠: So gibst du Copilot Kontext mit @workspace und /instructions
Hallo und willkommen zurück zu unserer Copilot-Serie! 👋

Bisher haben wir Copilot Befehle für den Code direkt vor unserer Nase gegeben. Aber seine wahre Stärke entfaltet er erst, wenn er das gesamte Projekt versteht. Heute zeigen wir ihm, wie das geht.

Das Problem, das jeder kennt:
Copilot schlägt dir eine tolle Funktion vor, aber sie verwendet axios für einen HTTP-Request, obwohl im gesamten Projekt der fetch-Standard genutzt wird. Oder er erfindet eine Hilfsfunktion utils.log(), obwohl eure etablierte Logging-Klasse Logger.info() heißt. Copilot fehlt der Gesamtkontext – er verhält sich wie ein Kollege, der nur eine einzige Datei sieht und den Rest des Projekts ignoriert.

Die Lösung im Detail: Gib Copilot ein Gehirn für dein Projekt
Dafür gibt es zwei zentrale Werkzeuge im Copilot Chat:

@workspace – Der Such-Agent: Wenn du eine Frage mit @workspace beginnst, durchsucht Copilot deine gesamte geöffnete Codebasis. Du kannst ihn Dinge fragen wie:

"@workspace Wo definieren wir unsere Farb-Variablen für das Frontend?"
"@workspace Zeige mir, wie wir im Projekt auf die User-API zugreifen."
"@workspace Gibt es eine Utility-Funktion, um Strings zu formatieren?"

/instructions – Die permanenten Anweisungen: Hier legst du die Grundregeln fest. Es ist wie eine "Verfassung" für Copilot in diesem Projekt. Du sagst ihm einmal, wie er sich verhalten soll, und er berücksichtigt es bei zukünftigen Vorschlägen.

Konkretes Beispiel:
Dein Projekt hat eine spezielle Logging-Bibliothek.

👎 Ohne Anweisungen:
Du bittest Copilot, eine Funktion zu schreiben, die Daten verarbeitet. Der Vorschlag wird wahrscheinlich generisches Logging verwenden:

JavaScript

function processData(data) {
  console.log('Starting data processing...'); // Generisch und nicht projekt-konform
  // ... Logik ...
  console.log('Processing finished.');
}
👍 Mit Anweisungen:
Du öffnest den Chat und fügst mit /instructions eine Regel hinzu: "Für alle Log-Ausgaben die Methode Logger.info() aus utils/logger.js verwenden."
Wenn du ihn jetzt um dieselbe Funktion bittest, sieht das Ergebnis so aus:

JavaScript

import { Logger } from './utils/logger.js'; // Korrekter Import

function processData(data) {
  Logger.info('Starting data processing...'); // Projekt-konforme Nutzung
  // ... Logik ...
  Logger.info('Processing finished.');
}
Er hält sich an deine Regeln und schreibt Code, der sich nahtlos in dein Projekt einfügt.

✨ Pro-Tipp:
Kombiniere die beiden! Finde mit @workspace heraus, wie ein bestimmtes Muster im Projekt umgesetzt ist (z.B. Fehlerbehandlung). Formuliere das Ergebnis dann als Regel und füge sie mit /instructions hinzu, um dieses Muster für die Zukunft festzuschreiben.

Abschluss & Ausblick:
Indem du Copilot den Kontext deines Projekts gibst, wandelst du ihn von einem reinen Code-Vervollständiger zu einem echten Entwicklungspartner, der deine Architektur respektiert.

Im nächsten Teil starten wir auf der grünen Wiese und lassen uns von Copilot helfen, ein ganzes Projekt von Grund auf zu konzipieren. Sei dabei bei: "Start from Scratch 📝: Wie du mit Copilot ein Projekt von Null beginnst."
