---
title: "Event-Driven-Architekturen mit Go und Redis Pub/Sub: Ein praktisches Beispiel."
description: "Ich baue ein einfaches, aber robustes Event-System mit Go und Redis, um Microservices entkoppelt und skalierbar miteinander kommunizieren zu lassen."
pubDate: "2025-12-09"
heroImage: "/images/blog/event-driven-architekturen-mit-go-und-redis-pubsub-ein-praktisches-beispiel.webp"
imagePrompt: "Professional high-tech 3D render or minimalist illustration for a blog post titled 'Event-Driven-Architekturen mit Go und Redis Pub/Sub: Ein praktisches Beispiel.'. Theme: Ich baue ein einfaches, aber robustes Event-System mit Go und Redis, um Microservices entkoppelt und skalierbar miteinander kommunizieren zu lassen.. Style: Modern enterprise glass aesthetic, dark mode, accent colors (cyan, amber, or violet), high resolution, 16:9 aspect ratio."
author: "markus-waldheim"
keywords: "Event-Driven-Architekturen, mit, Go, und, Redis, Pub/Sub:, Ein, praktisches, Beispiel."
linkedinPost: "🚀 Neuer Blogbeitrag online: Event-Driven-Architekturen mit Go und Redis Pub/Sub: Ein praktisches Beispiel."
---

## Entkoppelte Systeme: Reaktive Architektur mit Go und Redis

In einer klassischen Microservice-Architektur kommunizieren Dienste oft synchron über HTTP/REST. Das ist einfach, führt aber zu einer engen Kopplung: Wenn Service B langsam ist oder ausfällt, leidet auch Service A. Eine **Event-driven Architecture (EDA)** löst dieses Problem, indem sie Dienste über asynchrone Ereignisse entkoppelt. In diesem Beitrag zeige ich Ihnen ein praktisches Beispiel, wie ich Go und Redis Pub/Sub nutze, um ein hochskalierbares und reaktives System zu bauen.

### 1. Das Szenario: Benachrichtigungssystem

Stellen Sie sich vor, ein Nutzer schließt eine Bestellung ab. Anstatt dass der `OrderService` nun synchron den `EmailService`, den `InvoicingService` und den `ShippingService` aufruft, sendet er nur ein Event: `OrderPlaced`.

### 2. Warum Redis Pub/Sub für den Einstieg?

Redis ist oft bereits als Cache im Stack vorhanden. Sein Pub/Sub (Publish/Subscribe) Mechanismus ist extrem leichtgewichtig und schnell.

*   **Vorteil:** Keine komplexe Infrastruktur wie Kafka oder RabbitMQ nötig.
*   **Echtzeit:** Die Zustellung erfolgt nahezu ohne Verzögerung.
*   **Einfachheit:** In Go lässt sich Redis Pub/Sub mit wenigen Zeilen Code integrieren (z.B. via `go-redis`).

### 3. Implementierung in Go: Der Publisher

Der `OrderService` agiert als Publisher. Nach dem Speichern der Bestellung in PostgreSQL wird das Event an einen Redis-Channel gesendet.

```go
func publishOrderEvent(order Order) {
    payload, _ := json.Marshal(order)
    rdb.Publish(ctx, "orders:placed", payload)
}
```

### 4. Implementierung in Go: Der Subscriber

Die anderen Services (z.B. `EmailService`) abonnieren den Channel. Da Go Goroutinen unterstützt, kann jeder Service hunderte Events parallel verarbeiten, ohne den Haupt-Thread zu blockieren.

```go
func subscribeToOrders() {
    pubsub := rdb.Subscribe(ctx, "orders:placed")
    ch := pubsub.Channel()

    for msg := range ch {
        var order Order
        json.Unmarshal([]byte(msg.Payload), &order)
        go sendWelcomeEmail(order) // Asynchrone Verarbeitung
    }
}
```

## Fazit: Agilität durch Entkopplung

Event-driven Architekturen mit Go und Redis erlauben es uns, Systeme zu bauen, die extrem belastbar und leicht erweiterbar sind. Neue Funktionen können einfach hinzugefügt werden, indem ein neuer Service einen bestehenden Event-Channel abonniert – ohne eine einzige Zeile Code im ursprünglichen Dienst ändern zu müssen. Dies steigert die Entwicklungsgeschwindigkeit und die Resilienz der gesamten Plattform.

-----

**Möchten Sie Ihre Microservice-Architektur auf asynchrone Kommunikation umstellen?**  
Ich unterstütze Sie beim Design und der Implementierung von Event-driven Systems und der Wahl des richtigen Message-Brokers. [Lassen Sie uns Ihre System-Architektur modernisieren.](mailto:admin@waldheim.dev)


-----

**Interessieren Sie sich für dieses Thema oder benötigen Sie Beratung?**  
Ich unterstütze Sie gerne bei Ihren Projekten. [Kontaktieren Sie mich für eine strategische Beratung.](mailto:admin@waldheim.dev)