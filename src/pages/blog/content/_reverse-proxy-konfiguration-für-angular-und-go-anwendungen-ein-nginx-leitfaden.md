---
title: "Reverse-Proxy-Konfiguration für Angular und Go: Ein Nginx-Leitfaden"
description: "Wie ich Nginx als zentralen Reverse Proxy nutze, um Angular-Frontends und Go-Backends sicher und performant unter einer Domain zu vereinen."
pubDate: "2025-11-22"
heroImage: "/images/blog/reverse-proxy-konfiguration-für-angular-und-go-anwendungen-ein-nginx-leitfaden.webp"
imagePrompt: "Professional high-tech 3D render or minimalist illustration for a blog post titled 'Reverse-Proxy-Konfiguration für Angular und Go: Ein Nginx-Leitfaden'. Theme: Wie ich Nginx als zentralen Reverse Proxy nutze, um Angular-Frontends und Go-Backends sicher und performant unter einer Domain zu vereinen.. Style: Modern enterprise glass aesthetic, dark mode, accent colors (cyan, amber, or violet), high resolution, 16:9 aspect ratio."
author: "markus-waldheim"
keywords: "Nginx, Reverse Proxy, Angular, Go, Deployment, SSL, Sicherheit, Performance"
---

## Nginx als Orchester-Leiter: Angular und Go harmonisch vereint

In einer modernen Web-Architektur haben wir oft eine klare Trennung: Ein Single-Page-Application (SPA) Frontend wie Angular und ein leistungsstarkes Backend wie Go. Doch wie bringt man beide Teile unter einer Domain zusammen, ohne in CORS-Probleme zu laufen oder unnötige Komplexität zu erzeugen? Die Antwort ist ein Reverse Proxy. In diesem Beitrag zeige ich Ihnen, wie ich Nginx konfiguriere, um Angular und Go sicher und performant zu betreiben.

### Warum ein Reverse Proxy?

Anstatt das Go-Backend und das Angular-Frontend direkt dem Internet auszusetzen, setzen wir Nginx davor. Dies bietet entscheidende Vorteile:

1.  **Unified Domain:** Frontend und Backend sind unter der gleichen Domain erreichbar (z.B. `/` für Angular und `/api` für Go). Das eliminiert Cross-Origin Resource Sharing (CORS) Probleme vollständig.
2.  **SSL-Terminierung:** Nginx kümmert sich zentral um die HTTPS-Verschlüsselung (z.B. mit Let's Encrypt). Die internen Services können über einfaches HTTP kommunizieren.
3.  **Sicherheit:** Nginx dient als Schutzschild. Wir können Rate-Limiting, Header-Härtung und Zugriffsbeschränkungen an einer zentralen Stelle implementieren.

### Die Grundkonfiguration

Hier ist ein Ausschnitt meiner bewährten Nginx-Konfiguration:

*   **Das Frontend (Angular):** Ich liefere die statischen Dateien direkt über Nginx aus. Das ist extrem schnell und entlastet die Anwendung. Mit `try_files` stelle ich sicher, dass das Angular-Routing auch bei einem Page-Refresh korrekt funktioniert.
*   **Das Backend (Go):** Alle Anfragen an `/api` werden mittels `proxy_pass` an den internen Go-Service weitergeleitet. Dabei achte ich darauf, wichtige Header wie `X-Real-IP` und `X-Forwarded-For` mitzugeben, damit das Backend die echte IP-Adresse des Nutzers kennt.

### Performance-Tuning: Kompression und Caching

Nginx kann die Ladezeit Ihrer Angular-App massiv verbessern:

*   **Gzip/Brotli:** Ich aktiviere konsequent Kompression für alle Text-Assets (JS, CSS, HTML). Das reduziert die Transfergröße oft um über 70%.
*   **Caching-Header:** Statische Dateien wie Bilder oder Fonts versehe ich mit langen Cache-Laufzeiten, während das `index.html` niemals gecached werden sollte, um Updates sofort auszuliefern.

### Sicherheits-Härtung

Ein Reverse Proxy ist der ideale Ort für Security-Header:

*   **HSTS:** Zwingt den Browser, nur noch verschlüsselte Verbindungen zu nutzen.
*   **Content Security Policy (CSP):** Schützt vor XSS-Angriffen, indem genau definiert wird, welche Scripte und Ressourcen geladen werden dürfen.
*   **X-Frame-Options:** Verhindert Clickjacking-Attacken.

## Fazit: Ein Muss für jede Enterprise-Architektur

Nginx ist weit mehr als nur ein Webserver. Als Reverse Proxy ist er das Bindeglied, das Ihre Angular- und Go-Anwendungen zu einer stabilen, sicheren und schnellen Einheit formt. Die Investition in eine saubere Nginx-Konfiguration zahlt sich durch einfacheres Deployment und eine deutlich höhere Sicherheit für Ihre Nutzer aus.

-----

**Benötigen Sie Unterstützung bei der Konfiguration Ihrer Server oder möchten Sie Ihre Angular-Go-Architektur optimieren?**  
Ich helfe Ihnen beim Aufbau einer sicheren und performanten Infrastruktur mit Nginx. [Kontaktieren Sie mich für ein Deployment-Audit.](mailto:admin@waldheim.dev)
