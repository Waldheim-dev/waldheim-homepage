---
title: "Vom Kommentar zum Code: Copilot mit Worten steuern"
description: "Wie du mit präzisen Kommentaren GitHub Copilot dazu bringst, vollständigen Code zu generieren. Tipps, Beispiele und Pro-Tipps."
pubDate: "2025-08-11"
heroImage: "/blogs/copilot-kommentar-zu-code.png"
author: 'markus-waldheim'
keywords: "Copilot, Kommentar, Codegenerierung, Produktivität, Entwickler-Tipps"
---
Vom Kommentar zum Code 💬 → 💻: Wie du Copilot mit Worten steuerst
Hallo zusammen! 👋

Starten wir unsere Reise in die Welt von GitHub Copilot mit einer der einfachsten, aber mächtigsten Techniken: Code aus Kommentaren generieren zu lassen.

Das Problem, das jeder kennt:
Du weißt genau, was eine Funktion tun soll. Du hast die Logik im Kopf, aber das Heruntertippen des gesamten Boilerplate-Codes, der API-Calls und der Fehlerbehandlung fühlt sich oft mühsam und repetitiv an. Manchmal vergisst man dabei sogar eine Kleinigkeit.

Die Lösung im Detail: Dein Wunsch ist ihm Befehl!
Anstatt direkt Code zu tippen, schreibst du einfach einen detaillierten Kommentar, der beschreibt, was passieren soll. Copilot liest diesen Kommentar und schlägt dir den passenden, vollständigen Code dafür vor. Je präziser dein Kommentar, desto besser das Ergebnis.

Konkretes Beispiel:
Stell dir vor, du musst eine simple Funktion schreiben, die Nutzerdaten von einer fiktiven API abruft.

👎 Der alte Weg (alles selbst tippen):

JavaScript

async function getUserById(userId) {
  try {
    const response = await fetch(`https://api.example.com/users/${userId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetching user failed:', error);
    return null;
  }
}
👍 Der neue Weg mit Copilot (nur den Kommentar tippen):
Du schreibst nur das hier und drückst Enter...

JavaScript

// fetch user data from the API by a given user ID
// handle potential errors and return null if something goes wrong
... und Copilot schlägt dir (sehr wahrscheinlich) eine Funktion vor, die fast identisch mit dem oberen Beispiel ist. Du musst sie nur noch per Tab-Taste akzeptieren!

✨ Pro-Tipp:
Sei spezifisch! Statt // get users schreibe lieber // create an async function "fetchUsers" that fetches all users from the /api/users endpoint and returns them as a JSON array. Du kannst sogar auf Fehlerbehandlung oder bestimmte Frameworks hinweisen!

Abschluss & Ausblick:
Das war nur der Anfang! Indem du deine Absicht zuerst in Worten formulierst, schaffst du nicht nur schneller Code, sondern auch besser dokumentierten Code.

Nächste Woche schauen wir uns an, wie wir Copilot nutzen, um bestehenden Code zu verbessern. Seid gespannt auf: "Lass Copilot aufräumen 🧹: Code-Refactoring auf Knopfdruck."

-----

**Interessieren Sie sich für dieses Thema oder benötigen Sie Beratung?**  
Ich unterstütze Sie gerne bei Ihren Projekten. [Kontaktieren Sie mich für eine strategische Beratung.](mailto:kontakt@waldheim.dev)
