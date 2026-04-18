---
title: "Lass Copilot aufräumen: Code-Refactoring auf Knopfdruck"
description: "Wie GitHub Copilot dir hilft, bestehenden Code zu refactoren und lesbarer zu machen. Mit Beispielen und Pro-Tipps."
pubDate: "2025-08-12"
heroImage: "/blogs/copilot-refactoring-auf-knopfdruck.png"
author: 'markus-waldheim'
keywords: "Copilot, Refactoring, Codequalität, Produktivität, Entwickler-Tipps"
---
Lass Copilot aufräumen 🧹: Code-Refactoring auf Knopfdruck
Hallo zusammen, an Tag 2 unserer Copilot-Serie! 👋

Gestern haben wir neuen Code aus Kommentaren erstellt. Heute widmen wir uns dem, was oft noch wichtiger ist: den bestehenden Code – unser digitales Erbe – zu pflegen und zu verbessern.

Das Problem, das jeder kennt:
Du öffnest eine Datei, die seit Monaten (oder Jahren) niemand mehr angefasst hat. Du siehst eine Funktion, die technisch zwar funktioniert, aber schwer zu lesen ist: tief verschachtelte if-else-Blöcke, schlecht benannte Variablen und sich wiederholender Code. Jede kleine Änderung wird hier zum Risiko.

Die Lösung im Detail: Der "Refactor"-Auftrag an Copilot
Mit Copilot Chat oder der Inline-Bearbeitung kannst du einen Code-Block markieren und ihn bitten, diesen zu überarbeiten. Du kannst allgemeine Anweisungen geben oder sehr spezifische. Copilot analysiert den Code und schlägt eine modernere, lesbarere und oft auch effizientere Version vor.

Konkretes Beispiel:
Schauen wir uns eine Funktion an, die prüft, ob ein Nutzer eine Berechtigung hat.

👎 Der alte, verschachtelte Code:

JavaScript

function hasPermission(user) {
  if (user) {
    if (user.isLoggedIn) {
      if (user.roles) {
        if (user.roles.includes('admin')) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
}
👍 Der Refactoring-Auftrag & das Ergebnis:
Du markierst den Code und schreibst in den Chat: "Refactor this code to use guard clauses and make it more readable." Copilot schlägt dir wahrscheinlich so etwas vor:

JavaScript

function hasPermission(user) {
  // Use guard clauses for early returns
  if (!user || !user.isLoggedIn || !user.roles) {
    return false;
  }

  // Check for the specific role
  return user.roles.includes('admin');
}
Das Ergebnis ist nicht nur kürzer, sondern vor allem sofort verständlich. Die "Happy Path"-Logik steht am Ende, alle Fehlerfälle werden direkt am Anfang abgefangen.

✨ Pro-Tipp:
Sei spezifisch bei deinen Wünschen! Du kannst Copilot auch bitten, "diesen Code zu vereinfachen, indem du die Redundanz entfernst", "diese Funktion in mehrere kleinere Hilfsfunktionen aufzuteilen" oder "die Variablen umzubenennen, sodass sie ihren Zweck besser beschreiben".

Abschluss & Ausblick:
Code-Refactoring ist keine lästige Pflicht mehr, sondern eine Sache von Sekunden. Nutze Copilot, um die Qualität deiner Codebase kontinuierlich zu verbessern – für dich und für alle anderen im Team!

Nächstes Mal wird es um ein Thema gehen, das viele gerne aufschieben: "Nie wieder Test-Muffel ✅: Wie Copilot dir hilft, mühelos Unit-Tests zu schreiben."

-----

**Interessieren Sie sich für dieses Thema oder benötigen Sie Beratung?**  
Ich unterstütze Sie gerne bei Ihren Projekten. [Kontaktieren Sie mich für eine strategische Beratung.](mailto:kontakt@waldheim.dev)
