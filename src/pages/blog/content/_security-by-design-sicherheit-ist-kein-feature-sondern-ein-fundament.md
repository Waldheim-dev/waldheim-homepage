---
title: "Security by Design: Wie ich Sicherheitsanforderungen in den Designprozess integriere"
description: "Ich zeige, wie ich Sicherheitsüberlegungen von Anfang an in den Designprozess für digitale Produkte einbeziehe, lange bevor die erste Zeile Code geschrieben wird."
pubDate: "2025-09-26"
heroImage: "/blogs/security-by-design-sicherheit-ist-kein-feature-sondern-ein-fundament.png"
author: 'markus-waldheim'
keywords: Security by Design, DevSecOps, Produktdesign, UX, Sicherheit, Softwareentwicklung, Threat Modeling
---

## Security by Design: Sicherheit ist kein Feature, sondern ein Fundament

Stellen Sie sich vor, Sie bauen ein Haus. Sie planen die Zimmer, die Fenster, die Türen. Erst als das Haus fast fertig ist, fällt Ihnen ein, dass Sie Schlösser, Alarmanlagen und feuerfeste Türen benötigen. Die Nachrüstung ist teuer, umständlich und oft weniger effektiv als eine von Anfang an geplante Sicherheitsarchitektur. Genau dieses Szenario spielt sich täglich in der Softwareentwicklung ab, wenn Sicherheit als nachträglicher Gedanke ("Afterthought") behandelt wird.

"Security by Design" (oder "Privacy by Design" im DSGVO-Kontext) ist die Philosophie, die diesen Fehler vermeidet. Es bedeutet, Sicherheit von der allerersten Idee an als fundamentalen, nicht verhandelbaren Bestandteil des Produktdesigns zu betrachten. Als DevSecOps-Stratege arbeite ich eng mit Produktmanagern, UX/UI-Designern und Architekten zusammen, lange bevor die erste Zeile Code geschrieben wird. In diesem Beitrag zeige ich, wie ich Sicherheitsanforderungen systematisch in den frühen Designprozess integriere.

### Warum "späte" Sicherheit scheitert

Sicherheit am Ende des Entwicklungszyklus hinzuzufügen, führt unweigerlich zu:
* **Höheren Kosten:** Fehler im Design zu beheben ist um ein Vielfaches teurer als Fehler im Code.
* **Schlechterer User Experience (UX):** Aufgesetzte Sicherheitsmaßnahmen fühlen sich oft umständlich an (z.B. unlogische Passwortregeln, störende MFA-Abfragen).
* **Fundamentalen Schwachstellen:** Manche architektonischen Sicherheitslücken lassen sich nachträglich gar nicht mehr oder nur durch einen kompletten Umbau beheben.

### Mein Ansatz: Sicherheit im Design-Workshop

Ich integriere Sicherheit direkt in die initialen Design- und Anforderungsworkshops. Meine Werkzeuge sind dabei nicht Code-Scanner, sondern gezielte Fragen und Methoden.

#### 1. Threat Modeling: Die Denkweise eines Angreifers einnehmen

Bevor wir über Lösungen sprechen, müssen wir die Risiken verstehen. Threat Modeling ist ein strukturierter Prozess, um potenzielle Bedrohungen zu identifizieren.

* **Die Methode:** Gemeinsam mit dem Team (Designer, PM, Entwickler) zerlegen wir das geplante Feature. Wir zeichnen Datenflussdiagramme und fragen uns bei jedem Schritt: "Was könnte hier schiefgehen?" (STRIDE-Methode: **S**poofing, **T**ampering, **R**epudiation, **I**nformation Disclosure, **D**enial of Service, **E**levation of Privilege).
* **Beispiel (Login-Funktion):**
    * *Spoofing:* Kann sich ein Angreifer als anderer Benutzer ausgeben? (-> erfordert starke Authentifizierung)
    * *Information Disclosure:* Was passiert, wenn die Passwort-Datenbank leckt? (-> erfordert starkes Hashing mit Salt)
    * *Denial of Service:* Kann ein Angreifer durch zu viele Login-Versuche einen Account sperren? (-> erfordert Rate Limiting und Account-Lockout-Strategie)

Aus den identifizierten Bedrohungen leiten wir konkrete Sicherheitsanforderungen ab, die zu User Stories werden.

#### 2. Definition von "Abuse Cases" neben "Use Cases"

Produktmanager definieren "Use Cases" (Wie soll ein Nutzer das Feature verwenden?). Ich bestehe darauf, auch "Abuse Cases" (Wie könnte ein Angreifer das Feature missbrauchen?) zu definieren.

* **Beispiel (Profilbild-Upload):**
    * *Use Case:* "Als Nutzer möchte ich ein Profilbild hochladen, damit mein Profil persönlicher ist."
    * *Abuse Case 1:* "Als Angreifer möchte ich eine riesige Datei hochladen, um den Speicherplatz des Servers zu erschöpfen." (-> Anforderung: Größenlimitierung)
    * *Abuse Case 2:* "Als Angreifer möchte ich eine Datei mit bösartigem Code (z.B. SVG mit JavaScript) hochladen, die bei anderen Nutzern ausgeführt wird." (-> Anforderung: Serverseitige Validierung und Bereinigung des Bildes)

Diese Abuse Cases werden Teil der Anforderungen und müssen vom Design und der Implementierung abgedeckt werden.

#### 3. UX-Design für Sicherheit

Sicherheit darf die Benutzerfreundlichkeit nicht ruinieren. Ein gutes Design macht die sichere Option zur einfachsten Option.

* **Meine Zusammenarbeit mit UX-Designern:**
    * **Passwort-Manager-Freundlichkeit:** Wir gestalten Login-Formulare so, dass Passwort-Manager sie leicht befüllen können (korrekte HTML-Attribute).
    * **Verständliche Fehlermeldungen:** Anstatt "Fehler 500" zeigen wir eine hilfreiche, aber nicht zu detaillierte Fehlermeldung, die den Nutzer nicht verunsichert, aber einem Angreifer keine Informationen liefert.
    * **MFA-Implementierung:** Wir designen den MFA-Prozess so, dass er möglichst reibungslos ist (z.B. "Trust this device for 30 days").
    * **Berechtigungsabfragen:** Wir fragen Berechtigungen (z.B. Zugriff auf Kontakte) erst dann an, wenn sie wirklich benötigt werden (Just-in-Time), und erklären, warum.

#### 4. Datenschutz als Design-Prinzip (Privacy by Design)

Insbesondere unter der DSGVO muss Datenschutz von Anfang an mitgedacht werden.

* **Datenminimierung:** Wir stellen bei jedem Datenfeld im Wireframe die Frage: "Müssen wir diese Information wirklich sammeln und speichern?"
* **Zweckbindung:** Für welche Zwecke werden die Daten verwendet? Das Design muss dies transparent machen.
* **Einwilligungs-Management:** Das Design für die Einholung von Einwilligungen (z.B. für Newsletter) muss klar, verständlich und freiwillig sein.

## Fazit: Sicherheit als gemeinsamer Nenner

Security by Design verschiebt die Verantwortung für Sicherheit von einer reinen Entwickleraufgabe hin zu einer gemeinsamen Verantwortung des gesamten Produktteams. Wenn Sicherheitsanforderungen von Anfang an Teil des Designs, der User Stories und der Wireframes sind, werden sie zu einem integralen Bestandteil des Produkts und nicht zu einem teuren, aufgesetzten Add-on. Dieser proaktive Ansatz führt nicht nur zu sichereren, sondern oft auch zu durchdachten und benutzerfreundlicheren digitalen Produkten.

-----

**Möchten Sie Sicherheit von Anfang an in Ihren Produktentwicklungsprozess integrieren und teure Nachbesserungen vermeiden?**
Ich helfe Ihnen, Methoden wie Threat Modeling und die Definition von Abuse Cases in Ihren Design-Prozess zu etablieren und eine Kultur der "Security by Design" in Ihrem Team zu verankern. [Kontaktieren Sie mich für einen Workshop zu sicheren Design-Praktiken.](/kontakt/)
