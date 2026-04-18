---
title: "Compliance-Monitoring in der CI/CD-Pipeline: Mein Ansatz mit Git und Go"
description: "Ich demonstriere, wie ich automatisierte Compliance-Prüfungen (z. B. Lizenz-Scanning) direkt in die Git-basierte CI/CD-Pipeline für Go-Projekte integriere."
pubDate: "2025-09-29"
heroImage: "/blogs/compliance-monitoring-in-der-cicd-pipeline.png"
author: 'markus-waldheim'
keywords: Compliance, CI/CD, DevSecOps, Go, Git, Lizenzmanagement, Policy as Code
---

## Compliance-Monitoring in der CI/CD-Pipeline: Ihr automatisierter Regelwächter

Compliance ist für viele Entwicklungsteams ein trockenes, oft gefürchtetes Thema. Es geht um die Einhaltung von internen Richtlinien, gesetzlichen Vorgaben (wie DSGVO) oder Lizenzbestimmungen für Open-Source-Software. Traditionell wurde Compliance oft am Ende eines Release-Zyklus durch manuelle Audits geprüft – ein langsamer, fehleranfälliger Prozess, der im Widerspruch zur agilen Welt von Continuous Integration und Continuous Deployment (CI/CD) steht. Wenn ein Compliance-Verstoß erst kurz vor dem Go-Live entdeckt wird, führt das zu teuren Verzögerungen und Frustration.

Als DevSecOps-Stratege verfolge ich einen modernen Ansatz: **Compliance as Code**. Ich integriere die Überprüfung von Compliance-Regeln direkt und automatisiert in die CI/CD-Pipeline. Jeder Commit und jeder Build wird automatisch gegen unsere Richtlinien geprüft. In diesem Beitrag demonstriere ich, wie ich mit Git und Go automatisierte Compliance-Prüfungen direkt in die Pipeline integriere und so Compliance von einer manuellen Last zu einem automatisierten, proaktiven Prozess mache.

### Warum Compliance in die Pipeline gehört

* **Frühes Feedback:** Entwickler erfahren sofort, ob ihre Änderungen gegen eine Richtlinie verstoßen, nicht erst Wochen später.
* **Konsistenz:** Die Regeln werden automatisch und bei jedem einzelnen Build durchgesetzt, ohne Ausnahme.
* **Revisionssicherheit:** Die Ergebnisse der Compliance-Checks werden protokolliert und sind Teil des Build-Logs, was Audits massiv erleichtert.
* **"Shift Left" für Compliance:** Genau wie bei der Sicherheit verlagern wir die Prüfung so weit wie möglich nach links im Entwicklungsprozess.

### Mein Ansatz: Spezifische Checks für spezifische Risiken

Ich integriere verschiedene Arten von automatisierten Checks als dedizierte Stages in meiner CI/CD-Pipeline (z.B. mit GitHub Actions oder GitLab CI).

#### 1. Lizenz-Compliance-Scanning

Die Verwendung von Open-Source-Software ist Standard, aber jede Bibliothek kommt mit einer Lizenz. Die Verwendung einer Bibliothek mit einer "restriktiven" Lizenz (wie der GPL) in einem kommerziellen, proprietären Produkt kann schwerwiegende rechtliche Konsequenzen haben.

* **Das Risiko:** Unbeabsichtigte Verletzung von Lizenzbedingungen.
* **Meine Lösung:** Ich integriere ein Tool zum Lizenz-Scanning. Für Go-Projekte nutze ich oft `golicense`.
    * Ich erstelle eine Konfigurationsdatei, die eine Whitelist der erlaubten Lizenzen (z.B. MIT, Apache 2.0, BSD) und eine Blacklist der verbotenen Lizenzen (z.B. GPL, AGPL) enthält.
    * In der CI-Pipeline wird `golicense` nach dem `go mod download` ausgeführt. Das Tool prüft die Lizenzen aller Abhängigkeiten. Findet es eine nicht erlaubte Lizenz, schlägt der Build fehl.

**Beispiel für einen CI-Schritt (GitHub Actions):**
```yaml
- name: Check Go Licenses
  run: |
    go install [github.com/google/golicense@latest](https://github.com/google/golicense@latest)
    golicense -config=./golicense.json .
```

#### 2. "Policy as Code" mit Open Policy Agent (OPA)

Manchmal gehen Compliance-Anforderungen über einfache Lizenz-Checks hinaus. Zum Beispiel: "Jedes Docker-Image muss von einem `scratch`- oder `alpine`-Basis-Image abgeleitet sein" oder "Jeder Microservice muss ein Logging-Framework in Version X.Y oder höher verwenden".

* **Das Risiko:** Abweichungen von architektonischen Vorgaben und internen Best Practices.
* **Meine Lösung:** Ich nutze Open Policy Agent (OPA). OPA ist ein universelles Werkzeug, um Richtlinien als Code zu definieren und durchzusetzen. Die Richtlinien werden in der Sprache "Rego" geschrieben.
    * Ich schreibe Rego-Policies, die strukturierte Daten (z.B. den Inhalt einer `go.mod`-Datei, eine `Dockerfile` oder eine Terraform-Plan-JSON) überprüfen.
    * In der CI-Pipeline generiere ich die relevanten Daten und lasse OPA die Prüfung durchführen.

**Konzeptionelles Beispiel (OPA-Prüfung einer Dockerfile):**
```bash
# In der CI-Pipeline
opa eval -i Dockerfile -d policy.rego "data.docker.is_compliant"
```
Wenn die Policy nicht erfüllt ist, gibt der Befehl einen Fehlercode zurück und der Build schlägt fehl.

#### 3. Security-Compliance als Teil des Prozesses

Viele Sicherheits-Checks sind gleichzeitig auch Compliance-Checks.

* **Das Risiko:** Verletzung von Sicherheitsstandards, die oft Teil von Compliance-Frameworks (wie ISO 27001) sind.
* **Meine Lösung:** Die bereits etablierten DevSecOps-Praktiken werden zum Teil des Compliance-Monitorings.
    * **SAST-Scans (Static Application Security Testing):** Tools wie `gosec` (integriert in `golangci-lint`) prüfen auf sicherheitsrelevante Programmierfehler. Ein fehlschlagender `gosec`-Scan ist ein Compliance-Verstoß.
    * **Container-Scanning:** Ein Scan des finalen Docker-Images mit Tools wie Trivy auf bekannte CVEs ist ebenfalls ein Compliance-Gate. Ein Fund mit `CRITICAL`-Schweregrad bricht den Build ab.

## Fazit: Compliance als integrierter Qualitätsparameter

Durch die Integration von Compliance-Monitoring direkt in die CI/CD-Pipeline wird Compliance von einer reaktiven, audit-getriebenen Aktivität zu einem proaktiven, automatisierten Teil des täglichen Entwicklungsprozesses. Es wird zu einem messbaren Qualitätsparameter, genau wie Unit-Tests oder Performance-Metriken. Dieser "Compliance as Code"-Ansatz reduziert nicht nur das Risiko von Verstößen drastisch, sondern beschleunigt auch den gesamten Entwicklungs- und Release-Prozess, da Compliance-Probleme sofort und nicht erst am Ende behoben werden.

-----

**Empfinden Sie Compliance-Prüfungen als Bremsklotz für Ihre agilen Entwicklungsprozesse?**
Ich helfe Ihnen, Compliance-Anforderungen als Code zu definieren und die Überprüfung direkt in Ihre CI/CD-Pipeline zu integrieren. Lassen Sie uns gemeinsam einen automatisierten und revisionssicheren Prozess aufbauen, der Compliance beschleunigt statt verlangsamt. [Kontaktieren Sie mich für die Automatisierung Ihrer Compliance-Checks.](/kontakt/)

-----

**Interessieren Sie sich für dieses Thema oder benötigen Sie Beratung?**  
Ich unterstütze Sie gerne bei Ihren Projekten. [Kontaktieren Sie mich für eine strategische Beratung.](mailto:kontakt@waldheim.dev)
