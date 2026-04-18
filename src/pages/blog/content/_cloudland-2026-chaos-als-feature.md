---
title: "Chaos als Feature: Mein CloudLand-Experiment 2026 🚀"
description: "Wie aus Frust über 'Death by PowerPoint' die Idee eines live angreifbaren Kubernetes-Clusters wurde. Go, K8s und kontrolliertes Chaos auf der CloudLand 2026."
pubDate: "2025-10-10"
heroImage: "/blogs/cloudland_2026_game_sended.png"
imagePrompt: "Professional high-tech 3D render or minimalist illustration for a blog post titled 'Chaos als Feature: Mein CloudLand-Experiment 2026 🚀'. Theme: Wie aus Frust über 'Death by PowerPoint' die Idee eines live angreifbaren Kubernetes-Clusters wurde. Go, K8s und kontrolliertes Chaos auf der CloudLand 2026.. Style: Modern enterprise glass aesthetic, dark mode, accent colors (cyan, amber, or violet), high resolution, 16:9 aspect ratio."
author: "markus-waldheim"
keywords: "CloudLand, 2026, Kubernetes, Chaos Engineering, Go, Golang, K8s, FluxCD, GitOps, Speaker, Conference, DevOps, Cloud Native, Resilience, Live Demo"
---

## Ich habe gerade "Senden" gedrückt 📩

Gestern Abend habe ich auf "Submit" geklickt. Meine Einreichung für die CloudLand 2026 ist raus. Und ehrlich gesagt: Mir kribbelt es immer noch in den Fingern.

Warum? Weil ich etwas eingereicht habe, das ich so noch nie gemacht habe. Keinen Standardvortrag. Keine "Death by PowerPoint". Keine 45 Minuten, in denen ich euch Architekturdiagramme zeige, während ihr heimlich auf euer Handy schaut.

Ich plane ein **Experiment**. Ein Live-Experiment. Mit echten Systemen. Und euch als Angreifer.

### Die Ausgangslage: Warum noch ein Vortrag?

Seien wir ehrlich: Die Cloud-Native-Konferenzlandschaft ist voll. Kubernetes-Vorträge gibt es wie Sand am Meer. Jeder erzählt von Resilience, High Availability und Self-Healing. Aber wie oft habt ihr das wirklich **gesehen**? Wie oft wurde live demonstriert, dass ein System tatsächlich hält, was es verspricht?

Ich habe mich gefragt: Was fehlt? Was würde mich selbst vom Stuhl reißen?

Die Antwort: **Interaktivität. Risiko. Echte Systeme unter echtem Stress.**

### Das Konzept: Baut ein System. Lasst es angreifen.

Hier ist die Idee in drei Sätzen:

1. Ich baue eine Kubernetes-Infrastruktur mit GitOps (FluxCD), Go-Backends und allem, was dazugehört.
2. Ich **öffne diese Infrastruktur für Angriffe** – live, auf der Bühne, mit euch als Teilnehmer.
3. Wir schauen gemeinsam zu, ob mein Setup hält. Oder ob ihr es zerlegt.

Das ist kein theoretisches Szenario. Das ist keine Simulation. Das ist ein echtes Cluster, das ihr versuchen dürft zu zerstören.

### Der Tech-Stack: Go + K8s + GitOps

Warum **Go**? Weil Go die perfekte Sprache für Cloud-Native-Tooling ist. Schnell, effizient, und mit einer fantastischen Standard-Library für Netzwerk- und Concurrency-Patterns. Ich schreibe gerade einen "Chaos-Agent" in Go – mehr dazu im nächsten Blogpost.

Warum **Kubernetes**? Weil K8s das Paradebeispiel für selbstheilende Systeme ist. Aber wie gut funktioniert das wirklich, wenn hundert Leute gleichzeitig auf "Kaputtmachen" drücken?

Warum **FluxCD**? Weil GitOps die Antwort auf die Frage ist: "Wie stelle ich sicher, dass mein System immer im gewünschten Zustand ist?" FluxCD reconciled kontinuierlich. Aber kann es schneller heilen, als ihr zerstören könnt?

### Security-by-Design vs. "Bitte kaputtmachen"

Natürlich ist das ein schmaler Grat. Ich will euch Angriffsflächen bieten – aber nicht meine gesamte Infrastruktur riskieren. Deshalb arbeite ich mit:

- **Isolierten Namespaces**: Jeder Teilnehmer bekommt seinen eigenen "Sandkasten".
- **RBAC (Role-Based Access Control)**: Ihr dürft bestimmte Ressourcen löschen, aber nicht andere.
- **Rate Limits**: Damit nicht jemand mit einem Script das gesamte Spiel kaputt macht.
- **Observability**: Prometheus, Grafana und Loki zeigen live, was passiert.

Es ist kontrolliertes Chaos. Ich baue absichtlich Angriffspunkte ein – aber mit Sicherheitsnetzen.

### Das Ziel: Ein Lernlabor für Resilience

Das hier ist kein Entertainment. Okay, ein bisschen schon. Aber vor allem geht es um **Lernen**.

Ich will zeigen:

- Welche Fehler passieren, wenn ein System unter Stress gerät.
- Wie schnell (oder langsam) FluxCD reagiert.
- Welche Metriken ihr überwachen müsst, um Probleme zu erkennen.
- Welche Policies und Guards ein GitOps-Setup braucht, um Chaos standzuhalten.

Und ich will, dass ihr **selbst erlebt**, wie sich ein resilientes System anfühlt. Nicht durch Folien, sondern durch eure eigenen Handlungen.

### Was ich von euch wissen will

Jetzt seid ihr dran. Wenn ihr dabei seid (oder dabei sein wollt), beantwortet mir diese Fragen:

1. **Welche Angriffsvektoren wollt ihr auf jeden Fall sehen?**  
   Pod-Deletes? Config-Drift? Resource-Exhaustion? Network-Glitches?

2. **Welche Metrics interessieren euch?**  
   Mean Time to Recovery? Pod-Restart-Counts? API-Latency?

3. **Welche GitOps-Patterns sollen zwingend drin sein?**  
   Kustomize? Helm? Multi-Cluster? Progressive Delivery?

Schreibt mir eure Ideen – auf LinkedIn, per Mail, oder in den Kommentaren. Je mehr Input ich kriege, desto besser wird die Session.

### Der nächste Schritt: Die Jury entscheidet

Jetzt heißt es: Daumen drücken. Die CloudLand-Jury bewertet die Einreichungen. Wenn sie grünes Licht geben, seht ihr mich im Mai 2026 auf der Bühne.

Und wenn nicht? Dann baue ich das trotzdem. Und zeige es euch woanders. 😉

Aber ich hoffe natürlich, dass wir uns im Heidepark Soltau wiedersehen. Mit Smartphones, Tatendrang und der Frage: **"Kann dein Cluster halten, was du versprichst?"**

Bleibt gespannt. Ich poste Updates. Und vielleicht schon bald den ersten Einblick in den Chaos-Agent. 🔥

---

**PS:** Wenn ihr mich dabei unterstützen wollt, teilt diesen Post. Je mehr Leute von der Idee hören, desto wahrscheinlicher wird die Jury sagen: "Das will ich sehen." 🤞

*Hashtags:* #CloudLand2026 #Kubernetes #ChaosEngineering #GoLang #GitOps #CloudNative #Speaker #DevOps #K8s #FluxCD
-----

**Interessieren Sie sich für dieses Thema oder benötigen Sie Beratung?**  
Ich unterstütze Sie gerne bei Ihren Projekten. [Kontaktieren Sie mich für eine strategische Beratung.](mailto:admin@waldheim.dev)
