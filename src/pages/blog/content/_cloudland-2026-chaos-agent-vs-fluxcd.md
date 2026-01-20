---
title: "Kann FluxCD schneller heilen, als mein Go-Agent zerstört? ⚔️"
description: "Der Bau eines Chaos-Agents in Go: Wie ich absichtlich Pods lösche, Configs driften lasse und FluxCD an seine Grenzen bringe. Ein technisches Deep-Dive."
pubDate: "2025-12-08"
heroImage: "/blogs/cloudland_2026_go_want_destroy.png"
author: 'markus-waldheim'
keywords: Go, Golang, Chaos Engineering, FluxCD, GitOps, Kubernetes, K8s, DevOps, Resilience, Ops Tooling, client-go, controller-runtime, Pod Delete, Config Drift, Cloud Native, CloudLand, 2026
---

## Warum schreibe ich Code, der meine eigenen Pods löscht? 🧐

Normalerweise werde ich dafür bezahlt, Systeme **am Laufen zu halten**. Uptime ist heilig. Outages sind der Feind. Und dann sitze ich hier, zwei Wochen nach meiner CloudLand-Einreichung, und schreibe einen **Chaos-Agent** in Go.

Seine einzige Aufgabe? Meine Infrastruktur zu sabotieren.

Klingt verrückt? Vielleicht. Aber es gibt eine Methode in diesem Wahnsinn.

### Das Ziel: Ein Backend, das schneller zerstört, als FluxCD heilen kann

FluxCD ist ein fantastisches Tool. Es sorgt dafür, dass euer Kubernetes-Cluster immer im gewünschten Zustand ist (declarative, Git-basierte Wahrheit). Aber wie schnell kann es **reagieren**, wenn jemand (oder etwas) absichtlich Chaos stiftet?

Das will ich herausfinden.

Mein Chaos-Agent soll:

- **Pods löschen** (klassischer Chaos Monkey)
- **Configs driften lassen** (ConfigMaps/Secrets manipulieren)
- **Ressourcen limitieren** (CPU/Memory-Pressure simulieren)
- **Netzwerk-Glitches** erzeugen (Latency, Packet Loss)

Und FluxCD soll versuchen, das alles zu fixen. In Echtzeit. Während ihr auf der CloudLand zuschaut.

Es ist ein Duell. Agent vs. GitOps. Chaos vs. Ordnung.

### Warum Go für Ops-Tooling?

Bevor ich ins Detail gehe: Warum Go und nicht Bash, Python oder irgendeine andere Sprache?

**Bash** ist großartig für kleine Scripts. Aber sobald es komplexer wird (z.B. parallele API-Calls, strukturierte Fehlerbehandlung), wird Bash zur Hölle.

**Python** ist flexibel und hat eine riesige Ecosystem. Aber für Cloud-Native-Tooling fehlt mir oft die Performance und die Typsicherheit. Und die Dependency-Hell bei großen Projekten nervt.

**Go** hingegen ist perfekt für Ops-Tooling:

- **Statisch kompiliert**: Ein Binary, keine Runtime-Dependencies.
- **Schnell**: Native Performance, geringe Latenz.
- **Concurrency**: Goroutines machen parallele API-Calls trivial.
- **Kubernetes-Native**: Die offiziellen Kubernetes-Clients (`client-go`, `controller-runtime`) sind in Go geschrieben.

Für mich war die Wahl klar: **Go ist der neue Bash für Cloud-Native-Tooling.**

### Die Anatomie des Chaos-Agents

Mein Chaos-Agent besteht aus mehreren Modulen. Hier ein Überblick:

#### 1. Pod Destroyer

Der Klassiker. Der Agent listet alle Pods in einem Namespace auf und löscht zufällige Pods.

```go
func (a *Agent) DeleteRandomPod(namespace string) error {
    pods, err := a.clientset.CoreV1().Pods(namespace).List(context.TODO(), metav1.ListOptions{})
    if err != nil {
        return err
    }
    
    if len(pods.Items) == 0 {
        return fmt.Errorf("no pods found in namespace %s", namespace)
    }
    
    // Pick a random pod
    pod := pods.Items[rand.Intn(len(pods.Items))]
    
    // Delete it
    err = a.clientset.CoreV1().Pods(namespace).Delete(context.TODO(), pod.Name, metav1.DeleteOptions{})
    if err != nil {
        return err
    }
    
    log.Printf("Deleted pod %s in namespace %s", pod.Name, namespace)
    return nil
}
```

**Challenge für FluxCD**: Wie schnell erkennt Flux, dass der Pod fehlt? Wie lange dauert es, bis ein neuer Pod hochkommt?

#### 2. Config Drifter

Hier wird es interessanter. Ich manipuliere ConfigMaps oder Secrets – aber **nicht** via Git. Das heißt: Der tatsächliche Zustand im Cluster weicht von der Git-Wahrheit ab.

```go
func (a *Agent) DriftConfigMap(namespace, name, key, newValue string) error {
    cm, err := a.clientset.CoreV1().ConfigMaps(namespace).Get(context.TODO(), name, metav1.GetOptions{})
    if err != nil {
        return err
    }
    
    // Backup original value
    originalValue := cm.Data[key]
    log.Printf("Original value: %s", originalValue)
    
    // Inject drift
    cm.Data[key] = newValue
    _, err = a.clientset.CoreV1().ConfigMaps(namespace).Update(context.TODO(), cm, metav1.UpdateOptions{})
    if err != nil {
        return err
    }
    
    log.Printf("Drifted ConfigMap %s/%s: %s -> %s", namespace, name, originalValue, newValue)
    return nil
}
```

**Challenge für FluxCD**: Erkennt Flux den Drift? Wie lange dauert die Reconciliation? Was passiert mit Pods, die bereits die falsche Config gelesen haben?

#### 3. Resource Limiter

Hier simuliere ich Resource-Pressure. Ich setze die CPU- oder Memory-Limits eines Deployments auf absurd niedrige Werte.

```go
func (a *Agent) LimitDeploymentResources(namespace, name string) error {
    deploy, err := a.clientset.AppsV1().Deployments(namespace).Get(context.TODO(), name, metav1.GetOptions{})
    if err != nil {
        return err
    }
    
    // Set absurdly low limits
    for i := range deploy.Spec.Template.Spec.Containers {
        deploy.Spec.Template.Spec.Containers[i].Resources = corev1.ResourceRequirements{
            Limits: corev1.ResourceList{
                corev1.ResourceCPU:    resource.MustParse("10m"),
                corev1.ResourceMemory: resource.MustParse("10Mi"),
            },
        }
    }
    
    _, err = a.clientset.AppsV1().Deployments(namespace).Update(context.TODO(), deploy, metav1.UpdateOptions{})
    if err != nil {
        return err
    }
    
    log.Printf("Limited resources for deployment %s/%s", namespace, name)
    return nil
}
```

**Challenge für FluxCD**: Wie schnell werden die Pods wegen OOMKilled neu gestartet? Wie lange, bis Flux die richtigen Limits wiederherstellt?

#### 4. Network Chaos (geplant)

Hier will ich mit Tools wie **Pumba** oder **Chaos Mesh** integrieren. Ziel: Latency und Packet Loss zwischen Pods simulieren.

Das ist noch nicht fertig, aber die Idee ist: Der Chaos-Agent triggert Network-Policies oder sidecar-basierte Fault-Injection.

### Die Metriken: Wie messen wir "Resilience"?

Ein Duell braucht einen Scoreboard. Hier sind die Metriken, die ich live auf der CloudLand zeigen will:

#### 1. Mean Time to Recovery (MTTR)

Von "Agent löscht Pod" bis "Neuer Pod ist ready". Idealerweise < 30 Sekunden.

#### 2. Drift Frequency

Wie oft weicht der Cluster-State von Git ab? Wie lange bleiben diese Drifts bestehen?

#### 3. Self-Healing Success Rate

Wie viele Angriffe schafft FluxCD zu fixen, ohne manuellen Eingriff?

#### 4. API Latency

Bleibt die API unter Last responsiv? Oder wird sie zum Flaschenhals?

#### 5. Pod Restart Count

Wie oft müssen Pods neu gestartet werden? (Restart-Loops sind ein Alarmsignal.)

### Die technischen Herausforderungen

Das Ganze ist nicht trivial. Hier sind die größten Hürden:

**1. RBAC richtig konfigurieren**  
Der Chaos-Agent braucht Rechte, um Pods zu löschen und Configs zu ändern. Aber nicht zu viele. Sonst kann er wirklich **alles** kaputtmachen.

**2. Rate Limiting**  
Wenn 100 Leute gleichzeitig auf "Delete Pod" drücken, muss ich sicherstellen, dass nicht alle Pods auf einmal verschwinden.

**3. Observability**  
Prometheus, Grafana und Loki müssen die richtigen Metriken tracken. Ohne Observability sieht niemand, was passiert.

**4. FluxCD-Tuning**  
Die Standard-Reconciliation-Interval von FluxCD ist 5 Minuten. Viel zu langsam für Live-Demos. Ich muss das auf Sekunden runterdrehen – ohne das Cluster zu überlasten.

### Lessons Learned (so far)

Ich bin noch mittendrin. Aber ein paar Dinge habe ich schon gelernt:

**1. GitOps ist nicht genug**  
FluxCD kann nur heilen, was in Git definiert ist. Wenn ein Pod crasht wegen eines Runtime-Fehlers (z.B. OOMKilled), hilft GitOps nicht.

**2. PodDisruptionBudgets (PDB) sind unterschätzt**  
Ein PDB kann verhindern, dass zu viele Pods gleichzeitig verschwinden. Ohne PDB kann der Chaos-Agent das gesamte Deployment killen.

**3. Readiness Probes sind kritisch**  
Wenn Pods zu früh als "ready" markiert werden, schickt der Load Balancer Traffic an kaputte Pods. Das führt zu 500ern.

**4. Monitoring ist keine Nebensache**  
Ohne gute Dashboards sieht niemand, was passiert. Und das Publikum schläft ein.

### Was ich von euch wissen will

Ihr seid die Angreifer. Ihr sagt, was passieren soll. Deshalb:

**1. Welche Angriffe wollt ihr sehen?**  
Pod-Deletes? Config-Drift? Resource-Exhaustion? Network-Glitches?

**2. Welche GitOps-Policies sollen im Duell dabei sein?**  
Kustomize-Overlays? Helm-Charts? Multi-Cluster-Sync?

**3. Welche Metriken interessieren euch?**  
MTTR? Error Rates? Pod Churn?

Schreibt mir eure Wünsche. Ich baue sie ein.

### Der aktuelle Status: Es ist ein enges Rennen

Spoiler: Es ist ein **enges Rennen**.

Mit dem Standard-Setup (5-Minuten-Reconciliation) gewinnt der Chaos-Agent locker. FluxCD ist zu langsam.

Aber mit getunten Intervallen (10 Sekunden), PodDisruptionBudgets und guten Readiness Probes? Da wird's spannend.

FluxCD hat eine Chance. Aber nur eine.

### Der nächste Schritt: Visualization

Im nächsten Blogpost zeige ich euch, wie ich das Ganze **visualisiere**. Spoiler: Es sieht aus wie "Schiffe versenken". Aber mit Pods statt Schiffen. Und API-Calls statt Stecknadeln.

Bleibt dran. Es wird wild. 🔥

---

**PS:** Wer von euch nutzt Go für Ops-Tooling? Was sind eure Lieblings-Libraries? Ich bin immer auf der Suche nach neuen Tools.

*Hashtags:* #Go #Golang #ChaosEngineering #FluxCD #GitOps #Kubernetes #DevOps #CloudNative #CloudLand2026 #OpsTooling #K8s
