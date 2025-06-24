# Konzept: Automatischer Aufbau der `llms.txt` mit AstroJS Integrations-API

## Ziel
Automatisches Generieren der Datei `public/llms.txt` zur Bauzeit, basierend auf den Inhalten und der Struktur der Astro-Seiten. Die Datei soll das maximale Potential aus den Seiteninhalten herausholen, z.B. für LLM-Indexierung, SEO, oder KI-gestützte Features.

## Anforderungen
- **Automatisierung:** Die Datei `llms.txt` wird bei jedem Build automatisch erzeugt/aktualisiert.
- **Inhaltsanalyse:** Alle Seiten und ggf. Markdown/MDX-Inhalte werden analysiert.
- **Strukturabbildung:** Die Seitenstruktur (z.B. URLs, Titel, Metadaten) wird abgebildet.
- **Inhaltsauszug:** Relevante Textinhalte, Überschriften, ggf. Zusammenfassungen werden extrahiert.
- **Erweiterbarkeit:** Das Plugin ist konfigurierbar und kann um weitere Extraktionslogiken erweitert werden.

## Umsetzung mit AstroJS Integrations-API

### 1. Eigene Integration erstellen
- Ein neues Plugin/Integration im Projekt anlegen (z.B. `astro-llms-txt` im `src/integrations/`-Verzeichnis).
- Die [Astro Integrations-API](https://docs.astro.build/en/guides/integrations-guide/) nutzen, um sich in den Build-Prozess einzuklinken.

### 2. Hook: `astro:build:done`
- Im Integration-Plugin den Hook `astro:build:done` implementieren.
- Nach Abschluss des Builds werden alle generierten Seiten und deren Inhalte analysiert.

### 3. Seiten und Inhalte extrahieren
- Zugriff auf das `routes`-Verzeichnis und ggf. auf Content Collections.
- Für jede Seite:
  - URL, Titel, Metadaten extrahieren
  - Hauptinhalte (Text, Überschriften, ggf. Zusammenfassungen)
  - Optional: weitere Metadaten (z.B. Kategorien, Tags, Autor)

### 4. `llms.txt` generieren
- Die gesammelten Informationen in ein geeignetes Textformat bringen (z.B. pro Zeile: URL | Titel | Auszug).
- Die Datei im Verzeichnis `public/llms.txt` speichern.

### 5. Erweiterungsmöglichkeiten
- Konfiguration, welche Felder/Seiten einbezogen werden.
- Unterstützung für verschiedene Content-Typen (MDX, CMS, etc.).
- Optionale Filter (z.B. nur bestimmte Routen, nur veröffentlichte Seiten).
- Unterstützung für Mehrsprachigkeit.

## Beispielstruktur der `llms.txt`
```
/                | Home            | Willkommen auf waldheim.dev ...
/ueber-mich      | Über mich       | Ich bin Markus Waldheim ...
/blog/xyz        | Blogpost-Titel  | Zusammenfassung oder erster Absatz ...
...
```

## Vorteile
- Immer aktuelle, strukturierte Übersicht aller Seiteninhalte für LLMs und andere Tools.
- Keine manuelle Pflege der Datei mehr nötig.
- Flexibel und erweiterbar für zukünftige Anforderungen.

---
**Nächste Schritte:**
1. Integration-Skeleton anlegen
2. Hook implementieren
3. Extraktionslogik entwickeln
4. Testen und iterieren
