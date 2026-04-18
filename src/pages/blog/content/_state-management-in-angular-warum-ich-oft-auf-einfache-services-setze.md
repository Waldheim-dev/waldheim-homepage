---
title: "State Management in Angular: Warum ich oft auf einfache Services setze"
description: "Ein Meinungsbeitrag, in dem ich argumentiere, warum ich in vielen Angular-Projekten komplexe State-Management-Bibliotheken meide und auf schlanke Service-Architekturen setze."
pubDate: "2025-09-25"
heroImage: "/blogs/state-management-in-angular-warum-ich-oft-auf-einfache-services-setze.png"
author: 'markus-waldheim'
keywords: Angular, State Management, NgRx, RxJS, Softwarearchitektur, Frontend, Services
---

## State Management in Angular: Komplexität als Feature oder als Last?

Wenn man über State Management in großen Angular-Anwendungen spricht, fällt fast zwangsläufig der Name **NgRx**. Inspiriert von Redux, bietet NgRx ein mächtiges, aber auch sehr rigides Framework zur Verwaltung des Anwendungszustands: mit Actions, Reducern, Selectors und Effects. Es verspricht einen unidirektionalen Datenfluss, Vorhersagbarkeit und eine klare Trennung der Belange. Und für sehr große, komplexe Anwendungen mit vielen interagierenden Teilen kann dies absolut der richtige Weg sein.

Doch in meiner langjährigen Praxis als Angular-Architekt habe ich eine Beobachtung gemacht: In schätzungsweise 80% der Projekte, in denen NgRx oder ähnliche komplexe Bibliotheken eingesetzt werden, ist ihre Komplexität nicht nur unnötig, sondern sogar kontraproduktiv. Sie führt zu einem riesigen Boilerplate-Code, einer steilen Lernkurve für neue Teammitglieder und einer Trägheit, die der agilen Entwicklung im Wege steht. Deshalb argumentiere ich in diesem Beitrag für einen pragmatischeren Ansatz: **State Management mit einfachen, RxJS-basierten Angular-Services.**

### Die Illusion der Notwendigkeit

Der Zustand ("State") einer Anwendung ist nichts anderes als die Daten, die zu einem bestimmten Zeitpunkt auf der Benutzeroberfläche angezeigt werden und mit denen der Benutzer interagiert. Die Herausforderung besteht darin, diesen Zustand über verschiedene, nicht direkt miteinander verbundene Komponenten hinweg synchron zu halten.

Komplexe State-Management-Bibliotheken wurden populär, weil sie dieses Problem für Anwendungen im Facebook-Maßstab lösten. Die meisten Unternehmensanwendungen haben jedoch nicht die Komplexität von Facebook. Die Einführung einer schweren Bibliothek zur Lösung eines relativ einfachen Problems ist wie der Einsatz eines Vorschlaghammers, um einen Nagel einzuschlagen.

### Mein Ansatz: Die Macht von RxJS und BehaviorSubjects

Angular selbst liefert uns mit RxJS und dem Dependency-Injection-System alles, was wir für ein robustes und skalierbares State Management benötigen. Das Herzstück meines Ansatzes ist der `BehaviorSubject`.

Ein `BehaviorSubject` ist ein spezieller Typ von Observable, der zwei entscheidende Eigenschaften hat:
1.  Er hat immer einen aktuellen Wert. Jedes neue Subskription erhält sofort den letzten Wert.
2.  Man kann ihm von außen einen neuen Wert geben (`.next()`).

**Die Architektur eines "State Service":**

Ich erstelle für jeden logischen Datenbereich der Anwendung (z.B. `UserService`, `ProductService`) einen eigenen Angular-Service.

**Beispiel: Ein einfacher `UserService`**
```typescript
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  id: string;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // Privater BehaviorSubject, der den Zustand hält.
  private readonly _user$ = new BehaviorSubject<User | null>(null);
  
  // Öffentliches Observable, das Komponenten abonnieren können.
  public readonly user$: Observable<User | null> = this._user$.asObservable();

  constructor(private httpClient: HttpClient) {
    // Initiales Laden des Benutzers, z.B. aus einer API
    this.loadInitialUser();
  }

  private loadInitialUser(): void {
    // Logik, um den Benutzer von der API zu laden und den State zu setzen
    // this.httpClient.get<User>('/api/user/me').subscribe(user => this._user$.next(user));
  }

  public updateUser(updatedUser: User): void {
    // Logik, um den Benutzer in der API zu aktualisieren
    // Nach erfolgreichem Update den lokalen State aktualisieren
    this._user$.next(updatedUser);
  }

  public clearUser(): void {
    // Logout-Logik
    this._user$.next(null);
  }
}
```

**Wie Komponenten diesen Service nutzen:**

```typescript
import { Component } from '@angular/core';
import { UserService, User } from './user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  template: `
    <div *ngIf="user$ | async as user">
      <h1>Welcome, {{ user.name }}</h1>
      <p>Email: {{ user.email }}</p>
    </div>
  `
})
export class UserProfileComponent {
  public user$: Observable<User | null>;

  constructor(private userService: UserService) {
    this.user$ = this.userService.user$;
  }
}
```
**Warum ist dieser Ansatz so effektiv?**
* **Minimaler Boilerplate:** Wir nutzen nur das, was Angular uns bereits gibt. Kein riesiges Setup mit Actions, Reducern etc.
* **Typsicherheit:** Der gesamte State ist durch TypeScript-Interfaces stark typisiert.
* **Reaktivität:** Durch die Verwendung von Observables und dem `async`-Pipe reagiert die gesamte Anwendung automatisch auf Zustandsänderungen.
* **Einfachheit und Lernkurve:** Jeder Angular-Entwickler, der die Grundlagen von RxJS versteht, kann diesen Ansatz sofort verstehen und anwenden.

### Wann ist NgRx doch die bessere Wahl?

Ich bin kein Dogmatiker. Es gibt Szenarien, in denen die Komplexität von NgRx gerechtfertigt ist:
* **Sehr große Teams:** Wenn viele Entwickler parallel an hochgradig voneinander abhängigen Features arbeiten, kann die strikte Struktur von NgRx helfen, Konflikte zu vermeiden.
* **Komplexe, langlaufende Prozesse:** Wenn der Anwendungszustand von vielen asynchronen "Effects" (z.B. WebSocket-Events, komplexe API-Workflows) beeinflusst wird.
* **Anforderungen an "Time-Travel-Debugging":** Die Fähigkeit von Redux-DevTools, durch vergangene Zustände zu "reisen", ist ein mächtiges Debugging-Werkzeug.

Für die Mehrheit der Business-Anwendungen überwiegen jedoch die Nachteile der Komplexität die Vorteile dieser speziellen Features bei Weitem.

## Fazit: Pragmatismus vor Dogma

Die Wahl der richtigen State-Management-Strategie ist eine der wichtigsten Architekturentscheidungen in einem Angular-Projekt. Anstatt blind dem Hype um komplexe Bibliotheken zu folgen, plädiere ich für einen pragmatischen, auf den jeweiligen Anwendungsfall zugeschnittenen Ansatz. In den meisten Fällen bietet eine schlanke, auf RxJS-basierten Services aufgebaute Architektur die beste Balance aus Mächtigkeit, Skalierbarkeit und Einfachheit. Sie hält den Code sauber, das Team produktiv und die Anwendung performant.

-----

**Stehen Sie vor der Entscheidung für eine State-Management-Architektur in Ihrem neuen Angular-Projekt oder kämpfen mit der Komplexität einer bestehenden?**
Ich helfe Ihnen, die richtige, pragmatische Strategie für Ihren spezifischen Anwendungsfall zu finden und zu implementieren. Lassen Sie uns gemeinsam eine Architektur schaffen, die Ihr Problem löst, anstatt neue zu schaffen. [Kontaktieren Sie mich für eine Architekturberatung.](/kontakt/)
-----

**Interessieren Sie sich für dieses Thema oder benötigen Sie Beratung?**  
Ich unterstütze Sie gerne bei Ihren Projekten. [Kontaktieren Sie mich für eine strategische Beratung.](mailto:admin@waldheim.dev)
