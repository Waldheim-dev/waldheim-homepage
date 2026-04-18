---
title: "Der Fachlogik-Flüsterer: Komplexe Business-Logik mit Copilot umsetzen"
description: "Wie du Copilot komplexe Business-Logik vermittelst und als echten Entwicklungspartner nutzt. Beispiele, Pro-Tipps und Ausblick."
pubDate: "2025-08-31"
heroImage: "/blogs/copilot-business-logic-fluesterer.png"
author: 'markus-waldheim'
keywords: "Copilot, Business-Logik, Kontext, Entwickler-Tipps, Produktivität"
---
Der Fachlogik-Flüsterer 🗣️: Wie vermittelst du der KI komplexe Business-Logik?
Hallo und herzlich willkommen zum großen Finale unserer GitHub Copilot Serie! 👋

Wir haben Copilot trainiert, unsere Architektur und unsere Regeln zu verstehen. Aber die größte Herausforderung bleibt: Wie bringen wir ihm die einzigartige Fachlogik bei, die unser Geschäft ausmacht?

Das Problem, das jeder kennt:
Die KI weiß, wie man eine if-Bedingung schreibt. Sie weiß aber nicht, warum sie geschrieben werden muss. Sie kennt die Syntax, aber nicht die Semantik deines Geschäfts. Sie weiß nicht, dass "ein Auftrag nur storniert werden darf, wenn der Status nicht 'versendet' ist" oder welche komplexen Regeln für die Berechnung von Versandkosten gelten.

Die Lösung im Detail: Du bist der Experte, Copilot der Umsetzer
Du kannst diese komplexe Logik nicht einfach in die /instructions schreiben. Du musst sie Copilot genau dann geben, wenn er sie braucht. Das ist eine aktive Partnerschaft.

Der "Kontext-Block" im Kommentar: Bevor du eine komplexe Funktion beginnst, schreibe einen ausführlichen Kommentarblock, der die Business-Regeln in einfacher Sprache beschreibt. Behandle es wie eine User Story.

Typen und Interfaces als Sprache nutzen: Der beste Weg, Fachlogik zu kommunizieren, sind stark typisierte Datenstrukturen. Ein klares Invoice oder CustomerProfile Interface in TypeScript oder eine C#-Klasse ist für Copilot mehr wert als tausend Worte. Er versteht die Beziehungen und Eigenschaften der Daten.

Beispiele geben: Der schnellste Weg, ein Muster zu vermitteln, ist ein Beispiel. Gib Copilot im Chat ein Input-Objekt und das von dir erwartete Output-Objekt. Sage dann: "Schreibe eine Funktion, die diesen Input in jenen Output umwandelt und dabei die folgenden Schritte beachtet."

Konkretes Beispiel:
Du musst eine Funktion zur Berechnung von Versandkosten schreiben.

👎 Der naive Ansatz:
Du schreibst // Funktion zur Berechnung der Versandkosten. Copilot wird eine generische Funktion vorschlagen, die vielleicht Gewicht und Entfernung berücksichtigt, aber deine spezifischen Regeln (z.B. "kostenloser Versand für Premiumkunden, außer bei Sperrgut") nicht kennt.

👍 Der "geflüsterte" Ansatz:
Du schreibst einen Kommentarblock direkt über der Funktion:

C#

/*
 * Business Logic for Shipping Cost Calculation:
 * 1. Base cost is 5 EUR.
 * 2. If the order value is over 100 EUR, shipping is free.
 * 3. Exception: If the order contains a 'bulky' item, shipping is always 25 EUR, regardless of order value.
 * 4. Premium members get a 50% discount on the final shipping cost, but not on bulky items.
*/
// public static decimal CalculateShipping(Order order)
Wenn du jetzt Copilot den Code vervollständigen lässt, wird er versuchen, exakt diese Regeln in Code umzusetzen.

✨ Pro-Tipp:
Legt euch im Projekt einen Ordner /.docs oder /business-logic an. Darin pflegt ihr einfache Markdown-Dateien, die zentrale Geschäftslogiken beschreiben (invoicing.md, returns_process.md). Wenn du an einer solchen Logik arbeitest, kannst du Copilot im Chat mit @file:./.docs/invoicing.md den gesamten Kontext geben und ihn bitten, auf dieser Basis zu arbeiten.

Abschluss & Ausblick:
Hier schließt sich der Kreis. Du nutzt Copilot nicht mehr nur als Werkzeug, sondern als echten Partner. Du bist der Fachexperte, der das "Was" und "Warum" vorgibt. Copilot ist der Implementierungs-Experte, der das "Wie" liefert. Diese Partnerschaft ist der Schlüssel, um mit KI wirklich effizient und qualitativ hochwertig Software zu entwickeln.

Ich hoffe, diese Serie hat euch gefallen und viele neue Ideen für euren Arbeitsalltag gegeben. Viel Spaß beim Ausprobieren und bis zum nächsten Mal! 😊

-----

**Interessieren Sie sich für dieses Thema oder benötigen Sie Beratung?**  
Ich unterstütze Sie gerne bei Ihren Projekten. [Kontaktieren Sie mich für eine strategische Beratung.](mailto:admin@waldheim.dev)
