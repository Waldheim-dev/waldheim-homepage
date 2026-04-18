---
title: "Das \"Need-to-know\"-Prinzip: Wie ich Datenzugriffsrechte in PostgreSQL auf Basis der DSGVO implementiere."
description: "Ein Beitrag zum Thema: Das \"Need-to-know\"-Prinzip: Wie ich Datenzugriffsrechte in PostgreSQL auf Basis der DSGVO implementiere."
pubDate: "2025-11-14"
heroImage: "/images/blog/das-needtoknowprinzip-wie-ich-datenzugriffsrechte-in-postgresql-auf-basis-der-dsgvo-implementiere.webp"
imagePrompt: "Professional high-tech 3D render or minimalist illustration for a blog post titled 'Das \"Need-to-know\"-Prinzip: Wie ich Datenzugriffsrechte in PostgreSQL auf Basis der DSGVO implementiere.'. Theme: Ein Beitrag zum Thema: Das \"Need-to-know\"-Prinzip: Wie ich Datenzugriffsrechte in PostgreSQL auf Basis der DSGVO implementiere.. Style: Modern enterprise glass aesthetic, dark mode, accent colors (cyan, amber, or violet), high resolution, 16:9 aspect ratio."
author: "markus-waldheim"
keywords: "Das,NeedtoknowPrinzip,Wie,ich,Datenzugriffsrechte,in,PostgreSQL,auf,Basis,der,DSGVO,implementiere"
linkedinPost: "🚀 Neuer Blogbeitrag online: Das Need-to-know-Prinzip: Wie ich Datenzugriffsrechte in PostgreSQL auf Basis der DSGVO implementiere.\n\nErfahren Sie mehr über meinen Ansatz zu diesem spannenden Thema.\n\n#Softwareentwicklung #DevSecOps #WaldheimDev"
---

## Need-to-know: Granulare Zugriffskontrolle in PostgreSQL

Die DSGVO fordert nicht nur, dass Daten geschützt werden, sondern auch, dass der Zugriff auf sie strikt auf das notwendige Maß begrenzt wird (Datenminimierung und Integrität/Vertraulichkeit). Ein Admin-Account, der alles darf, oder eine Anwendung, die mit Vollzugriff auf die Datenbank läuft, ist ein erhebliches Compliance-Risiko. In diesem Beitrag zeige ich Ihnen, wie ich das "Need-to-know"-Prinzip direkt auf Datenbankebene mit PostgreSQL umsetze.

### 1. Trennung von App-User und Migrations-User

Der erste Schritt ist die radikale Trennung der Rollen.

*   **Migrations-User (Owner):** Darf Schemata ändern, Tabellen anlegen und löschen. Dieser User wird nur von der CI/CD-Pipeline genutzt.
*   **App-User:** Darf nur Daten lesen und schreiben (`SELECT`, `INSERT`, `UPDATE`, `DELETE`), aber niemals die Struktur ändern. Dies verhindert, dass eine kompromittierte Anwendung das Datenmodell zerstört.

### 2. Row-Level Security (RLS): Datenzugriff auf Zeilenebene

Das ist das "Killer-Feature" von PostgreSQL für den Datenschutz. Mit RLS können wir definieren, dass ein Nutzer nur die Zeilen sieht, die ihm gehören.

*   **Beispiel:** Eine Mehrmandanten-Anwendung (Multi-Tenant).
*   **Umsetzung:** Wir fügen jeder Tabelle eine `tenant_id` hinzu und aktivieren RLS:
    ```sql
    ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
    CREATE POLICY order_isolation_policy ON orders
      USING (tenant_id = current_setting('app.current_tenant_id')::uuid);
    ```
*   **Vorteil:** Selbst wenn ein Programmierer ein `WHERE` vergisst, liefert die Datenbank niemals Daten eines anderen Mandanten aus.

### 3. Column-Level Security und Views

Nicht jeder Mitarbeiter im Support muss das Geburtsdatum oder die SV-Nummer sehen.

*   **Views:** Ich erstelle spezialisierte Views für verschiedene Rollen, die sensible Spalten ausblenden oder maskieren (`SUBSTRING(email, 1, 3) || '***'`).
*   **Privileges:** Der Zugriff wird nicht auf die Basistabelle, sondern nur auf die View gewährt.

### 4. Audit Logging: Wer hat wann was gesehen?

Das "Need-to-know"-Prinzip ist nur dann wirksam, wenn Verstöße oder Zugriffe nachvollziehbar sind.

*   **pgaudit:** Ich nutze die Erweiterung `pgaudit`, um detaillierte Logs über alle DML- und DDL-Operationen zu erstellen.
*   **Zentralisierung:** Die Logs werden an ein SIEM-System (z.B. ELK oder Splunk) weitergeleitet, um Anomalien (z.B. ein Export von 10.000 Datensätzen durch einen Standard-User) sofort zu erkennen.

## Fazit: Sicherheit ist keine App-Logik allein

Echte Datensicherheit beginnt in der Datenbank. Indem wir das "Need-to-know"-Prinzip durch Rollentrennung, RLS und granulare Berechtigungen direkt in PostgreSQL verankern, bauen wir eine "Defense in Depth". Selbst wenn eine Schwachstelle in der Anwendungsschicht ausgenutzt wird, bleibt der Schaden begrenzt, da die Datenbank als letzte Instanz den unberechtigten Zugriff blockiert.

-----

**Ist Ihre Datenbank-Berechtigungsstruktur DSGVO-konform?**  
Ich unterstütze Sie bei der Härtung Ihrer PostgreSQL-Instanzen und der Implementierung von Row-Level Security. [Kontaktieren Sie mich für ein Sicherheits-Audit Ihrer Datenbank.](mailto:kontakt@waldheim.dev)
