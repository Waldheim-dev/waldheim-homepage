---
title: "Redis als Rate Limiter: Schutz für Go-APIs vor Brute-Force-Angriffen"
description: "Eine praktische Anleitung, wie ich Redis nutze, um effektives Rate Limiting für Go-basierte APIs zu implementieren und diese vor Missbrauch zu schützen."
pubDate: "2025-09-28"
heroImage: "/blogs/redis-als-rate-limiter-schutz-fuer-go-apis-vor-brute-force-angriffen.png"
author: 'markus-waldheim'
keywords: Rate Limiting, Redis, Go, API-Sicherheit, DevSecOps, Brute-Force, Performance
---

## Redis als Rate Limiter: Der Türsteher für Ihre Go-API

Jede öffentlich zugängliche API ist ein potenzielles Ziel für Missbrauch. Ob es sich um automatisierte Skripte handelt, die versuchen, Benutzerkonten durch Brute-Force-Angriffe zu knacken, oder um einen außer Kontrolle geratenen Client, der Ihre Server mit Anfragen überflutet – ohne einen Schutzmechanismus ist Ihre API verwundbar. Einer der grundlegendsten und effektivsten Schutzmechanismen ist das **Rate Limiting**. Es funktioniert wie ein strenger Türsteher: Es limitiert die Anzahl der Anfragen, die ein einzelner Client in einem bestimmten Zeitraum stellen darf.

Als Go-Entwickler, der performante und robuste APIs baut, ist die Implementierung von Rate Limiting für mich ein nicht verhandelbarer Standard. Und mein Werkzeug der Wahl für diese Aufgabe ist fast immer **Redis**. In diesem Beitrag zeige ich Ihnen eine praktische Anleitung, wie ich die Geschwindigkeit und die atomaren Operationen von Redis nutze, um ein effizientes und skalierbares Rate Limiting für Go-basierte APIs zu implementieren.

### Warum Redis die perfekte Wahl ist

Redis ist eine In-Memory-Datenbank, die für ihre extrem hohe Geschwindigkeit bekannt ist. Für Rate Limiting bietet sie entscheidende Vorteile:

* **Geschwindigkeit:** Das Zählen von Anfragen muss blitzschnell gehen, um die API nicht auszubremsen. In-Memory-Operationen in Redis dauern oft nur Millisekunden.
* **Atomare Operationen:** Redis-Befehle wie `INCR` (erhöhe einen Zähler) sind atomar. Das bedeutet, sie werden als eine einzige, unteilbare Operation ausgeführt. Dies ist entscheidend, um Race Conditions zu vermeiden, wenn viele Anfragen gleichzeitig eintreffen.
* **Zeitgesteuerter Verfall (TTL):** Redis kann für jeden Schlüssel eine "Time to Live" (TTL) festlegen. Ein Zähler für einen Benutzer kann also automatisch nach einer Minute oder einer Stunde verfallen, was perfekt für Rate-Limiting-Fenster ist.
* **Zentraler Zustand:** In einer verteilten Architektur mit mehreren Instanzen Ihrer Go-API benötigen Sie einen zentralen Ort, um die Zähler zu speichern. Redis ist dieser zentrale, von allen Instanzen geteilte Zustandsspeicher.

### Meine Implementierung: Der "Fixed Window"-Algorithmus

Der einfachste und oft ausreichendste Algorithmus ist der "Fixed Window Counter". Das Prinzip:

1.  Wir definieren ein Zeitfenster (z.B. 60 Sekunden) und eine maximale Anzahl von Anfragen (z.B. 100).
2.  Für jeden Client (identifiziert durch IP-Adresse oder API-Key) erstellen wir einen eindeutigen Schlüssel in Redis.
3.  Bei jeder Anfrage erhöhen wir den Zähler für diesen Schlüssel.
4.  Wenn der Zähler das erste Mal in einem Fenster gesetzt wird, setzen wir auch eine TTL für den Schlüssel (z.B. 60 Sekunden).
5.  Wenn eine Anfrage eintrifft und der Zähler bereits das Limit erreicht hat, blockieren wir die Anfrage mit einem HTTP-Status `429 Too Many Requests`.

#### Der Go-Code: Eine Middleware-Implementierung

Ich implementiere Rate Limiting typischerweise als Middleware in meinem Go-HTTP-Router (z.B. `net/http` oder ein Framework wie Gin).

**Konzeptioneller Go-Code:**
```go
package main

import (
	"context"
	"fmt"
	"net/http"
	"time"

	"[github.com/redis/go-redis/v9](https://github.com/redis/go-redis/v9)"
)

// RateLimiterMiddleware erstellt eine Middleware-Funktion für das Rate Limiting.
func RateLimiterMiddleware(redisClient *redis.Client, limit int, window time.Duration) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			ctx := context.Background()

			// Client durch IP-Adresse identifizieren. In einer echten App
			// wäre hier vielleicht ein API-Key oder eine User-ID aus einem JWT.
			ip := r.RemoteAddr
			key := fmt.Sprintf("rate-limit:%s", ip)

			// Führe INCR in einer Pipeline aus, um die RTTs zu reduzieren.
			pipe := redisClient.Pipeline()
			count := pipe.Incr(ctx, key)
			pipe.Expire(ctx, key, window) // Setze die TTL bei jeder Anfrage neu
			_, err := pipe.Exec(ctx)
			
			if err != nil {
				// Wenn Redis nicht erreichbar ist, Anfrage vorsichtshalber durchlassen oder blockieren?
				// Hier entscheiden wir uns für's Durchlassen.
				http.Error(w, "Internal Server Error", http.StatusInternalServerError)
				return
			}
			
			// Überprüfe, ob das Limit überschritten ist.
			if count.Val() > int64(limit) {
				http.Error(w, "Too Many Requests", http.StatusTooManyRequests)
				return
			}
			
			// Wenn das Limit nicht überschritten ist, fahre mit der nächsten Handler-Funktion fort.
			next.ServeHTTP(w, r)
		})
	}
}

func main() {
	rdb := redis.NewClient(&redis.Options{
		Addr: "localhost:6379",
	})

	mux := http.NewServeMux()
	finalHandler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Hello, World!"))
	})

	// Erstelle die Middleware: 10 Anfragen pro 60 Sekunden
	rateLimitedHandler := RateLimiterMiddleware(rdb, 10, 60*time.Second)(finalHandler)
	mux.Handle("/", rateLimitedHandler)
	
	fmt.Println("Server startet auf :8080")
	http.ListenAndServe(":8080", mux)
}
```

### Fortgeschrittene Techniken

Der "Fixed Window"-Algorithmus hat eine Schwäche: Ein Client kann kurz vor Ende eines Fensters das Limit ausnutzen und sofort danach im neuen Fenster wieder, was zu einer kurzzeitigen Verdopplung der Rate führt. Für kritischere Anwendungen nutze ich daher fortgeschrittenere Algorithmen:

* **Sliding Window Log:** Hält einen Zeitstempel für jede Anfrage in einer Redis-Liste. Sehr präzise, aber speicherintensiver.
* **Sliding Window Counter:** Ein Kompromiss, der die Zähler aus dem vorherigen und aktuellen Fenster kombiniert, um eine geglättete Rate zu berechnen.
* **Token Bucket / Leaky Bucket:** Diese Algorithmen erlauben "Bursts" von Anfragen und füllen das Kontingent über Zeit wieder auf.

Diese können oft mithilfe von Lua-Skripten, die direkt in Redis ausgeführt werden, effizient implementiert werden.

## Fazit: Ein einfacher, aber mächtiger Schutz

Rate Limiting ist eine fundamentale Sicherheitsebene für jede moderne API. Es schützt nicht nur vor bösartigen Angriffen, sondern gewährleistet auch die Stabilität und Fairness Ihrer Dienste, indem es verhindert, dass einzelne Clients die Ressourcen für alle anderen monopolisieren. Die Kombination aus Go's Effizienz und Redis' Geschwindigkeit ermöglicht die Implementierung einer hochperformanten, skalierbaren und robusten Rate-Limiting-Lösung, die Ihre APIs wirksam abschirmt.

-----

**Ist Ihre API anfällig für Brute-Force-Angriffe oder Überlastung durch einzelne Clients?**
Ich helfe Ihnen bei der Konzeption und Implementierung einer maßgeschneiderten Rate-Limiting-Strategie für Ihre Go-basierten APIs. Lassen Sie uns gemeinsam einen robusten Schutzwall für Ihre Dienste errichten. [Kontaktieren Sie mich für ein API-Sicherheits-Review.](/kontakt/)
