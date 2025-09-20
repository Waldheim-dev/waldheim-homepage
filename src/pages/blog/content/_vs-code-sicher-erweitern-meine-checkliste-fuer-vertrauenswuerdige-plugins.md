---
title: "VS Code sicher erweitern: Wie ich Plugins auf Sicherheitsrisiken prüfe"
description: "Ich teile meine Checkliste zur Bewertung von VS Code-Erweiterungen, um zu verhindern, dass die IDE selbst zum Sicherheitsrisiko wird."
pubDate: "2025-09-16"
heroImage: "/blogs/vs-code-sicher-erweitern-meine-checkliste-fuer-vertrauenswuerdige-plugins.png"
author: 'markus-waldheim'
keywords: VS Code, Sicherheit, Erweiterungen, DevSecOps, IDE, Supply Chain Security, Endpoint Security
---

## VS Code sicher erweitern: Meine Checkliste für vertrauenswürdige Plugins

Das Ökosystem an Erweiterungen ist die größte Stärke von Visual Studio Code – und zugleich sein größtes Sicherheitsrisiko. Mit einem Klick können wir unserer IDE neue Sprachen, Linter, Debugger oder Themes hinzufügen. Doch was genau installieren wir da eigentlich? Jede Erweiterung ist im Grunde ein Stück Software, das mit weitreichenden Rechten auf unserem System läuft. Sie kann Dateien lesen und schreiben, Code ausführen und Netzwerkverbindungen aufbauen. Eine bösartige oder schlecht programmierte Erweiterung kann somit zur Backdoor für Angreifer werden.

Als DevSecOps-Experte, der für die Sicherheit von Entwicklungsumgebungen verantwortlich ist, nehme ich dieses Risiko sehr ernst. Die "Supply Chain Security" endet nicht bei den `npm`-Paketen oder Docker-Images; sie schließt auch die Werkzeuge ein, mit denen wir arbeiten. Bevor eine neue Erweiterung in meinem Team oder in meinen Projekten zum Einsatz kommt, durchläuft sie einen gründlichen Prüfprozess. In diesem Beitrag teile ich meine persönliche Checkliste, nach der ich VS Code-Erweiterungen auf Sicherheitsrisiken bewerte.

### Die goldene Regel: Misstrauen als Standard

Meine Grundhaltung gegenüber jeder neuen Erweiterung ist gesundes Misstrauen. Ich gehe davon aus, dass sie potenziell unsicher sein könnte, bis das Gegenteil bewiesen ist.

### Meine 5-Punkte-Sicherheits-Checkliste

#### 1. Herkunft und Reputation des Herausgebers (Publisher)

Wer steckt hinter der Erweiterung? Dies ist die erste und oft wichtigste Frage.

* **Verifizierter Herausgeber:** Ich bevorzuge Erweiterungen von bekannten und verifizierten Herausgebern. Ein kleines blaues Häkchen neben dem Namen im Marketplace (z.B. bei Microsoft, Red Hat, Google) ist ein starkes Vertrauenssignal.
* **Anzahl der Installationen und Bewertungen:** Eine hohe Anzahl an Installationen (oft Hunderttausende oder Millionen) und positive Bewertungen sind gute Indikatoren für eine etablierte und von der Community akzeptierte Erweiterung. Eine brandneue Erweiterung mit wenigen Downloads betrachte ich mit besonderer Vorsicht.
* **Aktivität und Wartung:** Ich prüfe das GitHub-Repository der Erweiterung (falls verlinkt). Wird es aktiv gepflegt? Wann war der letzte Commit? Werden Issues zeitnah beantwortet? Eine verwaiste Erweiterung ist ein Sicherheitsrisiko, da bekannte Schwachstellen nicht gepatcht werden.

#### 2. Open Source und Transparenz

Ich setze fast ausschließlich auf Open-Source-Erweiterungen.

* **Einsehbarkeit des Codes:** Der Quellcode muss öffentlich einsehbar sein, idealerweise auf GitHub. Dies ermöglicht es mir (oder der Community), den Code auf verdächtige Muster zu überprüfen.
* **Build-Prozess:** Ist der Build-Prozess transparent? Idealerweise gibt es eine CI/CD-Pipeline (z.B. GitHub Actions), die zeigt, wie die veröffentlichte `.vsix`-Datei aus dem Quellcode erstellt wird. Dies minimiert das Risiko, dass der Publisher bösartigen Code hinzufügt, der nicht im Repository sichtbar ist.

#### 3. Berechtigungen und Funktionalität ("Principle of Least Privilege")

Benötigt die Erweiterung die Berechtigungen, die sie implizit durch ihre Funktionalität erhält?

* **Analyse des Funktionsumfangs:** Ich frage mich: Was genau *tut* diese Erweiterung? Eine einfache Theme-Erweiterung sollte keinen Netzwerkzugriff benötigen oder Dateien schreiben. Ein Linter muss Lesezugriff auf den Code haben, aber sollte er auch beliebige Befehle im Terminal ausführen?
* **Prüfung auf verdächtige APIs:** Im Quellcode suche ich nach der Verwendung potenziell gefährlicher Node.js-APIs wie `child_process.exec` (Ausführen von Shell-Befehlen), `fs` (Dateisystemzugriff an unerwarteten Stellen) oder `http`/`https' (Netzwerk-Anfragen an unbekannte Domains).

#### 4. Abhängigkeiten (Supply Chain)

Eine VS Code-Erweiterung ist oft eine Node.js-Anwendung und hat ihre eigenen Abhängigkeiten (`package.json`).

* **Analyse der `node_modules`:** Die Schwachstelle liegt oft nicht in der Erweiterung selbst, sondern in einer ihrer Abhängigkeiten.
* **Meine Praxis:** Ich klone das Repository der Erweiterung und führe einen Sicherheits-Scan der Abhängigkeiten durch.
    ```bash
    # Im geklonten Verzeichnis der Erweiterung
    npm install
    npm audit --production
    ```
    Der Befehl `npm audit` prüft die installierten Pakete gegen eine Datenbank bekannter Schwachstellen.

#### 5. Community-Feedback und bekannte Probleme

Ich bin selten der Erste, der eine Erweiterung prüft.

* **GitHub Issues:** Ich durchsuche die offenen und geschlossenen Issues im Repository nach sicherheitsrelevanten Schlagwörtern wie "security", "vulnerability" oder "malicious".
* **Marketplace Q&A:** Die "Q&A"-Sektion im VS Code Marketplace kann ebenfalls wertvolle Hinweise von anderen Nutzern enthalten.

## Fazit: Machen Sie Ihre IDE zur Festung, nicht zum Einfallstor

Die Erweiterbarkeit von VS Code ist ein Segen für die Produktivität, aber sie erfordert Disziplin und ein sicherheitsbewusstes Vorgehen. Indem Sie eine systematische Checkliste zur Bewertung von Erweiterungen anwenden, verwandeln Sie den Auswahlprozess von einem Glücksspiel in eine fundierte Sicherheitsentscheidung. Sie stellen sicher, dass Ihre IDE eine sichere und vertrauenswürdige Umgebung bleibt, und schützen damit nicht nur Ihren eigenen Rechner, sondern die Integrität der gesamten Software, die Ihr Team entwickelt.

-----

**Sind Sie unsicher, ob die in Ihrem Unternehmen verwendeten VS Code-Erweiterungen sicher sind?**
Ich helfe Ihnen, eine Strategie und einen Prozess für das sichere Management von IDE-Erweiterungen zu etablieren. Von der Erstellung einer Whitelist bis zur Schulung Ihrer Entwickler – lassen Sie uns gemeinsam Ihre Entwicklungsumgebung härten. [Kontaktieren Sie mich für eine Überprüfung Ihrer IDE-Sicherheitsstrategie.](/kontakt/)
