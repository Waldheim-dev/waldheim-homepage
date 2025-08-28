---
title: "Gedankenlesen kann sie (noch) nicht: Was tun, wenn die KI dich falsch versteht?"
description: "Wie du GitHub Copilot richtig anweist, um präzise Ergebnisse zu erhalten. Beispiele, Pro-Tipps und Zusammenfassung der Serie."
pubDate: "2025-08-21"
heroImage: "/blogs/copilot-ki-versteht-dich-falsch.png"
author: 'markus-waldheim'
keywords: "Copilot, Kommunikation, KI, Entwickler-Tipps, Produktivität"
---
"Gedankenlesen kann sie (noch) nicht" 🧠: Was tun, wenn die KI dich falsch versteht?
Hallo zu unserem finalen Bonus-Beitrag der Copilot-Serie! 👋

Wir haben gelernt, wie mächtig Copilot ist. Aber manchmal fühlt es sich an, als würde man mit einer Wand reden. Man gibt eine Anweisung und das Ergebnis ist... kreativ, aber falsch. Heute klären wir, warum das passiert und wie du zum Meister-Anweiser wirst.

Das Problem, das jeder kennt:
Du bittest Copilot: "Mach einen Button." oder "Füge eine Funktion hinzu, um den Nutzer zu speichern." Das Ergebnis ist technisch korrekt, aber passt überhaupt nicht zu deinem Projekt. Der Button ist hässlich, die Speicherfunktion nutzt eine andere Bibliothek und ignoriert deine Architektur. Die KI hat dich nicht verstanden.

Die Lösung im Detail: Vom Befehlsgeber zum Kommunikator
GitHub Copilot ist kein magischer Gedankenleser. Er ist ein extrem guter Muster-Erkenner, der auf Basis der ihm gegebenen Informationen die wahrscheinlichste Lösung erzeugt. Wenn die Informationen vage sind, wird auch die Lösung vage (oder eine geratene Standardlösung) sein.

Der Schlüssel ist, deine Anfragen von implizit zu explizit zu machen.

Konkretes Beispiel:
Du möchtest eine Funktion, die einen User validiert.

👎 Vage Anweisung (implizit):
// Funktion, die den User validiert
Copilot wird vielleicht eine Funktion erstellen, die prüft, ob username und password nicht leer sind. Das ist eine valide Interpretation, aber nicht das, was du wolltest.

👍 Spezifische Anweisung (explizit):
Du gibst ihm den genauen Kontext und die Regeln mit:

JavaScript

/*
  Erstelle eine Funktion 'validateUser(userObject)'.
  Sie soll folgendes prüfen:
  - Der 'email' Feld muss eine valide E-Mail-Adresse sein.
  - Das 'password' Feld muss mindestens 8 Zeichen lang sein und eine Zahl enthalten.
  - Das 'age' Feld muss eine Zahl und größer als 18 sein.
  - Die Funktion soll 'true' zurückgeben, wenn alles passt, ansonsten 'false'.
*/
Mit dieser klaren Anleitung hat Copilot keine andere Wahl, als genau die Funktion zu schreiben, die du im Kopf hattest.

✨ Pro-Tipp:
Denke wie ein Lehrer, nicht wie ein Chef. Anstatt nur zu sagen, was du willst, erkläre auch das Warum und die Bedingungen. Gib ihm Beispiele für Input und den erwarteten Output. Je mehr Kontext du lieferst (durch Kommentare, offene Dateien, @workspace oder /instructions), desto präziser und hilfreicher wird die Antwort der KI sein.

Abschluss & Zusammenfassung der Serie:
Die Arbeit mit Copilot ist ein Dialog. Manchmal muss man führen, manchmal erklären und manchmal korrigieren. Wenn du lernst, klar und kontextreich zu kommunizieren, wird die KI von einem einfachen Werkzeug zu einem echten Partner, der deine Produktivität auf ein neues Level hebt.

Wir hoffen, diese 10-teilige Serie hat euch geholfen, das Potenzial von GitHub Copilot besser zu verstehen und zu nutzen. Jetzt seid ihr dran: Probiert es aus, experimentiert und findet euren eigenen Weg, um das Beste aus dieser Technologie herauszuholen! Viel Erfolg! 🚀
