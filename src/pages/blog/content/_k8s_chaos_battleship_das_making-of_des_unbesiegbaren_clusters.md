---
title: "K8s Chaos Battleship: Das Making-Of des unbesiegbaren Clusters"
description: "Ein detaillierter Blick hinter die Kulissen unseres interaktiven Chaos Engineering Experiments für die Cloudland 2026 – gebaut mit Go, FluxCD und viel Zerstörungswut."
pubDate: "2026-05-06"
heroImage: "/images/blog/making-of-k8s-chaos-battleship-cloudland-2026.png"
author: 'markus-waldheim'
keywords: Kubernetes, Chaos Engineering, GoLang, FluxCD, GitOps, Gamification, Cloudland 2026, Platform Engineering, Resilienz, Self-Healing
---

# K8s Chaos Battleship: Das Making-Of des unbesiegbaren Clusters

⏳ **T-Minus 2 Wochen bis zur Cloudland 2026!**

Die heiße Phase hat begonnen. Während auf meinem Kalender der Termin immer näher rückt, läuft das "Making Of" der Installation auf Hochtouren. Mein Dev-Desk ist ein Schlachtfeld aus Code-Editoren, YAML-Dateien und Performance-Monitoren. Aber das Game steht, und ich bin bereit, euch einen Blick unter die Motorhaube zu gewähren.

Hier ist das offizielle Making-Of meines Projekts, das beweist: Resilience kann verdammt viel Spaß machen.

![Ein Blick auf die UI vom K8s Chaos Battleship](/images/blog/k8s_battleship.png)
*(Im folgenden Screenshot seht ihr die Benutzeroberfläche des Spiels)*

## 1. Die Vision: Chaos wird sichtbar

Der Grundgedanke war einfach, aber radikal: Chaos Engineering ist oft abstrakt und trocken. Ich wollte Plattform-Resilienz und Self-Healing nicht nur auf Folien erklären, sondern sie physisch erlebbar machen. Die Idee des "K8s Chaos Battleship" war geboren – ein interaktives Multi-Player-Spiel, bei dem die Teilnehmer über ihre Smartphones zu Angreifern werden.

Eure Mission: Zerstört unsere Infrastruktur. Meine Mission: Zeigen, dass eine moderne, GitOps-gesteuerte Plattform (unser "unbesiegbarer Cluster") sich autonom gegen massiven Stress wehrt, ohne dass ein einziger Mensch eingreifen muss. Es ist der ultimative Proof of Concept für Platform Engineering.

## 2. Das technische Gerüst: Go und der K8s Client

Die Entwicklung des "Game Controllers" war der erste Meilenstein. Ich entschied mich für Go (Golang), da es die native Sprache von Kubernetes ist. Das ermöglichte mir, direkt auf die mächtige `k8s.io/client-go` Bibliothek zuzugreifen.

**Das Backend-Konzept:**
*   Ich schrieb einen schlanken Go-Service, der als Controller direkt im Spiel-Namespace läuft.
*   Er bietet eine REST-API für die Smartphone-Inputs der Spieler (z.B. Koordinate `A5`).
*   Im Hintergrund ordnet er diese Koordinate über eine In-Memory-Map einem spezifischen Pod oder Deployment-Replica zu.
*   Die Chaos-Routine in Go führt dann den `DeletePod` API-Call aus.
*   Parallel dazu streamt das Backend über WebSockets den Live-Status des Clusters an das Big-Screen-Frontend.

Der Code-Editor auf meinem Monitor zeigt gerade die Feinheiten dieses "Zerstörungs-Algorithmus" – ich muss sicherstellen, dass die Zerstörung schnell genug ist, um FluxCD herauszufordern.

## 3. Der Kampf der Giganten: Chaos vs. FluxCD

Die eigentliche Magie des Spiels liegt nicht in der Zerstörung, sondern in der Heilung (Reconciliation). Ich nutze **FluxCD**, um den "Desired State" unserer Schiffsflotte (die Deployments) im Cluster zu definieren.

Die größte Herausforderung im "Making Of" war das Tuning. Standardmäßige GitOps-Reconciliation-Intervalle von 30 Sekunden sind für ein Echtzeit-Spiel viel zu langsam. Das Spiel hätte sich "tot" angefühlt.

Ich experimentierte tief in den Konfigurationen von Flux, aggressiven Settings für Drift Detection und internen Requeue-Zeiten. Mein Ziel: Die Zeit zwischen einem API-gesteuerten Pod-Kill und der Erkennung des Drift-Status durch Flux zu minimieren. Nach viel Trial & Error erreichte ich, dass die Heilung (das Spawnen eines neuen Schiffsteils/Pods) oft innerhalb von 2-3 Sekunden visuell auf dem Screen sichtbar wird. Chaos tötet, GitOps heilt – im Sekundentakt.

## 4. Die Visualisierung: Das Spielfeld des Clusters

Das Frontend, das ich den Teilnehmern auf der Cloudland präsentieren wollte, musste intuitiv und visuell ansprechend sein. Ich wollte kein Kubernetes-Dashboard, sondern ein Spiel.

*   **Grid:** Ein 10x10 Hexagon-Gitter zeigt die "Wasserfläche" eures Clusters.
*   **Schiffe:** Ich ersetzte Schiffe durch stilisierte Kubernetes-Logos und Miniatur-Server-Racks.
*   **Explosionen:** Ich implementierte WebGL/Canvas-Effekte, um visuelle Zerstörung (digitale Pixel-Explosionen) in Echtzeit darzustellen, sobald unser Chaos-Agent einen Pod erfolgreich terminiert hat.
*   **Self-Healing:** Ich implementierte eine sanfte "Reparatur-Animation", die startet, sobald der K8s-Status des Pods von `Terminating` zurück auf `Running` wechselt. Das Schiff baut sich visuell wieder auf.

## 5. Lessons Learned & Fazit (T-Minus 2 Wochen)

Die letzten zwei Wochen waren geprägt von massiven Lasttests. Ich simulierte 5000 gleichzeitige Angreifer pro Sekunde. Go zeigte hier seine extreme Stärke in der Nebenläufigkeit und Performance. Ich musste jedoch lernen, dass das Limit oft nicht unser Go-Code ist, sondern die API-Rate-Limits des Kubernetes API-Servers. Ich implementierte Queuing-Mechanismen, um den API-Server vor Überlastung zu schützen, ohne das Spielgefühl zu beeinträchtigen.

Die Installation steht. Die Pipelines sind scharf geschaltet. Mein Go-Gopher-Pirat (die physische Figur auf meinem Tisch) ist bereit, die Cloudland zu erobern.

Ich freue mich riesig darauf, euch in zwei Wochen zu zeigen, was "Resilience in Action" bedeutet. Trainiert eure Daumen. Kommt vorbei, zückt das Smartphone und versucht, unseren Highscore zu knacken. Wer schafft es, den Cluster wirklich in die Knie zu zwingen?

Wir sehen uns auf der Cloudland 2026!

---

**Möchten Sie mehr darüber erfahren, wie ich mit Go und Flux komplexe Kubernetes-Betriebstools bauen?**
Besuchen Sie meinen Stand auf der Cloudland 2026 oder kontaktieren Sie mich direkt für eine Tech-Deep-Dive-Session. [Lassen Sie uns gemeinsam über die Zukunft des Platform Engineering sprechen.](/kontakt/)