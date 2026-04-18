---
title: "K8s Battleship: Wenn Kinderspiel auf Enterprise-Infrastruktur trifft 🚢"
description: "Von 'Schiffe versenken' zu 'Pods versenken': Wie ich ein Kinderspiel in ein Resilience-Training verwandle. Mit API-Calls, Gamification und autonomer Verteidigung."
pubDate: "2025-10-13"
heroImage: "/blogs/cloudland_2026_battleship.png"
imagePrompt: "Professional high-tech 3D render or minimalist illustration for a blog post titled 'K8s Battleship: Wenn Kinderspiel auf Enterprise-Infrastruktur trifft 🚢'. Theme: Von 'Schiffe versenken' zu 'Pods versenken': Wie ich ein Kinderspiel in ein Resilience-Training verwandle. Mit API-Calls, Gamification und autonomer Verteidigung.. Style: Modern enterprise glass aesthetic, dark mode, accent colors (cyan, amber, or violet), high resolution, 16:9 aspect ratio."
author: "markus-waldheim"
keywords: "Kubernetes, K8s, Battleship, Gamification, CloudLand, 2026, Platform Engineering, DevOps, Resilience, GitOps, FluxCD, Go, Golang, Live Demo, Interactive, Conference"
---

## "C5." – "Treffer, versenkt!" 🚢💥

Erinnert ihr euch an "Schiffe versenken"? Zwei Spieler, zwei Papierraster, Stecknadeln und Koordinaten. "B3?" – "Wasser!" – "Verdammt."

Als Kind war das Strategie. Pure, ungefilterte Spannung. Kein Internet, kein Smartphone, nur Logik und Glück.

2026 bringen wir das auf die CloudLand. Auf den Big Screen. Aber statt Schiffen haben wir **Pods**. Statt Stecknadeln nutzen wir **API-Calls**. Und statt eines Gegners am Tisch spielt ihr gegen eine **autonome Plattform**.

Willkommen bei **K8s Battleship**.

### Das Konzept: Gamified Resilience Testing

Die Idee ist simpel: Ich baue ein Kubernetes-Cluster mit mehreren Deployments (unsere "Schiffe"). Ihr bekommt ein Interface, über das ihr Koordinaten angebt – zum Beispiel "Pod 3 in Namespace Alpha". Wenn ihr trefft, wird der Pod gelöscht. Wenn ihr versenkt, geht das gesamte Deployment down.

Aber hier ist der Twist: **Das Cluster versucht sich zu wehren**.

FluxCD heilt. Horizontal Pod Autoscaler (HPA) skaliert hoch. PodDisruptionBudgets (PDB) blockieren eure Angriffe. Und ich habe ein Go-Backend gebaut, das **intelligent** reagiert – nicht nur stumpf reconciled.

Es ist ein Duell. Mensch gegen Maschine. Oder genauer: **Crowd gegen Platform**.

### Das Spielfeld: Namespace-Grid statt Papier

Das klassische "Schiffe versenken" hat ein 10x10-Raster. Mein K8s-Battleship nutzt ein ähnliches Konzept:

- **5 Namespaces** (vertikal: Alpha, Beta, Gamma, Delta, Epsilon)
- **8 Pod-Slots** pro Namespace (horizontal: 1-8)

Jedes "Schiff" ist ein Deployment mit mehreren Replicas (z.B. ein "Kreuzer" = 3 Pods, ein "Schlachtschiff" = 5 Pods).

Das Grid sieht ungefähr so aus:

```
    1   2   3   4   5   6   7   8
A   🟦  🟦  🚢  🚢  🟦  🟦  🟦  🟦
B   🟦  🚢  🚢  🚢  🟦  🟦  🟦  🟦
C   🟦  🟦  🟦  🟦  🟦  🚢  🟦  🟦
D   🟦  🟦  🟦  🟦  🟦  🟦  🟦  🟦
E   🚢  🚢  🚢  🚢  🚢  🟦  🟦  🟦
```

Ihr seht nur die Koordinaten. Die Schiffe sind versteckt. Aber ihr könnt raten. Oder strategisch vorgehen.

### Die Waffen: API-Calls statt Stecknadeln

Ihr wählt eine Koordinate aus (z.B. "B3"). Das Frontend schickt einen API-Call an mein Go-Backend:

```bash
POST /api/v1/attack
{
  "namespace": "beta",
  "pod_index": 3,
  "attacker_id": "user-12345"
}
```

Das Backend prüft:

1. **Existiert ein Pod an dieser Koordinate?**
2. **Ist der Pod Teil eines "Schiffes" (Deployments)?**
3. **Ist der Pod durch ein PodDisruptionBudget geschützt?**

Wenn ja: Der Pod wird gelöscht. Das Frontend zeigt ein 💥-Icon. Und das Publikum jubelt.

Wenn nein: "Wasser!" – nichts passiert.

### Die Verteidigung: Autonome Selbstheilung

Aber hier hört das Spiel nicht auf. Denn während ihr angreift, passiert im Hintergrund:

#### 1. FluxCD reconciled

FluxCD erkennt, dass ein Pod fehlt. Es triggert ein Deployment-Rollout. Ein neuer Pod erscheint. **Das Schiff repariert sich selbst**.

Auf dem Bildschirm seht ihr: 🚢 → 💥 → ⏳ → 🚢 (Pod ist wieder da!)

#### 2. Horizontal Pod Autoscaler (HPA) reagiert

Wenn zu viele Pods gleichzeitig angegriffen werden, skaliert der HPA automatisch hoch. Statt 3 Replicas habt ihr plötzlich 5. Oder 10.

**Eure Angriffe werden ineffektiver**.

#### 3. PodDisruptionBudgets (PDB) blockieren

Ein PDB sagt: "Mindestens X Pods müssen immer laufen." Wenn ihr versucht, den letzten Pod eines "Schiffes" zu löschen, blockt das PDB den Angriff.

Ihr seht: 🚫 "PDB blocked your attack!"

#### 4. Network Policies schützen kritische Pods

Manche Pods sind hinter Network Policies versteckt. Ihr könnt sie nicht direkt angreifen – ihr müsst erst die "Firewall" durchbrechen.

Das erfordert Strategie. Nicht nur blindes Raten.

### Die Visualisierung: Live Telemetry auf dem Big Screen

Das Schönste an K8s Battleship ist die Visualisierung. Auf dem Big Screen seht ihr:

#### 1. Das Grid (Live-Status aller Pods)

```
    1   2   3   4   5   6   7   8
A   🟦  🟦  💥  💥  🟦  🟦  🟦  🟦
B   🟦  🚢  🚢  🚢  🟦  🟦  🟦  🟦
C   🟦  🟦  🟦  🟦  🟦  ⏳  🟦  🟦
D   🟦  🟦  🟦  🟦  🟦  🟦  🟦  🟦
E   💥  💥  💥  💥  💥  🟦  🟦  🟦
```

- 🚢 = Pod läuft
- 💥 = Pod wurde getroffen (und ist down)
- ⏳ = Pod wird gerade geheilt (FluxCD arbeitet)
- 🟦 = Wasser (kein Pod)

#### 2. Echtzeit-Metriken (Prometheus + Grafana)

- **Anzahl aktiver Pods** (sollte stabil bleiben, wenn die Verteidigung hält)
- **Mean Time to Recovery (MTTR)** (wie schnell heilt FluxCD?)
- **Angriffs-Success-Rate** (wie viele Angriffe waren erfolgreich?)
- **API Latency** (wird das System unter Last langsamer?)

#### 3. Scoreboard

- **Team Angreifer**: Wie viele Pods habt ihr zerstört?
- **Team Verteidigung**: Wie viele Pods wurden geheilt?
- **Versenkte Schiffe**: Wie viele Deployments sind komplett down?

#### 4. Live-Logs (optional)

Für die Nerds unter euch zeige ich live die Kubernetes-Events:

```
[12:34:56] Pod beta-app-3 deleted by user-12345
[12:34:58] FluxCD detected drift in namespace beta
[12:35:02] New pod beta-app-7 created
[12:35:05] HPA scaled deployment beta-app to 5 replicas
```

### Die Regeln: Fairness & Safety

Natürlich kann ich nicht zulassen, dass ihr mein gesamtes Cluster zerlegt. Deshalb gibt es **Limits**:

#### 1. Rate Limits

Pro Teilnehmer: Max. 1 Angriff alle 5 Sekunden. Sonst könnte jemand mit einem Script das Spiel ruinieren.

#### 2. RBAC

Ihr dürft nur bestimmte Namespaces angreifen. Nicht das gesamte Cluster. Keine kritischen System-Pods.

#### 3. Observability

Jeder Angriff wird geloggt. Wenn jemand versucht, die Regeln zu brechen, sehe ich das sofort.

#### 4. Emergency Stop

Wenn das Cluster wirklich in Gefahr ist, habe ich einen "Kill Switch". Dann pausiere ich das Spiel, bis alles wieder stabil ist.

### Warum Gamification?

Warum dieser ganze Aufwand? Warum nicht einfach ein klassischer Vortrag mit Demo?

Weil **spielerisches Lernen effektiver ist**.

Studien zeigen: Menschen lernen besser, wenn sie aktiv beteiligt sind. Wenn sie Entscheidungen treffen. Wenn sie Konsequenzen sehen.

K8s Battleship ist nicht nur Entertainment. Es ist ein **Lernlabor**:

- Ihr lernt, wie **FluxCD** funktioniert (indem ihr zuschaut, wie es heilt).
- Ihr lernt, wie **PodDisruptionBudgets** schützen (indem ihr geblockt werdet).
- Ihr lernt, wie **Horizontal Pod Autoscaler** skaliert (indem ihr seht, dass eure Angriffe ineffektiver werden).
- Ihr lernt, wie **Resilience** sich anfühlt (indem ihr versucht, ein System zu brechen – und scheitert).

Das ist **Chaos Engineering** in seiner spielerischsten Form.

### Die technischen Hürden

Natürlich ist das nicht trivial. Hier sind die größten Herausforderungen:

#### 1. Performance unter Last

Wenn 100 Leute gleichzeitig API-Calls schicken, muss mein Backend skalieren. Ich nutze Go (wegen der Concurrency) und Redis (für Rate Limiting).

#### 2. State Management

Das Grid muss in Echtzeit synchronisiert werden. Wenn ein Pod gelöscht wird, muss jeder Teilnehmer das sofort sehen. Ich nutze WebSockets für Live-Updates.

#### 3. Fairness

Wie verhindere ich, dass eine Person das Spiel dominiert? Ich nutze **Weighted Randomization**: Wer weniger Treffer hat, bekommt eine leicht höhere Trefferwahrscheinlichkeit.

#### 4. Fail-Safes

Was passiert, wenn FluxCD nicht heilen kann? Was, wenn ein Deployment wirklich crasht? Ich habe Backup-Mechanismen (manuelle Rollbacks, Pre-Deployed Snapshots).

### Was ich von euch wissen will

Jetzt seid ihr dran. Wenn ihr auf der CloudLand dabei seid:

1. **Welche Features sollen im Spiel sein?**  
   Power-Ups? Combo-Attacks? Team-Modes?

2. **Welche Visualisierungen wollt ihr sehen?**  
   3D-Grid? Heatmaps? Live-Grafana-Dashboards?

3. **Welche Deployment-Strategien sollen Teil der Verteidigung sein?**  
   Blue/Green? Canary? Rolling Updates?

Schreibt mir eure Ideen. Ich baue sie ein.

### Der Stand der Dinge: Es funktioniert!

Ich habe einen Prototyp. Und es funktioniert. FluxCD heilt. Der HPA skaliert. PDBs blockieren. Das Grid aktualisiert sich in Echtzeit.

Es ist noch nicht perfekt. Aber es ist **spielbar**.

Und im Mai 2026 wird es hoffentlich auf der CloudLand-Bühne stehen. Mit euch als Angreifern. Mit mir als Verteidiger. Und mit Kubernetes als Schiedsrichter.

Ich kann es kaum erwarten.

### Die Einladung: Kommentiert mit "🔥"

Wenn ihr die Herausforderung annehmt – kommentiert mit 🔥.

Wenn ihr Ideen habt – schreibt sie mir.

Wenn ihr einfach nur neugierig seid – bleibt dran. Ich poste Updates.

Wir sehen uns im Mai. Trainiert eure Daumen. 👾

---

**PS:** Ja, ich weiß. "Schiffe versenken" heißt eigentlich "Battleship". Aber "K8s Battleship" klingt einfach besser als "K8s Schiffe Versenken". 😉

*Hashtags:* #Kubernetes #K8s #Battleship #Gamification #CloudLand2026 #PlatformEngineering #DevOps #Resilience #GitOps #FluxCD #Go #Golang #LiveDemo #Interactive
-----

**Interessieren Sie sich für dieses Thema oder benötigen Sie Beratung?**  
Ich unterstütze Sie gerne bei Ihren Projekten. [Kontaktieren Sie mich für eine strategische Beratung.](mailto:kontakt@waldheim.dev)
