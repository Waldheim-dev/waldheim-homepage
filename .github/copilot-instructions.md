# 🚀 Copilot Instructions - waldheim.dev Homepage

Diese Datei enthält wichtige Richtlinien und Best Practices für die Entwicklung der waldheim.dev Homepage mit GitHub Copilot.

---

## 📋 Projekt-Übersicht

**Projekt:** waldheim.dev - Moderne Webpräsenz  
**Tech Stack:** Astro 5.x, TailwindCSS 4.x, TypeScript  
**Fokus:** Digitale Beratung, Webentwicklung, Cloud, DevOps, KI, Automatisierung  
**Produkte:** Ecodrive, Silvacore, Socialverse  

### Wichtige Technologien
- **Framework:** Astro (Static Site Generation)
- **Styling:** TailwindCSS v4 mit Custom Design System
- **Animationen:** GSAP
- **Icons:** Font Awesome Pro 7.x
- **Testing:** Playwright (Visual + A11y Tests)
- **Package Manager:** pnpm (v10.18.2)
- **Integrations:** Sentry, Sitemap, MDX, Compressor, AI LLMs.txt

---

## 🎨 Design System: Glow-Glass-Style

### ✅ DO: Sanfte Glow-Effekte verwenden

```astro
<!-- ✅ Hero Buttons (Produktfarben) -->
<a class="bg-gradient-to-r from-green-400 to-emerald-500 text-dark-950 
         hover:shadow-lg hover:shadow-green-400/50 transition-all">
  Jetzt starten
</a>

<!-- ✅ Badges/Pills mit Glow -->
<span class="bg-green-500/10 border border-green-500/30 text-green-400">
  <i class="fa-solid fa-flask"></i>
  Closed Alpha
</span>

<!-- ✅ Standard Buttons -->
<button class="bg-primary-800 hover:shadow-lg hover:shadow-primary-500/50 
               text-white transition-all">
  Mehr erfahren
</button>

<!-- ✅ Glass Cards -->
<div class="bg-dark-900/50 border border-primary-500/20 
            hover:border-primary-500/40 backdrop-blur-sm transition-all">
  <!-- Content -->
</div>

<!-- ✅ Ambient Glow (nur bei Hover) -->
<div class="relative group">
  <div class="absolute -inset-2 bg-gradient-to-r from-primary-500/20 to-cyan-500/20 
              blur-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
  <img src="screenshot.png" class="relative z-10" />
</div>
```

### ❌ DON'T: Harte Gradienten vermeiden

```astro
<!-- ❌ NICHT verwenden: Harsh Gradients -->
<div class="bg-gradient-to-r from-blue-500 to-purple-600">
  <!-- Zu hart, tut weh! -->
</div>

<!-- ❌ NICHT verwenden: Rotating Gradients -->
<div class="blur-sm bg-conic-180 from-pink-500 via-cyan-500 to-violet-500 
            animate_rotate_gradient">
  <!-- Eye-burn! -->
</div>

<!-- ❌ NICHT verwenden: Stark gesättigte Backgrounds -->
<div class="bg-blue-600">
  <!-- Zu grell im Dark Mode -->
</div>
```

### 🎨 Produktfarben

| Produkt | Primary | Secondary | Glow |
|---------|---------|-----------|------|
| **Ecodrive** | `green-400` | `emerald-500` | `green-400/50` |
| **Socialverse** | `purple-500` | `pink-500` | `purple-500/50` |
| **Silvacore** | `green-400` | `emerald-500` | `green-400/50` |
| **Allgemein** | `primary-800` | `primary-500` | `primary-500/50` |

### 📐 Pattern Library

#### Pattern 1: Hero Section (Service)
```astro
<ServiceHero 
  title="Service Name"
  subtitle="Catchy subtitle"
  description="..."
  gradient="blue"
  icon="fa-code"
  badge="Expertise"
/>
```

#### Pattern 2: Related Services (Dynamic)
```astro
<!-- Standard implementation: Automatically filters current page -->
<RelatedServices />

<!-- With manual exclusion if URL logic differs -->
<RelatedServices exclude="service-key" />
```

#### Pattern 3: Case Study (Markdown Frontmatter)
```yaml
layout: "../../../layouts/ProjectLayout.astro"
title: "Project Title"
results:
  - value: "-80%"
    label: "Time Saved"
  - value: "99.9%"
    label: "Uptime"
problem: "The specific client challenge..."
solution: "The technical and strategic approach..."
techStack: ["go", "kubernetes", "tailwind"] # Use skill slugs from src/pages/ueber-mich/skills/
```

---

## 🎨 Skill & Logo Guidelines

### Logo Inversion for Dark Mode
When adding a new skill in `src/pages/ueber-mich/skills/*.json`, use `"invertImage": true` for logos that should appear pure white.
The component uses `filter: brightness(0) invert(1)` to ensure clarity on dark backgrounds.

### Skill Categorization
- **Backend:** `go`, `nodejs`, `ts`, `java`, `php`, `kafka`, `postgresql`.
- **Frontend:** `angular`, `vue`, `react`, `astro`, `ts`.
- **Infrastructure:** `kubernetes`, `docker`, `terraform`, `fluxcd`, `git`, `gitlab`.
- **Quality:** `playwright`, `vitest`, `jest`, `cypress`, `sonarqube`.

---

## ♿ Barrierefreiheit (A11y) - KRITISCH

**Ziel: 0 Violations auf ALLEN Seiten (WCAG 2.1 AA)**

### ✅ DO: A11y Best Practices

```astro
<!-- ✅ Dekorative Icons -->
<i class="fa-solid fa-rocket" aria-hidden="true"></i>

<!-- ✅ Funktionale Icons -->
<i class="fa-solid fa-check" aria-label="Enthalten" role="img"></i>

<!-- ✅ Buttons mit Labels -->
<button aria-label="Bild vergrößern" class="...">
  <i class="fa-solid fa-expand" aria-hidden="true"></i>
</button>

<!-- ✅ Scrollbare Container -->
<div tabindex="0" class="overflow-x-auto" role="region" aria-label="Preistabelle">
  <table>...</table>
</div>

<!-- ✅ Links mit Context -->
<a href="/projekt" aria-label="Projekt Waldheim IT ansehen">
  Mehr erfahren
</a>

<!-- ✅ Kontrast (min. 4.5:1) -->
<button class="bg-primary-800 text-white">  <!-- ✅ Dunkel genug -->
  Action
</button>
```

### ❌ DON'T: A11y Anti-Patterns

```astro
<!-- ❌ Leere aria-labels -->
<i class="fa-solid fa-check" aria-label=""></i>

<!-- ❌ tabindex auf falschen Elementen -->
<table tabindex="0">  <!-- ❌ Auf Container, nicht auf Table! -->
  ...
</table>

<!-- ❌ Icons ohne Context -->
<button>
  <i class="fa-solid fa-expand"></i>  <!-- ❌ Kein aria-label! -->
</button>

<!-- ❌ Zu geringer Kontrast -->
<button class="bg-primary-700 text-light-500">  <!-- ❌ Zu hell! -->
  Action
</button>

<!-- ❌ Links ohne Kontext -->
<a href="/projekt">Mehr</a>  <!-- ❌ Zu generisch! -->
```

### 🧪 A11y Testing

Vor jedem Commit:
```bash
# Alle A11y-Tests ausführen
pnpm exec playwright test tests/accessibility.spec.ts --reporter=list

# Einzelne Seite testen
pnpm exec playwright test tests/accessibility.spec.ts --reporter=list --grep="Homepage"
```

**Erwartung:** 0 Violations auf:
- Homepage (index)
- Silvacore Pricing
- Socialverse Pricing  
- Service Pricing
- Ecodrive

---

## 🏗️ Projekt-Struktur

### Wichtige Verzeichnisse

```
src/
├── components/        # Wiederverwendbare Komponenten
│   ├── Price*.astro  # Pricing-Komponenten (Ecodrive, Silvacore, etc.)
│   ├── Hero*.astro   # Hero-Sektionen
│   ├── *Features.astro  # Feature-Übersichten
│   └── *CTA.astro    # Call-to-Actions
├── layouts/          # Layout-Templates
│   └── ProjectLayout.astro  # Projekt-Detailseiten
├── pages/            # Routen (File-based Routing)
│   ├── index.astro   # Homepage
│   ├── silvacore/    # Produkt-Seiten
│   ├── ecodrive/
│   ├── socialverse/
│   ├── services/     # Dienstleistungen
│   └── referenzen/   # Projekt-Referenzen
├── styles/           # Globale Styles
└── utils/            # Helper-Funktionen

tests/
├── accessibility.spec.ts      # A11y-Tests (Axe)
├── visual-audit.spec.ts       # Visual Regression
└── comprehensive-audit.spec.ts # Umfassende Audits
```

### Naming Conventions

**Komponenten:**
- `PascalCase` für Astro-Komponenten: `PriceEcodrive.astro`
- Produktspezifisch mit Suffix: `SilvacoreFeatures.astro`
- Allgemein ohne Suffix: `Hero.astro`, `Footer.astro`

**CSS-Klassen:**
- TailwindCSS utility-first
- Custom CSS nur wenn absolut nötig
- Keine `style="..."` inline (außer dynamische Werte)

---

## 🧩 Komponenten-Entwicklung

### Astro-Komponenten Best Practices

```astro
---
// ✅ Props mit TypeScript Interface
interface Props {
  title: string;
  description?: string;
  variant?: 'primary' | 'secondary';
}

const { title, description, variant = 'primary' } = Astro.props;
---

<section class="py-24 px-6 bg-dark-950">
  <div class="mx-auto max-w-7xl">
    <h2 class="text-4xl font-bold text-white mb-6">
      {title}
    </h2>
    {description && (
      <p class="text-xl text-light-300">{description}</p>
    )}
    
    <slot />
  </div>
</section>

<style>
  /* ✅ Scoped Styles nur wenn nötig */
  /* Bevorzuge TailwindCSS */
</style>
```

### Client-Side Interaktivität

```astro
<!-- ✅ Inline Scripts für simple Interaktionen -->
<script is:inline>
  document.addEventListener('astro:page-load', () => {
    const button = document.querySelector('#toggle');
    button?.addEventListener('click', () => {
      // Logic here
    });
  });
</script>

<!-- ✅ Für komplexe Logik: Externe Scripts -->
<script>
  import { initPricingToggle } from '../utils/pricing';
  initPricingToggle();
</script>
```

---

## 🎬 Animationen (GSAP)

### Pattern: Scroll-Triggered Fade-In

```astro
---
// In Component Frontmatter
---

<section>
  <div class="gsap-fadein">
    <!-- Content wird beim Scroll sichtbar -->
  </div>
</section>

<script>
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  gsap.registerPlugin(ScrollTrigger);

  document.addEventListener('astro:page-load', () => {
    gsap.utils.toArray('.gsap-fadein').forEach((element) => {
      gsap.from(element, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    });
  });
</script>
```

### ✅ DO: Animationen
- Subtile Fade-Ins beim Scroll
- Smooth Hover-Transitions (opacity, shadow, border)
- `transition-all duration-300` für Standard-Transitions

### ❌ DON'T: Animationen
- Keine aggressiven Rotations-Animationen
- Keine blinkenden Elemente
- Keine Auto-Play Videos ohne Kontrolle
- Respektiere `prefers-reduced-motion`

---

## 📝 Content & SEO

### Meta Tags Pattern

```astro
---
import { SEO } from 'astro-seo-schema';

const seo = {
  title: 'Silvacore - Moderne WEG-Verwaltungssoftware',
  description: 'Cloud-basierte Lösung für Hausverwaltungen. Automatisierte Workflows, rechtssichere Protokolle, mobiler Zugriff.',
  openGraph: {
    title: 'Silvacore - WEG-Software',
    description: 'Moderne Hausverwaltungssoftware für WEGs',
    image: '/products/silvacore-og.jpg',
  },
};
---

<SEO {...seo} />
```

### Sitemap & Robots

- Sitemap wird automatisch generiert (`@astrojs/sitemap`)
- `robots.txt` in `/public/`
- `llms.txt` für KI-Crawler (via `@waldheimdev/astro-ai-llms-txt`)

---

## 🧪 Testing & Quality

### Playwright Tests

```bash
# Visual Tests
pnpm test:visual

# Visual Tests mit UI
pnpm test:visual:ui

# A11y Tests
pnpm exec playwright test tests/accessibility.spec.ts

# Einzelner Test
pnpm exec playwright test tests/accessibility.spec.ts --grep="Homepage"
```

### Test-Struktur

```typescript
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Feature Tests', () => {
  test.use({ viewport: { width: 1920, height: 1080 } });

  test('Homepage A11y', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    
    expect(results.violations).toEqual([]);
  });
});
```

### Pre-Commit Checklist

- [ ] A11y-Tests laufen durch (0 Violations)
- [ ] Keine TypeScript Errors
- [ ] Keine ESLint Warnings
- [ ] Build erfolgreich (`pnpm build`)
- [ ] Design System eingehalten (Glow-Glass-Style)

---

## 📦 Dependencies & Package Management

### Wichtige Packages

```json
{
  "@astrojs/mdx": "4.3.7",
  "@astrojs/sitemap": "3.6.0",
  "@fortawesome/fontawesome-pro": "7.1.0",
  "@waldheimdev/astro-ai-llms-txt": "^1.1.3",
  "astro": "5.14.4",
  "gsap": "^3.13.0",
  "tailwindcss": "4.1.14",
  "@axe-core/playwright": "^4.11.0",
  "@playwright/test": "^1.56.1"
}
```

### Installation

```bash
# Packages installieren
pnpm install

# Package hinzufügen
pnpm add <package>

# Dev Dependency hinzufügen
pnpm add -D <package>
```

---

## 🚀 Development Workflow

### Befehle

```bash
# Dev Server starten (Port 4321)
pnpm dev
# oder
pnpm start

# Production Build
pnpm build

# Build Preview
pnpm preview

# Tests
pnpm test:visual          # Playwright Visual Tests
pnpm test:visual:ui       # Playwright UI Mode
```

### Git Workflow

1. Feature Branch erstellen: `git checkout -b feature/neue-funktion`
2. Änderungen committen: `git commit -m "feat: Neue Funktion"`
3. A11y-Tests ausführen
4. Push & Pull Request erstellen

### Commit Messages (Conventional Commits)

```bash
feat: Neue Feature hinzugefügt
fix: Bug behoben
docs: Dokumentation aktualisiert
style: Code-Formatierung (keine Logik-Änderung)
refactor: Code-Refactoring
test: Tests hinzugefügt/aktualisiert
chore: Build-Prozess, Dependencies
```

---

## 🎯 Häufige Aufgaben

### Neue Produkt-Seite erstellen

1. **Komponenten erstellen:**
   ```
   src/components/NeuesProduktFeatures.astro
   src/components/NeuesProduktPricing.astro
   src/components/NeuesProduktHero.astro
   ```

2. **Page erstellen:**
   ```astro
   ---
   // src/pages/neues-produkt/index.astro
   import Layout from '../../layouts/Layout.astro';
   import NeuesProduktHero from '../../components/NeuesProduktHero.astro';
   import NeuesProduktFeatures from '../../components/NeuesProduktFeatures.astro';
   import PriceNeuesProdukt from '../../components/PriceNeuesProdukt.astro';
   ---

   <Layout title="Neues Produkt" description="...">
     <NeuesProduktHero />
     <NeuesProduktFeatures />
     <PriceNeuesProdukt />
   </Layout>
   ```

3. **A11y-Test hinzufügen:**
   ```typescript
   // tests/accessibility.spec.ts
   test('Neues Produkt', async ({ page }) => {
     await page.goto('/neues-produkt');
     await page.waitForLoadState('networkidle');
     
     const results = await new AxeBuilder({ page })
       .withTags(['wcag2a', 'wcag2aa'])
       .analyze();
     
     expect(results.violations).toEqual([]);
   });
   ```

### Neue Komponente mit Glow-Effekt

```astro
---
interface Props {
  title: string;
  icon?: string;
  glowColor?: 'green' | 'purple' | 'primary';
}

const { title, icon, glowColor = 'primary' } = Astro.props;

const glowClasses = {
  green: 'hover:shadow-green-400/50',
  purple: 'hover:shadow-purple-500/50',
  primary: 'hover:shadow-primary-500/50',
};
---

<div class="relative group">
  <!-- Ambient Glow -->
  <div class={`absolute -inset-2 bg-gradient-to-r from-${glowColor}-500/20 
               to-${glowColor}-400/20 blur-xl opacity-0 
               group-hover:opacity-100 transition-opacity -z-10`}></div>
  
  <!-- Card Content -->
  <div class={`relative bg-dark-900/50 border border-light-500/20 
               hover:border-light-500/40 rounded-xl p-6 
               hover:shadow-lg ${glowClasses[glowColor]} transition-all`}>
    {icon && <i class={`${icon} text-3xl text-${glowColor}-400 mb-4`} aria-hidden="true"></i>}
    <h3 class="text-xl font-bold text-white">{title}</h3>
    <slot />
  </div>
</div>
```

---

## 📚 Ressourcen & Dokumentation

### Interne Docs
- **Design System:** `GLOW_DESIGN_SYSTEM.md`
- **Design Migration:** `DESIGN_MIGRATION_SUMMARY.md`
- **SEO Roadmap:** `SEO_VERBESSERUNGEN.md`
- **TODO:** `todo.md`

### Externe Docs
- [Astro Docs](https://docs.astro.build)
- [TailwindCSS v4](https://tailwindcss.com/docs)
- [GSAP Docs](https://gsap.com/docs/v3/)
- [Playwright Docs](https://playwright.dev)
- [Axe A11y Rules](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

## 🎨 Code-Style Preferences

### TypeScript
- Strikte Types bevorzugt
- Interfaces statt Types (für Props)
- Explizite Return-Types nur wenn komplex

### Astro
- Props immer mit Interface definieren
- Frontmatter klar strukturieren
- Komponenten-Namen: PascalCase
- Slot-Usage dokumentieren

### CSS/TailwindCSS
- Utility-first Approach
- Responsive: Mobile-first (`sm:`, `md:`, `lg:`)
- Dark-Mode: Ist Standard (alles auf Dark optimiert)
- Custom CSS vermeiden (außer Animations)

### JavaScript
- Moderne Syntax (ES6+)
- Optional Chaining: `element?.addEventListener()`
- Nullish Coalescing: `value ?? 'default'`
- Template Literals: `` `Hello ${name}` ``

---

## 🔒 Security & Privacy

### Sentry Integration
```javascript
// astro.config.mjs
sentry({
  dsn: 'https://...',
  sourceMapsUploadOptions: {
    project: 'waldheim-dev',
    authToken: process.env.SENTRY_AUTH_TOKEN,
  },
}),
```

### Cookie Consent
- Vanilla CookieConsent v3
- Config: `/public/cookieconsent-config.js`
- DSGVO-konform

### Environment Variables
```bash
# .env (nicht committen!)
SENTRY_AUTH_TOKEN=...
AI_API_KEY=...
```

---

## 🐛 Debugging & Troubleshooting

### Häufige Probleme

**Problem:** Build schlägt fehl mit TypeScript Error  
**Lösung:** `pnpm astro check` ausführen, Typen korrigieren

**Problem:** A11y-Test schlägt fehl (tabindex)  
**Lösung:** `tabindex="0"` auf `<div class="overflow-x-auto">`, nicht auf `<table>`

**Problem:** Gradient zu hart  
**Lösung:** Siehe `GLOW_DESIGN_SYSTEM.md` → Glow-Pattern verwenden

**Problem:** GSAP Animation läuft nicht  
**Lösung:** `astro:page-load` Event listener prüfen

**Problem:** Font Awesome Icon wird nicht angezeigt  
**Lösung:** Pro-Version in `package.json` prüfen, `.npmrc` mit Token

---

## 🎯 Qualitäts-Ziele

- ✅ **A11y:** 0 Violations (WCAG 2.1 AA)
- ✅ **Performance:** Lighthouse Score > 90
- ✅ **SEO:** Strukturierte Daten, Meta Tags, Sitemap
- ✅ **Design:** Konsistentes Glow-Glass-System
- ✅ **Code Quality:** TypeScript strict, ESLint clean
- ✅ **Responsiveness:** Mobile-first, alle Breakpoints

---

## 💡 Tipps für Copilot

1. **Immer A11y beachten:** Jede neue Komponente muss barrierefrei sein
2. **Design System einhalten:** `GLOW_DESIGN_SYSTEM.md` ist die Bibel
3. **Tests nicht vergessen:** A11y-Test für jede neue Page
4. **Mobile-First:** Immer zuerst Mobile, dann Desktop
5. **Performance:** Bilder optimieren, lazy loading, prefetch
6. **Dokumentation:** Komplexe Komponenten kommentieren
7. **Konsistenz:** Bestehende Patterns wiederverwenden
8. **Semantic HTML:** `<section>`, `<article>`, `<nav>`, etc.

---

## 🚀 Quick Start für neue Mitarbeiter

```bash
# 1. Repo klonen
git clone <repo-url>
cd waldheim.dev.homepage

# 2. Dependencies installieren
pnpm install

# 3. Dev Server starten
pnpm dev

# 4. In Browser öffnen
# http://localhost:4321

# 5. A11y-Tests ausführen
pnpm exec playwright test tests/accessibility.spec.ts

# 6. Dokumentation lesen
# - GLOW_DESIGN_SYSTEM.md
# - DESIGN_MIGRATION_SUMMARY.md
# - Diese Datei!
```

---

## 📞 Support

Bei Fragen oder Problemen:
1. **Dokumentation prüfen:** Diese Datei + `GLOW_DESIGN_SYSTEM.md`
2. **Tests ausführen:** Fehler reproduzieren
3. **Git History:** Ähnliche Changes suchen
4. **Team fragen:** Code Review anfordern

---

**Version:** 1.0.0  
**Letzte Aktualisierung:** 24. Oktober 2025  
**Maintainer:** waldheim.dev Team
