export interface Service {
  key: string;
  title: string;
  href: string;
  icon: string;
  description: string;
  color: 'purple' | 'blue' | 'green' | 'orange' | 'pink';
}

export const SERVICES: Service[] = [
  {
    key: 'devsecops',
    title: 'Effiziente Entwicklung / DevSecOps',
    href: '/services/devsecops/',
    icon: 'fa-solid fa-rotate',
    description: 'Optimierung Ihrer Entwicklungsprozesse durch CI/CD, Containerisierung und integrierte Sicherheit.',
    color: 'purple'
  },
  {
    key: 'entwicklung',
    title: 'Softwareentwicklung',
    href: '/services/entwicklung/',
    icon: 'fa-solid fa-code',
    description: 'Individuelle Webseiten, Plugins und maßgeschneiderte Softwarelösungen für Ihre Anforderungen.',
    color: 'blue'
  },
  {
    key: 'design',
    title: 'Design / UX',
    href: '/services/design/',
    icon: 'fa-solid fa-palette',
    description: 'Kreatives Webdesign, Branding und UX/UI-Design für digitale Produkte und Printmedien.',
    color: 'pink'
  },
  {
    key: 'it-service',
    title: 'IT-Service',
    href: '/services/it-service/',
    icon: 'fa-solid fa-desktop',
    description: 'Zuverlässiger IT-Support, Netzwerktechnik und Systemadministration für Ihr Unternehmen.',
    color: 'green'
  },
  {
    key: 'smarthome',
    title: 'Smarthome',
    href: '/services/smarthome/',
    icon: 'fa-solid fa-house',
    description: 'Unabhängige Beratung und Planung für Ihr intelligentes, sicheres Zuhause ohne Herstellerbindung.',
    color: 'orange'
  }
];
