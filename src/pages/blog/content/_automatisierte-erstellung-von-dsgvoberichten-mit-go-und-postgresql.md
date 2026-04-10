---
title: "Automatisierte Erstellung von DSGVO-Berichten mit Go und PostgreSQL."
description: "Ein Beitrag zum Thema: Automatisierte Erstellung von DSGVO-Berichten mit Go und PostgreSQL."
pubDate: "2025-10-29"
heroImage: "/images/blog/automatisierte-erstellung-von-dsgvoberichten-mit-go-und-postgresql.webp"
imagePrompt: "Professional high-tech 3D render or minimalist illustration for a blog post titled 'Automatisierte Erstellung von DSGVO-Berichten mit Go und PostgreSQL.'. Theme: Ein Beitrag zum Thema: Automatisierte Erstellung von DSGVO-Berichten mit Go und PostgreSQL.. Style: Modern enterprise glass aesthetic, dark mode, accent colors (cyan, amber, or violet), high resolution, 16:9 aspect ratio."
author: "markus-waldheim"
keywords: "Automatisierte,Erstellung,von,DSGVOBerichten,mit,Go,und,PostgreSQL"
linkedinPost: "🚀 Neuer Blogbeitrag online: Automatisierte Erstellung von DSGVO-Berichten mit Go und PostgreSQL.\n\nErfahren Sie mehr über meinen Ansatz zu diesem spannenden Thema.\n\n#Softwareentwicklung #DevSecOps #WaldheimDev"
---

## DSGVO-Berichte auf Knopfdruck: Automatisierung statt Excel-Chaos

Die Datenschutz-Grundverordnung (DSGVO) verlangt von Unternehmen eine detaillierte Dokumentation ihrer Datenverarbeitungsprozesse (Verarbeitungsverzeichnis nach Art. 30 DSGVO). In vielen IT-Abteilungen führt das zu mühsamer manueller Arbeit in Excel-Tabellen, die bereits veraltet sind, sobald sie gespeichert werden. Doch als Softwareentwickler haben wir eine bessere Lösung: Wir nutzen die Metadaten unserer Datenbanken und den Code unserer Anwendungen, um diese Berichte automatisiert zu generieren. In diesem Beitrag zeige ich Ihnen meinen Ansatz mit Go und PostgreSQL.

### 1. Datenherkunft: Das Information Schema nutzen

PostgreSQL speichert Informationen über Tabellen, Spalten und Datentypen in einem standardisierten Format, dem `information_schema`. Durch den Einsatz von Kommentaren (`COMMENT ON COLUMN ...`) können wir direkt in der Datenbank dokumentieren, ob ein Feld personenbezogene Daten (PII) enthält und welchem Zweck es dient.

*   **Vorteil:** Die Dokumentation liegt direkt beim Code und den Daten. Wenn ein Entwickler eine neue Spalte hinzufügt, muss er die Dokumentation sofort im SQL-Migrationsskript miterledigen.

### 2. Der Go-Reporter: Daten sammeln und aufbereiten

Ich habe einen kleinen Go-Service entwickelt, der über die Datenbank-Struktur läuft und diese Metadaten extrahiert.

*   **Extraction:** Go-Code fragt das `information_schema` und die `pg_description` ab.
*   **Enrichment:** Wir können diese Daten mit Informationen aus unserer Git-Historie (wer hat die Tabelle erstellt?) oder aus Konfigurationsdateien (welche Rechtsgrundlage gilt für diesen Dienst?) anreichern.

### 3. Output-Formate: PDF und Markdown

Ein technischer Bericht ist nur dann nützlich, wenn er auch von der Rechtsabteilung oder externen Auditoren gelesen werden kann.

*   **Markdown für Git:** Ich generiere Markdown-Dateien, die direkt im Repository abgelegt werden. So ist jede Änderung an der Datenverarbeitung in der Commit-Historie nachvollziehbar.
*   **PDF für das Management:** Mit Go-Libraries (wie `gofpdf`) erstelle ich professionell formatierte PDFs mit Firmen-Branding, die als offizielle Dokumente für Audits dienen können.

### 4. Integration in die CI/CD-Pipeline

Die wahre Stärke der Automatisierung zeigt sich in der Pipeline. Bei jedem Release einer neuen Software-Version wird der DSGVO-Bericht automatisch aktualisiert.

*   **Validierung:** Wenn eine neue Tabelle ohne Kommentare/Dokumentation hinzugefügt wird, schlägt der Build fehl. So erzwingen wir eine lückenlose Dokumentation ("Compliance as Code").

## Fazit: Compliance als Nebenprodukt der Entwicklung

Durch die Automatisierung der DSGVO-Berichterstattung verwandeln wir eine lästige Pflichtaufgabe in einen effizienten Prozess. Wir reduzieren menschliche Fehler, sparen Zeit und haben jederzeit einen aktuellen Überblick über unsere Datenlandschaft. Datenschutz wird so zu einem integralen Bestandteil des Software-Lifecycles, nicht zu einem Hindernis.

-----

**Quälen Sie sich noch mit manuellen DSGVO-Listen herum?**  
Ich unterstütze Sie dabei, Ihre Datenschutz-Dokumentation zu automatisieren und nahtlos in Ihre IT-Prozesse zu integrieren. [Kontaktieren Sie mich für eine Analyse Ihrer Datenprozesse.](mailto:admin@waldheim.dev)

-----

**Interessieren Sie sich für dieses Thema oder benötigen Sie Beratung?**  
Ich unterstütze Sie gerne bei Ihren Projekten. [Kontaktieren Sie mich für eine strategische Beratung.](mailto:admin@waldheim.dev)