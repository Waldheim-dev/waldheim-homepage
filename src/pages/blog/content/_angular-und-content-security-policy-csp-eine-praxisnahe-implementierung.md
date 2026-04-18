---
title: "Angular und Content Security Policy (CSP): Eine praxisnahe Implementierung"
description: "Dieser Beitrag ist eine Schritt-für-Schritt-Anleitung, wie ich eine strikte Content Security Policy für eine komplexe Angular-Anwendung implementiere."
pubDate: "2025-10-06"
heroImage: "/blogs/angular-und-content-security-policy-csp-eine-praxisnahe-implementierung.png"
imagePrompt: "Professional high-tech 3D render or minimalist illustration for a blog post titled 'Angular und Content Security Policy (CSP): Eine praxisnahe Implementierung'. Theme: Dieser Beitrag ist eine Schritt-für-Schritt-Anleitung, wie ich eine strikte Content Security Policy für eine komplexe Angular-Anwendung implementiere.. Style: Modern enterprise glass aesthetic, dark mode, accent colors (cyan, amber, or violet), high resolution, 16:9 aspect ratio."
author: "markus-waldheim"
keywords: "Content Security Policy, CSP, Angular, Frontend-Sicherheit, DevSecOps, XSS, Sicherheit"
---

## Angular und Content Security Policy (CSP): Ihr bester Freund im Kampf gegen XSS

Selbst in einer gut geschriebenen Angular-Anwendung, die Angulars eingebaute Schutzmechanismen voll ausnutzt, bleibt ein Restrisiko für Cross-Site Scripting (XSS)-Angriffe. Eine einzige unsichere Drittanbieter-Bibliothek oder eine unbedachte Verwendung von `[innerHTML]` kann eine Lücke aufreißen. Hier kommt eine der wirkungsvollsten zusätzlichen Verteidigungslinien ins Spiel: die **Content Security Policy (CSP)**.

Eine CSP ist im Wesentlichen eine Whitelist, die Sie dem Browser über einen HTTP-Header mitteilen. Sie definiert, von welchen Quellen (Domains) der Browser Ressourcen wie Skripte, Stylesheets, Bilder oder Schriftarten laden und ausführen darf. Selbst wenn es einem Angreifer gelingt, bösartigen Code in Ihre Seite einzuschleusen, verhindert eine richtig konfigurierte CSP dessen Ausführung. In diesem Beitrag gebe ich Ihnen eine praxisnahe Schritt-für-Schritt-Anleitung, wie ich eine strikte CSP für eine komplexe Angular-Anwendung implementiere.

### Die Herausforderung mit Angular und CSP

Angular-Anwendungen stellen eine besondere Herausforderung für CSPs dar, weil sie standardmäßig Inline-Styles und Just-in-Time (JIT)-kompilierten JavaScript-Code verwenden, was `unsafe-inline` und `unsafe-eval` in den CSP-Direktiven erfordern würde – und das wollen wir aus Sicherheitsgründen unbedingt vermeiden.

### Meine Schritt-für-Schritt-Implementierung

#### Schritt 1: Angular für CSP vorbereiten (Ahead-of-Time Compilation)

Der erste Schritt ist, sicherzustellen, dass Ihre Angular-Anwendung immer im Ahead-of-Time (AOT)-Modus kompiliert wird. Der AOT-Compiler wandelt Ihre Angular-HTML- und TypeScript-Templates bereits zur Build-Zeit in effizienten JavaScript-Code um. Dies eliminiert die Notwendigkeit für `unsafe-eval` in Ihrer CSP.

* **Praxis:** Der AOT-Modus ist bei Produktions-Builds (`ng build --configuration production`) standardmäßig aktiviert. Stellen Sie sicher, dass Sie immer diesen Build für Ihr Deployment verwenden.

#### Schritt 2: Der richtige Ort für die CSP – Der HTTP-Header

Obwohl man eine CSP auch per `<meta>`-Tag in der `index.html` setzen kann, ist die Implementierung über einen HTTP-Header immer die sicherere und empfohlene Methode.

* **Beispiel (Nginx-Konfiguration):**
    ```nginx
    # /etc/nginx/conf.d/default.conf
    server {
        # ...
        add_header Content-Security-Policy "IHRE_CSP_HIER" always;
        # ...
    }
    ```
    Der `always`-Parameter sorgt dafür, dass der Header auch bei Fehlerseiten gesendet wird.

#### Schritt 3: Die Basis-Policy erstellen

Ich starte immer mit einer sehr restriktiven Basis-Policy und lockere sie nur dort, wo es absolut notwendig ist.

* **Eine gute Ausgangsbasis:**
    ```
    default-src 'self';
    ```
    Diese Regel besagt: Lade standardmäßig alles nur von der eigenen Domain (`'self'`). Dies wird sofort viele Dinge in Ihrer Anwendung zerstören (Schriftarten, API-Aufrufe, Bilder von anderen Domains), aber das ist gut so. Jetzt können wir gezielt Ausnahmen hinzufügen.

#### Schritt 4: Die Direktiven für eine typische Angular-App anpassen

Nun passen wir die Policy an die Bedürfnisse einer Angular-App an.

* **`script-src`:** Die wichtigste Direktive. Sie steuert, welche Skripte ausgeführt werden dürfen.
    ```
    script-src 'self';
    ```
    Dies erlaubt nur die JavaScript-Dateien, die von Ihrer eigenen Domain geladen werden (z.B. `main.js`, `polyfills.js`).

* **`style-src`:** Angular-Komponenten verwenden oft Inline-Styles für die Kapselung. Dies erfordert normalerweise `'unsafe-inline'`.
    ```
    style-src 'self' 'unsafe-inline';
    ```
    Obwohl `'unsafe-inline'` hier nicht ideal ist, ist das Risiko bei Styles deutlich geringer als bei Skripten. Fortgeschrittene Setups können auf Hashes oder Nonces umsteigen, aber für den Anfang ist dies ein pragmatischer Kompromiss.

* **`connect-src`:** Definiert, mit welchen Endpunkten Ihre App per `HttpClient` kommunizieren darf.
    ```
    connect-src 'self' [https://api.meinedomain.com](https://api.meinedomain.com);
    ```
    Hier fügen Sie die URL Ihrer Backend-API hinzu.

* **`img-src` und `font-src`:** Wenn Sie Bilder oder Schriftarten von anderen Domains (z.B. Google Fonts, einem CDN) laden.
    ```
    img-src 'self' data: [https://cdn.meinedomain.com](https://cdn.meinedomain.com);
    font-src 'self' [https://fonts.gstatic.com](https://fonts.gstatic.com);
    ```
    `data:` ist oft für eingebettete SVGs oder Bilder notwendig.

#### Schritt 5: Die vollständige Policy und der "Report-Only"-Modus

Eine vollständige, pragmatische Policy könnte so aussehen:

```
default-src 'self'; 
script-src 'self'; 
style-src 'self' 'unsafe-inline' [https://fonts.googleapis.com](https://fonts.googleapis.com); 
font-src 'self' [https://fonts.gstatic.com](https://fonts.gstatic.com); 
img-src 'self' data: [https://cdn.meinedomain.com](https://cdn.meinedomain.com); 
connect-src 'self' [https://api.meinedomain.com](https://api.meinedomain.com);
frame-ancestors 'none';
object-src 'none';
base-uri 'self';
```

* **Wichtige Ergänzungen:**
    * `frame-ancestors 'none'`: Verhindert Clickjacking-Angriffe.
    * `object-src 'none'`: Deaktiviert veraltete Plugins wie Flash.
    * `base-uri 'self'`: Verhindert Angriffe, die relative URLs manipulieren.

**Der Trick zur Einführung:** Bevor Sie die Policy scharfschalten, verwenden Sie den "Report-Only"-Modus. Der Browser wird Verstöße nicht blockieren, sondern nur einen JSON-Bericht an eine von Ihnen definierte URL senden.

* **HTTP-Header im Report-Modus:**
    ```
    Content-Security-Policy-Report-Only "IHRE_CSP_HIER; report-uri /csp-reports;"
    ```
    So können Sie Ihre Policy im Live-Betrieb testen und verfeinern, ohne die Funktionalität für Ihre Nutzer zu beeinträchtigen.

## Fazit: Eine unverzichtbare, proaktive Verteidigungslinie

Die Implementierung einer Content Security Policy ist eine der effektivsten Maßnahmen zur Härtung einer modernen Frontend-Anwendung. Sie mag anfangs etwas aufwändig erscheinen, aber der Sicherheitsgewinn ist enorm. Eine strikte CSP fungiert als proaktiver Schutzwall, der eine ganze Klasse von XSS-Angriffen im Keim erstickt. Für mich ist sie ein nicht verhandelbarer Bestandteil jeder professionell entwickelten Angular-Anwendung.

-----

**Möchten Sie die Sicherheit Ihrer Angular-Anwendung mit einer robusten Content Security Policy auf die nächste Stufe heben?**
Ich helfe Ihnen bei der Analyse, Erstellung und Implementierung einer maßgeschneiderten CSP, die auf Ihre Anwendung zugeschnitten ist, und unterstütze Sie bei der Einrichtung des Reportings. [Kontaktieren Sie mich für ein Frontend-Security-Audit.](/kontakt/)
-----

**Interessieren Sie sich für dieses Thema oder benötigen Sie Beratung?**  
Ich unterstütze Sie gerne bei Ihren Projekten. [Kontaktieren Sie mich für eine strategische Beratung.](mailto:admin@waldheim.dev)
