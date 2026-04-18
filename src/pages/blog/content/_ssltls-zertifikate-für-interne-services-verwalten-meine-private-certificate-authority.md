---
title: "SSL/TLS für interne Services: Meine private Certificate Authority"
description: "Ich zeige, wie ich eine eigene, interne Certificate Authority (CA) aufsetze, um die Kommunikation zwischen Microservices mit TLS abzusichern."
pubDate: "2026-01-23"
heroImage: "/images/blog/ssltls-zertifikate-für-interne-services-verwalten-meine-private-certificate-authority.webp"
imagePrompt: "Professional high-tech 3D render or minimalist illustration for a blog post titled 'SSL/TLS-Zertifikate für interne Services verwalten: Meine private Certificate Authority.'. Theme: Ich zeige, wie ich eine eigene, interne Certificate Authority (CA) aufsetze, um die Kommunikation zwischen Microservices mit TLS abzusichern.. Style: Modern enterprise glass aesthetic, dark mode, accent colors (cyan, amber, or violet), high resolution, 16:9 aspect ratio."
author: "markus-waldheim"
keywords: "SSL/TLS, Zertifikate, Certificate Authority, CA, Sicherheit, Microservices, Verschlüsselung, DevSecOps"
---

## Vertrauen im eigenen Netzwerk: Warum eine interne CA?

In einer "Zero Trust"-Architektur gilt ein einfaches Prinzip: Vertraue niemandem, auch nicht innerhalb des eigenen Netzwerks. Die Verschlüsselung der Kommunikation zwischen Microservices (mTLS) ist daher ein Muss. Doch öffentliche CAs wie Let's Encrypt sind für interne Services oft unpraktisch. Hier kommt die eigene Certificate Authority (CA) ins Spiel. In diesem Beitrag zeige ich Ihnen, wie ich eine private CA aufbaue und verwalte.

### 1. Das Fundament: Root- und Intermediate-CA

Eine sichere CA-Infrastruktur besteht niemals aus nur einem Zertifikat.

*   **Root-CA:** Das "heilige" Zertifikat. Es wird offline auf einem gesicherten System aufbewahrt und dient nur dazu, die Intermediate-CA zu signieren.
*   **Intermediate-CA:** Diese wird für den täglichen Betrieb genutzt. Sollte sie kompromittiert werden, kann sie von der Root-CA widerrufen werden, ohne dass alle Clients das Root-Zertifikat neu installieren müssen.

### 2. Tools für den Betrieb: Von OpenSSL bis Step-CA

Während man eine CA mit purem OpenSSL betreiben kann, ist das für moderne Microservice-Umgebungen zu fehleranfällig.

*   **Smallstep (step-ca):** Mein Favorit für interne Umgebungen. Es bietet eine moderne API, unterstützt das ACME-Protokoll (wie Let's Encrypt) und erlaubt die automatisierte Ausstellung von Zertifikaten für kurzlebige Services.
*   **Vault PKI Secrets Engine:** Wenn Sie bereits HashiCorp Vault nutzen, ist die integrierte PKI-Engine eine exzellente Wahl, um Zertifikate on-the-fly zu generieren.

### 3. Automatisierung ist der Schlüssel

Manuelles Zertifikats-Management führt unweigerlich zu Ausfällen durch abgelaufene Zertifikate.

*   **ACME-Protokoll:** Ich konfiguriere meine internen Services so, dass sie ihre Zertifikate automatisch über ACME von der internen CA beziehen und erneuern.
*   **Cert-Manager in Kubernetes:** In K8s-Umgebungen ist der `cert-manager` unverzichtbar. Er übernimmt das Lifecycle-Management der Zertifikate vollautomatisch.

### 4. Verteilung des Vertrauens

Damit die Services den Zertifikaten der privaten CA vertrauen, muss das Root-Zertifikat auf allen Servern und in allen Containern installiert sein.

*   **OS-Trust-Store:** Ich integriere das Root-Zertifikat in meine Basis-Images oder verteile es über Konfigurations-Management-Tools wie Ansible. Nur so wird die TLS-Verbindung von den Go- oder Angular-Applikationen als gültig anerkannt.

## Fazit: Sicherheit ohne Kompromisse

Eine eigene CA aufzusetzen erfordert initialen Aufwand und ein tiefes Verständnis für Kryptografie. Doch der Gewinn an Sicherheit und Kontrolle über die interne Kommunikation ist enorm. Mit Tools wie Step-ca wird die Verwaltung von tausenden Zertifikaten so einfach wie bei Let's Encrypt – nur eben unter Ihrer vollen Kontrolle.

-----

**Möchten Sie die Kommunikation in Ihrer Microservice-Architektur absichern oder planen Sie den Aufbau einer internen Zertifikats-Infrastruktur?**  
Ich unterstütze Sie bei der Konzeption und technischen Umsetzung Ihrer privaten Certificate Authority. [Lassen Sie uns Ihre interne Sicherheit auf das nächste Level heben.](mailto:kontakt@waldheim.dev)
