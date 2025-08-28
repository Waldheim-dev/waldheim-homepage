---
title: "Dein persönlicher Code-Erklärer: Copilot /explain im Einsatz"
description: "Wie du mit Copilot /explain komplexen Code verstehst. Beispiele, Pro-Tipps und Ausblick."
pubDate: "2025-08-15"
heroImage: "/blogs/copilot-explain-feature.png"
author: 'markus-waldheim'
keywords: "Copilot, Explain, Codeverständnis, Produktivität, Entwickler-Tipps"
---
Dein persönlicher Code-Erklärer 🧑‍🏫: Wie du mit /explain den komplexesten Code verstehst
Hallo zusammen! 👋

Nachdem wir Copilot als fleißigen Schreiber, Aufräumer und Tester kennengelernt haben, schauen wir uns heute eine seiner wertvollsten Fähigkeiten an: die des Übersetzers und Mentors.

Das Problem, das jeder kennt:
Du übernimmst ein Projekt und findest eine Funktion, die undokumentiert, aber kritisch für die Anwendung ist. Oder du stößt auf eine Zeile mit einer Regular Expression (Regex), die aussieht wie eine zufällige Ansammlung von Sonderzeichen. Du könntest jetzt 30 Minuten lang googeln und versuchen, es zu entschlüsseln, oder...

Die Lösung im Detail: Der /explain Befehl im Chat
GitHub Copilot Chat ist dafür gemacht, dir Kontext zu geben. Du kannst jeden beliebigen Code-Block markieren – von einer einzelnen Zeile bis zu einer ganzen Klasse – und den Chat-Befehl /explain verwenden. Copilot analysiert den Code und gibt dir eine strukturierte Erklärung seiner Funktionsweise in natürlicher Sprache.

Konkretes Beispiel:
Stellen wir uns vor, du findest diese Regex zur Validierung einer URL und hast keine Ahnung, was sie tut:

↔️ Der unverständliche Code:

JavaScript

const urlRegex = /^(httpsაც://)?(www\.)?([a-zA-Z0-9-]+\.){1,}[a-zA-Z]{2,}(:[0-9]{1,5})?(\/.*)?$/;
👍 Der /explain Auftrag & das Ergebnis:
Du markierst die Zeile, öffnest den Chat und tippst /explain. Copilot antwortet dir mit einer übersichtlichen Liste, die etwa so aussieht:

Gerne, hier ist eine Erklärung dieser Regular Expression:

^: Markiert den Anfang der Zeichenkette.
(httpsაც://)?: Sucht optional (?) nach http:// oder https://.
(www\.)?: Sucht optional nach dem www.-Subdomain-Präfix.
([a-zA-Z0-9-]+\.){1,}: Sucht nach dem Domainnamen. Er muss aus Buchstaben, Zahlen oder Bindestrichen bestehen, gefolgt von einem Punkt. Dies kann sich für Subdomains wiederholen.
[a-zA-Z]{2,}: Sucht nach der Top-Level-Domain (wie .com, .de), die aus mindestens zwei Buchstaben besteht.
(:[0-9]{1,5})?: Sucht optional nach einem Port (z.B. :8080).
(\/.*)?: Sucht optional nach einem Pfad (z.B. /pfad/zur/seite.html).
$: Markiert das Ende der Zeichenkette.

Plötzlich ist die kryptische Zeile vollkommen verständlich.

✨ Pro-Tipp:
Stelle Folgefragen! Wenn dir ein Teil der Erklärung unklar ist, frage einfach nach: "Was genau bedeutet ? in diesem Kontext?" oder "Kannst du mir ein Beispiel für eine URL geben, die NICHT auf dieses Muster passt?" Copilot führt den Dialog mit dir fort.

Abschluss & Ausblick:
Die /explain-Funktion ist ein Game-Changer für das Onboarding in neue Projekte und den Umgang mit Legacy-Code. Sie spart nicht nur Zeit, sondern fördert auch das Verständnis und die Lernkurve im Team.

Im nächsten Beitrag gehen wir einen Schritt weiter und zeigen Copilot, wie es sich Dinge über unser Projekt merken kann. Sei gespannt auf: "Das Gedächtnis der KI 🧠: So gibst du Copilot Kontext mit @workspace und /instructions."
