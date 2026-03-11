/**
 * Zentrale Produktfarben-Konfiguration und Versionsverwaltung
 * Basierend auf den Farben der jeweiligen Produktseiten
 */

export interface ProductColors {
  name: string;
  primary: string;
  secondary: string;
  glowColor: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  iconColor: string;
  hoverShadow: string;
}

export interface ProductInfo {
  name: string;
  version: string;
  status?: 'stable' | 'beta' | 'alpha' | 'closed-alpha';
  releaseDate?: string;
  colors: ProductColors;
}

// Zentrale Produktinformationen mit Versionen
export const PRODUCTS: Record<string, ProductInfo> = {
  ecodrive: {
    name: 'Ecodrive',
    version: '1.2.0',
    status: 'stable',
    releaseDate: '2025-Q3',
    colors: {
      name: 'Ecodrive',
      primary: 'green-400',
      secondary: 'emerald-500',
      glowColor: 'green-400/50',
      badgeBg: 'bg-green-500/10',
      badgeBorder: 'border-green-500/30',
      badgeText: 'text-green-400',
      iconColor: 'green-400',
      hoverShadow: 'hover:shadow-lg hover:shadow-green-400/20',
    },
  },
  socialverse: {
    name: 'Socialverse',
    version: '0.9.0',
    status: 'closed-alpha',
    releaseDate: '2026-Q1',
    colors: {
      name: 'Socialverse',
      primary: 'purple-500',
      secondary: 'pink-500',
      glowColor: 'purple-500/50',
      badgeBg: 'bg-purple-500/10',
      badgeBorder: 'border-purple-500/30',
      badgeText: 'text-purple-400',
      iconColor: 'purple-400',
      hoverShadow: 'hover:shadow-lg hover:shadow-purple-500/20',
    },
  },
  silvacore: {
    name: 'Silvacore',
    version: '0.1.0',
    status: 'closed-alpha',
    releaseDate: '2025-10-24',
    colors: {
      name: 'Silvacore',
      primary: 'green-400',
      secondary: 'emerald-500',
      glowColor: 'green-400/50',
      badgeBg: 'bg-green-500/10',
      badgeBorder: 'border-green-500/30',
      badgeText: 'text-green-400',
      iconColor: 'green-400',
      hoverShadow: 'hover:shadow-lg hover:shadow-green-400/20',
    },
  },
  aether: {
    name: 'Aether',
    version: '1.0.0',
    status: 'stable',
    releaseDate: '2025-12-15',
    colors: {
      name: 'Aether',
      primary: 'red-500',
      secondary: 'rose-600',
      glowColor: 'red-500/50',
      badgeBg: 'bg-red-500/10',
      badgeBorder: 'border-red-500/30',
      badgeText: 'text-red-400',
      iconColor: 'red-400',
      hoverShadow: 'hover:shadow-lg hover:shadow-red-500/20',
    },
  },
  'ausgabeschein-generator': {
    name: 'Ausgabeschein Generator',
    version: '2.16.2',
    status: 'stable',
    releaseDate: '2025-09-09',
    colors: {
      name: 'Ausgabeschein Generator',
      primary: 'primary-500',
      secondary: 'primary-600',
      glowColor: 'primary-500/50',
      badgeBg: 'bg-primary-500/10',
      badgeBorder: 'border-primary-500/30',
      badgeText: 'text-primary-400',
      iconColor: 'primary-400',
      hoverShadow: 'hover:shadow-lg hover:shadow-primary-500/20',
    },
  },
  'astro-ai-llms-txt': {
    name: 'Astro AI llms.txt Generator',
    version: '1.2.3',
    status: 'stable',
    releaseDate: '2026-02-18',
    colors: {
      name: 'Astro AI llms.txt Generator',
      primary: 'primary-500',
      secondary: 'primary-600',
      glowColor: 'primary-500/50',
      badgeBg: 'bg-primary-500/10',
      badgeBorder: 'border-primary-500/30',
      badgeText: 'text-primary-400',
      iconColor: 'primary-400',
      hoverShadow: 'hover:shadow-lg hover:shadow-primary-500/20',
    },
  },
  waetherapp: {
    name: 'WetterApp',
    version: '1.0.0',
    status: 'stable',
    releaseDate: '2026-01-20',
    colors: {
      name: 'WetterApp',
      primary: 'blue-400',
      secondary: 'cyan-400',
      glowColor: 'blue-400/50',
      badgeBg: 'bg-blue-500/10',
      badgeBorder: 'border-blue-500/30',
      badgeText: 'text-blue-400',
      iconColor: 'blue-400',
      hoverShadow: 'hover:shadow-lg hover:shadow-blue-400/20',
    },
  },
  'obsidian-gemini-agent': {
    name: 'Obsidian Gemini Agent',
    version: '1.0.0',
    status: 'stable',
    releaseDate: '2026-03-11',
    colors: {
      name: 'Obsidian Gemini Agent',
      primary: 'indigo-400',
      secondary: 'violet-500',
      glowColor: 'indigo-400/50',
      badgeBg: 'bg-indigo-500/10',
      badgeBorder: 'border-indigo-500/30',
      badgeText: 'text-indigo-400',
      iconColor: 'indigo-400',
      hoverShadow: 'hover:shadow-lg hover:shadow-indigo-400/20',
    },
  },
};

// Rückwärtskompatibilität: Nur Farben
export const PRODUCT_COLORS: Record<string, ProductColors> = Object.fromEntries(
  Object.entries(PRODUCTS).map(([key, product]) => [key, product.colors])
);

// Service-spezifische Farben basierend auf den Service-Seiten
export const SERVICE_COLORS: Record<string, ProductColors> = {
  devsecops: {
    name: 'DevSecOps',
    primary: 'purple-400',
    secondary: 'pink-400',
    glowColor: 'purple-500/50',
    badgeBg: 'bg-purple-500/10',
    badgeBorder: 'border-purple-500/30',
    badgeText: 'text-purple-400',
    iconColor: 'purple-400',
    hoverShadow: 'hover:shadow-lg hover:shadow-purple-500/20',
  },
  entwicklung: {
    name: 'Softwareentwicklung',
    primary: 'blue-400',
    secondary: 'cyan-500',
    glowColor: 'blue-500/50',
    badgeBg: 'bg-blue-500/10',
    badgeBorder: 'border-blue-500/30',
    badgeText: 'text-blue-400',
    iconColor: 'blue-400',
    hoverShadow: 'hover:shadow-lg hover:shadow-blue-500/20',
  },
  design: {
    name: 'Design / UX',
    primary: 'pink-400',
    secondary: 'rose-500',
    glowColor: 'pink-500/50',
    badgeBg: 'bg-pink-500/10',
    badgeBorder: 'border-pink-500/30',
    badgeText: 'text-pink-400',
    iconColor: 'pink-400',
    hoverShadow: 'hover:shadow-lg hover:shadow-pink-500/20',
  },
  'it-service': {
    name: 'IT-Service',
    primary: 'green-400',
    secondary: 'emerald-500',
    glowColor: 'green-500/50',
    badgeBg: 'bg-green-500/10',
    badgeBorder: 'border-green-500/30',
    badgeText: 'text-green-400',
    iconColor: 'green-400',
    hoverShadow: 'hover:shadow-lg hover:shadow-green-500/20',
  },
  smarthome: {
    name: 'Smarthome',
    primary: 'orange-400',
    secondary: 'red-500',
    glowColor: 'orange-500/50',
    badgeBg: 'bg-orange-500/10',
    badgeBorder: 'border-orange-500/30',
    badgeText: 'text-orange-400',
    iconColor: 'orange-400',
    hoverShadow: 'hover:shadow-lg hover:shadow-orange-500/20',
  },
};

/**
 * Hilfsfunktion um Produktinformationen zu bekommen
 */
export function getProductInfo(productKey: string): ProductInfo | undefined {
  return PRODUCTS[productKey];
}

/**
 * Hilfsfunktion um Produktfarben zu bekommen (Rückwärtskompatibilität)
 */
export function getProductColors(productKey: string): ProductColors {
  return PRODUCTS[productKey]?.colors || SERVICE_COLORS['entwicklung']; // Fallback auf Entwicklung
}

/**
 * Hilfsfunktion um Service-Farben zu bekommen
 */
export function getServiceColors(serviceKey: string): ProductColors {
  return SERVICE_COLORS[serviceKey] || SERVICE_COLORS['entwicklung']; // Fallback auf Entwicklung
}
