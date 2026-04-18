---
title: "State Management in Angular: Warum ich oft auf einfache Services setze"
description: "Ein Meinungsbeitrag, in dem ich argumentiere, warum ich in vielen Angular-Projekten komplexe State-Management-Bibliotheken meide und stattdessen auf schlanke, wartbare Service-Architekturen setze."
pubDate: "2025-11-27"
heroImage: "/images/blog/state-management-in-komplexen-angular-anwendungen-warum-ich-oft-auf-einfache-services-setze.webp"
imagePrompt: "Professional high-tech 3D render or minimalist illustration for a blog post titled 'State Management in komplexen Angular-Anwendungen: Warum ich oft auf einfache Services setze.'. Theme: Ein Meinungsbeitrag, in dem ich argumentiere, warum ich in vielen Angular-Projekten komplexe State-Management-Bibliotheken meide und stattdessen auf schlanke, wartbare Service-Architekturen setze.. Style: Modern enterprise glass aesthetic, dark mode, accent colors (cyan, amber, or violet), high resolution, 16:9 aspect ratio."
author: "markus-waldheim"
keywords: "Angular, State Management, NgRx, RxJS, BehaviorSubject, Frontend, Softwarearchitektur"
---

## Brauchen wir wirklich NgRx für alles?

In der Angular-Welt herrscht oft der Glaube, dass eine Anwendung ab einer gewissen Komplexität zwingend eine Redux-ähnliche Library wie NgRx benötigt. Doch wer schon einmal hunderte Zeilen Boilerplate für eine einfache CRUD-Operation geschrieben hat, beginnt zu zweifeln. In diesem Beitrag teile ich meine Erfahrungen, warum ich in den meisten Projekten auf spezialisierte State-Management-Bibliotheken verzichte und stattdessen auf einfache, reaktive Angular-Services setze.

### 1. Das YAGNI-Prinzip: You Ain't Gonna Need It

NgRx bringt eine enorme strukturelle Stabilität, aber auch eine riesige kognitive Last mit sich.

*   **Komplexität vs. Nutzen:** Für viele Business-Anwendungen ist ein globaler State gar nicht notwendig. Meist reicht es aus, wenn Daten lokal in der Komponente oder einem Feature-Service leben.
*   **Boilerplate-Hölle:** Actions, Reducers, Selectors, Effects – für jede kleine Änderung müssen mehrere Dateien angefasst werden. Das bremst die Entwicklungsgeschwindigkeit massiv aus, besonders in agilen Projekten.

### 2. Die Power von RxJS BehaviorSubjects

Angular bringt mit RxJS bereits ein extrem mächtiges Werkzeug für State Management mit.

*   **Der "Service-with-a-Subject" Ansatz:** Ich erstelle einen Service, der einen `BehaviorSubject` als privaten State hält und diesen als `Observable` nach außen exponiert.
*   **Kapselung:** Nur der Service darf den State ändern (via Methoden). Die Komponenten konsumieren den State nur reaktiv. Das ist sauber, testbar und benötigt fast keinen zusätzlichen Code.

### 3. Wann einfache Services skalieren

Entgegen der landläufigen Meinung können einfache Services auch in großen Anwendungen hervorragend skalieren.

*   **Feature-basierte States:** Anstatt eines riesigen globalen Stores unterteile ich den State in fachliche Domänen. Ein `UserStoreService`, ein `CartStoreService`, ein `ProductStoreService`.
*   **Leichte Testbarkeit:** Einen Angular-Service zu testen ist deutlich einfacher, als die Interaktion von Actions, Effects und Reducern zu mocken.

### 4. Wann NgRx (oder ähnliches) doch Sinn macht

Ich bin kein Gegner von NgRx – es gibt spezifische Anwendungsfälle, in denen es glänzt.

*   **Extrem hoher State-Interconnectedness:** Wenn eine Aktion in einem Teil der App Auswirkungen auf zehn völlig andere Teile hat.
*   **Undo/Redo Funktionalität:** Wenn der gesamte Verlauf des States getrackt werden muss.
*   **Sehr große Teams:** Wo strikte Vorgaben wichtiger sind als individuelle Entwicklungsgeschwindigkeit.

## Fazit: Pragmatismus schlägt Dogma

State Management sollte ein Problem lösen, nicht neue erschaffen. Bevor Sie zu NgRx greifen, fragen Sie sich: Kann ich das Gleiche mit einem reaktiven Angular-Service und zehn Zeilen RxJS erreichen? In 90% der Fälle lautet die Antwort: Ja. Und Ihr Team wird es Ihnen danken, wenn der Code schlank, verständlich und wartbar bleibt.

-----

**Stehen Sie vor der Entscheidung für ein State-Management-Muster in Ihrem Angular-Projekt oder kämpfen Sie mit einer überkomplexen Codebasis?**  
Ich unterstütze Sie bei der Auswahl der richtigen Architektur für Ihre Anforderungen – pragmatisch, effizient und zukunftssicher. [Lassen Sie uns über Ihre Angular-Architektur sprechen.](mailto:admin@waldheim.dev)
