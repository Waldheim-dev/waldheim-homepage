---
title: "Testgetriebene Entwicklung (TDD) mit Go: Eine pragmatische Einführung."
description: "In diesem Beitrag demonstriere ich meinen pragmatischen TDD-Workflow für Go, der die Code-Stabilität erhöht, ohne die Entwicklungsgeschwindigkeit auszubremsen."
pubDate: "2025-12-03"
heroImage: "/images/blog/testgetriebene-entwicklung-tdd-mit-go-eine-pragmatische-einführung.webp"
imagePrompt: "Professional high-tech 3D render or minimalist illustration for a blog post titled 'Testgetriebene Entwicklung (TDD) mit Go: Eine pragmatische Einführung.'. Theme: In diesem Beitrag demonstriere ich meinen pragmatischen TDD-Workflow für Go, der die Code-Stabilität erhöht, ohne die Entwicklungsgeschwindigkeit auszubremsen.. Style: Modern enterprise glass aesthetic, dark mode, accent colors (cyan, amber, or violet), high resolution, 16:9 aspect ratio."
author: "markus-waldheim"
keywords: "Testgetriebene, Entwicklung, (TDD), mit, Go:, Eine, pragmatische, Einführung."
linkedinPost: "🚀 Neuer Blogbeitrag online: Testgetriebene Entwicklung (TDD) mit Go: Eine pragmatische Einführung."
---

## Testgetriebene Entwicklung (TDD) mit Go: Eine pragmatische Einführung.

## Test-Driven Development (TDD) mit Go: Pragmatischer Ansatz

TDD ist nicht "Write Tests First, Code Second" als Religion. Es ist eine Entwicklungsmethode, die eine klare Spezifikation durch Tests führt.

Ich zeige, wie ich TDD in Go praktiziere, ohne religiös zu sein.

### Das Red-Green-Refactor Cycle

**Schritt 1: Red - Schreib einen fallenenden Test**

```go
func TestCalculateDiscount(t *testing.T) {
  result := CalculateDiscount(100, 0.1)  // Funktion existiert noch nicht!
  expected := 90.0
  if result != expected {
    t.Errorf("expected %f, got %f", expected, result)
  }
}
```

Test schlägt fehl: `undefined: CalculateDiscount`

**Schritt 2: Green - Schreib minimalen Code, um Test zu bestehen**

```go
func CalculateDiscount(price, discount float64) float64 {
  return price * (1 - discount)
}
```

Test läuft grün!

**Schritt 3: Refactor - Verbessere den Code**

```go
func CalculateDiscount(price, discount float64) float64 {
  if discount < 0 || discount > 1 {
    return price  // Edge case handling
  }
  return price * (1 - discount)
}
```

Test läuft immer noch grün?

### Best Practices

- Tests schreiben für kritische Logik, nicht für jeden einzelnen Line
- Mock externe Dependencies
- Table-Driven Tests für viele Szenarien nutzen

-----

**Interessieren Sie sich für dieses Thema oder benötigen Sie Beratung?**  
Ich unterstütze Sie gerne bei Ihren Projekten. [Kontaktieren Sie mich für eine strategische Beratung.](mailto:kontakt@waldheim.dev)