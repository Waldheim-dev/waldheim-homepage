---
title: "Continuous Integration für Datenbanken: Mein Ansatz mit Git und Flyway/Liquibase."
description: "Ein Beitrag zum Thema: Continuous Integration für Datenbanken: Mein Ansatz mit Git und Flyway/Liquibase."
pubDate: "2025-11-06"
heroImage: "/images/blog/continuous-integration-für-datenbanken-mein-ansatz-mit-git-und-flywayliquibase.webp"
imagePrompt: "Professional high-tech 3D render or minimalist illustration for a blog post titled 'Continuous Integration für Datenbanken: Mein Ansatz mit Git und Flyway/Liquibase.'. Theme: Ein Beitrag zum Thema: Continuous Integration für Datenbanken: Mein Ansatz mit Git und Flyway/Liquibase.. Style: Modern enterprise glass aesthetic, dark mode, accent colors (cyan, amber, or violet), high resolution, 16:9 aspect ratio."
author: "markus-waldheim"
keywords: "Continuous,Integration,für,Datenbanken,Mein,Ansatz,mit,Git,und,FlywayLiquibase"
linkedinPost: "🚀 Neuer Blogbeitrag online: Continuous Integration für Datenbanken: Mein Ansatz mit Git und Flyway/Liquibase.\n\nErfahren Sie mehr über meinen Ansatz zu diesem spannenden Thema.\n\n#Softwareentwicklung #DevSecOps #WaldheimDev"
---

## Datenbank-Migrationen: Keine Angst vor dem nächsten Schema-Update

In vielen Projekten ist die Datenbank immer noch ein "Sorgenkind" der Automatisierung. Während der Anwendungs-Code versioniert und automatisiert getestet wird, erfolgen Datenbank-Änderungen oft noch manuell durch SQL-Skripte, die direkt auf der Produktion ausgeführt werden. Das ist hochgefährlich und fehleranfällig. In diesem Beitrag zeige ich Ihnen meinen Ansatz für Continuous Integration bei Datenbanken, basierend auf Git und Tools wie Flyway oder Liquibase.

### 1. Das Prinzip: Evolutionäre Datenbank-Entwicklung

Anstatt den "Zielzustand" der Datenbank zu definieren, versionieren wir die Änderungen (Migrationen).

*   **Versionierte Skripte:** Jede Schema-Änderung (Tabellen erstellen, Spalten hinzufügen) wird als eigenes SQL-Skript im Git-Repository abgelegt.
*   **Namensschema:** Dateien werden z.B. als `V1__init_schema.sql`, `V2__add_user_email.sql` benannt. Dies stellt eine eindeutige Reihenfolge sicher.

### 2. Flyway und Liquibase: Die Orchestrierer

Diese Tools sorgen dafür, dass die Skripte in der richtigen Reihenfolge und – ganz wichtig – auf jedem System nur genau einmal ausgeführt werden.

*   **Metadata-Tabelle:** Flyway erstellt automatisch eine Tabelle (z.B. `flyway_schema_history`), in der vermerkt wird, welche Migrationen bereits erfolgreich angewendet wurden.
*   **Vorteil:** Ein neuer Entwickler muss nur die App starten oder einen Befehl ausführen, und seine lokale Datenbank wird automatisch auf den aktuellen Stand gebracht.

### 3. Integration in die CI/CD-Pipeline

Die Datenbank-Migration ist ein integraler Bestandteil des Deployment-Prozesses.

*   **Test-Phase:** In der CI-Pipeline wird eine temporäre Datenbank-Instanz (z.B. in Docker) gestartet. Alle Migrationen werden darauf angewendet. Schlägt ein Skript fehl, wird der Build sofort gestoppt.
*   **Rollback-Strategie:** Bei Liquibase nutze ich oft YAML- oder XML-Formate, die explizite Rollback-Befehle ermöglichen. So können wir im Notfall schnell auf den vorherigen Stand zurückkehren.

### 4. Zero-Downtime-Migrationen

In hochverfügbaren Umgebungen dürfen Schema-Änderungen die Anwendung nicht blockieren.

*   **Zweistufiges Vorgehen:** 
    1.  Neue Spalte hinzufügen (Anwendung nutzt sie noch nicht).
    2.  Anwendung aktualisieren (nutzt jetzt die neue Spalte).
    3.  Alte Spalte entfernen (in einem späteren Release).
*   **Vermeidung von Locks:** Ich achte darauf, keine Operationen auszuführen, die große Tabellen für längere Zeit sperren (z.B. `ALTER TABLE` ohne `CONCURRENTLY` bei Indizes).

## Fazit: Die Datenbank als Teil des Codes

Datenbank-Automatisierung ist der nächste logische Schritt in der DevOps-Evolution. Indem wir Schema-Änderungen wie Code behandeln – versioniert, getestet und automatisiert ausgerollt – eliminieren wir eine der größten Quellen für Deployment-Fehler. Tools wie Flyway und Liquibase geben uns die nötige Sicherheit und Kontrolle.

-----

**Haben Sie Respekt vor Datenbank-Updates in Produktion oder suchen nach einer besseren Migrations-Strategie?**  
Ich helfe Ihnen bei der Einführung von automatisierten Datenbank-Workflows und der Absicherung Ihrer Schema-Migrationen. [Lassen Sie uns Ihre Datenbank-Pipeline planen.](mailto:admin@waldheim.dev)
