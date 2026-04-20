# 🌐 waldheim.dev - Moderne Webpräsenz

[![Built with Astro](https://astro.badg.es/v2/built-with-astro/tiny.svg)](https://astro.build)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1-38bdf8)](https://tailwindcss.com/)
[![Playwright](https://img.shields.io/badge/Playwright-1.56-45ba4b)](https://playwright.dev/)

Moderne Webpräsenz für digitale Beratung, Webentwicklung, Cloud, DevOps, KI und Automatisierung.

**🚀 Live:** [www.waldheim.dev](https://www.waldheim.dev)

---

## 📋 Projekt-Übersicht

**Tech Stack:**
- **Framework:** Astro 5.x (Static Site Generation)
- **Styling:** TailwindCSS 4.x mit Custom Design System
- **Animationen:** GSAP
- **Icons:** Font Awesome Pro 7.x
- **Testing:** Playwright (Visual + A11y Tests)
- **Package Manager:** pnpm 10.18.2

**Produkte & Services:**
- 🌱 **Ecodrive** - Digitales Fahrtenbuch
- 🏢 **Silvacore** - WEG-Verwaltungssoftware
- 💬 **Socialverse** - KI-Marketing-Plattform
- 🛠️ **Services** - Webentwicklung, Cloud, DevOps, KI, Design

---

## 🚀 Quick Start

```bash
# Dependencies installieren
pnpm install

# Dev Server starten (localhost:4321)
pnpm dev

# Production Build
pnpm build

# Build Preview
pnpm preview
```

---

## 🧞 Commands

| Command | Action |
|---------|--------|
| `pnpm dev` | Dev Server starten (Port 4321) |
| `pnpm build` | Production Build (`./dist/`) |
| `pnpm preview` | Build lokal testen |
| `pnpm test:visual` | Playwright Visual Tests |
| `pnpm test:visual:ui` | Playwright UI Mode |
| `pnpm test:seo` | SEO Validation Tests |
| `pnpm lighthouse` | Lighthouse Performance Audit |

### 🛠️ Utility Scripts

| Script | Beschreibung |
|--------|--------------|
| `./scripts/convert-pngs-to-webp.sh` | Konvertiert alle PNGs im `public/`-Ordner zu WebP |
| `./scripts/convert-missing-webp.sh` | Konvertiert nur fehlende WebP-Dateien |
| `./scripts/optimize-images.sh` | Optimiert Bilder (Komprimierung) |
| `./scripts/generate-video-posters.sh` | Generiert Video-Vorschaubilder |
| `./scripts/fix-trailing-slashes.sh` | Korrigiert Trailing Slashes in Links |

**Beispiel:**
```bash
# Alle PNGs zu WebP konvertieren (Qualität: 85)
./scripts/convert-pngs-to-webp.sh

# Mit benutzerdefinierter Qualität (0-100)
./scripts/convert-pngs-to-webp.sh 90
```

---

## 🎨 Design System: Glow-Glass-Style

Sanfte Glow-Effekte, Glass-Morphism und subtile Animationen im Dark Mode.

**Vollständige Dokumentation:** `.github/copilot-instructions.md`

**Produktfarben:**
- Ecodrive: `green-400` / `emerald-500`
- Socialverse: `purple-500` / `pink-500`
- Silvacore: `green-400` / `emerald-500`

**Wichtige Pattern:**
- Hero Sections mit Gradient-Text
- Glass Cards mit Hover-Glow
- Ambient Glow auf Bildern (nur Hover)

---

## ♿ Barrierefreiheit (A11y)

**Ziel:** 0 Violations (WCAG 2.1 AA)

```bash
# A11y-Tests ausführen
pnpm exec playwright test tests/accessibility.spec.ts --reporter=list

# Erwartung: 0 Violations auf allen Seiten
```

**Getestete Seiten:**
- Homepage
- Silvacore Pricing
- Socialverse Pricing
- Service Pricing
- Ecodrive

---

## 🔍 SEO-Optimierung

**Aktuelle Situation (27.10.2025):**
- Indexierte Seiten: 54 / 202 (26.7%)
- Nicht indexiert: 148
- Impressionen/Tag: 4

**Ziel (12 Wochen):**
- Indexierte Seiten: 180+ (90%+)
- Impressionen/Tag: 100+

### SEO-Dokumentation:
- 📄 **SEO_ZUSAMMENFASSUNG.md** - Schnellübersicht & Sofortmaßnahmen
- 📄 **SEO_ANALYSE_DETAILLIERT.md** - Vollständige Analyse aller 148 Probleme
- 📄 **SEO_INDEXIERUNG_LOESUNG.md** - 5-Phasen-Plan (technisch)
- 📄 **GSC_ANLEITUNG.md** - Google Search Console Schritt-für-Schritt
- 📄 **SEO_TRACKING_DASHBOARD.md** - Wöchentliches Fortschritts-Tracking
- 📄 **SEO_QUICK_START.md** - Schnellstart-Guide

### SEO-Tests:
```bash
# Alle SEO-Validierungen
pnpm test:seo

# Tests prüfen:
# - Canonical Tags (ohne Query-Parameter)
# - noindex Meta-Tags (nur Utility-Pages)
# - Open Graph Tags
# - Strukturierte Daten (Schema.org)
# - Sitemap Inclusion
# - robots.txt Korrektheit
```

**Implementierte Fixes:**
- ✅ robots.txt optimiert (Impressum/Datenschutz freigegeben)
- ✅ Canonical Tag Bug behoben (Query-Parameter entfernt)
- ✅ Trailing Slash Strategy (`trailingSlash: 'always'`)
- ✅ Sitemap optimiert (Test-Seiten ausgeschlossen, Prioritäten gesetzt)

**Nächste Schritte:**
1. Google Search Console URLs exportieren
2. 404-Redirects in `public/_redirects` erstellen
3. Content-Audit (min. 300 Wörter pro Seite)
4. Interne Verlinkung stärken

---

## 🏗️ Projekt-Struktur

```
src/
├── components/        # Wiederverwendbare Komponenten
│   ├── Price*.astro  # Pricing-Komponenten
│   ├── Hero*.astro   # Hero-Sektionen
│   └── *CTA.astro    # Call-to-Actions
├── layouts/          # Layout-Templates
│   └── Layout.astro  # Haupt-Layout (SEO, Meta Tags)
├── pages/            # Routen (File-based Routing)
│   ├── index.astro   # Homepage
│   ├── silvacore/    # Silvacore Produktseiten
│   ├── ecodrive/     # Ecodrive Produktseiten
│   ├── socialverse/  # Socialverse Produktseiten
│   ├── services/     # Dienstleistungen
│   └── referenzen/   # Projekt-Referenzen
└── styles/           # Globale Styles

tests/
├── accessibility.spec.ts      # A11y-Tests (Axe)
├── seo-validation.spec.ts     # SEO-Validation (NEW!)
├── visual-audit.spec.ts       # Visual Regression
└── comprehensive-audit.spec.ts # Umfassende Audits

public/
├── robots.txt                 # SEO: Crawler-Regeln (optimiert)
├── _redirects                 # 404-Redirects (Netlify/Vercel)
└── cookieconsent-config.js    # DSGVO Cookie Consent
```

---

## 🧪 Testing

### Playwright Tests

```bash
# Alle Visual Tests
pnpm test:visual

# Mit UI (interaktiv)
pnpm test:visual:ui

# A11y Tests
pnpm exec playwright test tests/accessibility.spec.ts

# SEO Tests
pnpm test:seo
```

### Lighthouse Performance

```bash
# Lighthouse CI (lokal)
pnpm lighthouse

# Nur Collect
pnpm lighthouse:collect

# Nur Assert
pnpm lighthouse:assert
```

---

## 📦 Dependencies

**Wichtige Packages:**
- `astro@5.14.4` - Framework
- `tailwindcss@4.1.14` - Styling
- `@tailwindcss/vite@4.1.14` - Vite Integration
- `gsap@3.13.0` - Animationen
- `@fortawesome/fontawesome-free@6.x` - Icons
- `@astrojs/sitemap@3.6.0` - Sitemap Generation
- `@waldheimdev/astro-ai-llms-txt@1.1.3` - LLMs.txt für KI-Crawler
- `@sentry/astro@10.19.0` - Error Tracking
- `@playwright/test@1.56.1` - Testing
- `@axe-core/playwright@4.11.0` - A11y Testing

**Installation:**
```bash
pnpm install
```

---

## 🔧 Konfiguration

### Astro Config (`astro.config.mjs`)

```javascript
export default defineConfig({
  site: 'https://www.waldheim.dev',
  trailingSlash: 'always', // Konsistente URLs
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/test-'),
      serialize: (item) => {
        // Prioritäten: Homepage (1.0), Produkte (0.9), etc.
        if (item.url === 'https://www.waldheim.dev/') {
          item.priority = 1.0;
        }
        return item;
      }
    }),
    // ... weitere Integrations
  ]
});
```

### TailwindCSS (`tailwind.config.cjs`)

Custom Design System mit waldheim.dev Farben:
- `primary-*`: Hauptfarbe (cyan/blue)
- `dark-*`: Dunkle Hintergründe
- `light-*`: Helle Texte/Borders

---

## 🎯 Qualitäts-Ziele

- ✅ **A11y:** 0 Violations (WCAG 2.1 AA)
- ✅ **Performance:** Lighthouse Score > 90
- ⏳ **SEO:** 180+ indexierte Seiten, 100+ Impressionen/Tag
- ✅ **Design:** Konsistentes Glow-Glass-System
- ✅ **Code Quality:** TypeScript strict, ESLint clean
- ✅ **Responsiveness:** Mobile-first, alle Breakpoints

---

## 📚 Dokumentation

### Entwickler-Guides:
- `.github/copilot-instructions.md` - Vollständige Coding-Richtlinien
- `GLOW_DESIGN_SYSTEM.md` - Design System Dokumentation
- `DESIGN_MIGRATION_SUMMARY.md` - Design-Migration Historie

### SEO-Guides:
- `SEO_ZUSAMMENFASSUNG.md` - **START HIER!** (Schnellübersicht)
- `SEO_ANALYSE_DETAILLIERT.md` - Vollständige Problem-Analyse
- `SEO_INDEXIERUNG_LOESUNG.md` - 5-Phasen-Plan
- `GSC_ANLEITUNG.md` - Google Search Console How-To
- `SEO_TRACKING_DASHBOARD.md` - Fortschritts-Tracking

### Weitere Docs:
- `ANIMATION_STORYTELLING_STRATEGY.md` - Animation-Konzepte
- `SEO_VERBESSERUNGEN.md` - SEO-Roadmap
- `todo.md` - Projekt-TODOs

---

## 🚀 Deployment

**Hosting:** Vercel / Netlify (Static Site)

**Build-Prozess:**
```bash
pnpm build
# Output: dist/
```

**Wichtige Dateien im Build:**
- `dist/_redirects` - 404-Redirects (aus `public/_redirects`)
- `dist/sitemap-index.xml` - Sitemap
- `dist/robots.txt` - Crawler-Regeln

---

## 🤝 Contribution

### Pre-Commit Checklist:
- [ ] A11y-Tests laufen durch (`pnpm exec playwright test tests/accessibility.spec.ts`)
- [ ] SEO-Tests laufen durch (`pnpm test:seo`)
- [ ] Keine TypeScript Errors
- [ ] Build erfolgreich (`pnpm build`)
- [ ] Design System eingehalten (Glow-Glass-Style)

### Commit Messages:
```bash
feat: Neue Feature hinzugefügt
fix: Bug behoben
docs: Dokumentation aktualisiert
style: Code-Formatierung
refactor: Code-Refactoring
test: Tests hinzugefügt
```

---

## 📞 Support & Links

**Website:** https://www.waldheim.dev  
**Google Search Console:** https://search.google.com/search-console  
**Sentry:** Error Tracking Dashboard

**Tech Docs:**
- [Astro](https://docs.astro.build)
- [TailwindCSS v4](https://tailwindcss.com/docs)
- [GSAP](https://gsap.com/docs/v3/)
- [Playwright](https://playwright.dev)

---

**Version:** 26.3.0  
**Letzte Aktualisierung:** 27. Oktober 2025  
**Package Manager:** pnpm@10.18.2

