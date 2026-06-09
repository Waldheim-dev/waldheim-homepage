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
    key: 'entwicklung',
    title: 'Custom Software',
    href: '/services/entwicklung/',
    icon: 'fa-solid fa-code',
    description: 'Maßgeschneiderte Software als fertiges Produkt – von der Web-App bis zur Enterprise-Plattform. Zukunftssicher, skalierbar, ganz auf Ihre Prozesse zugeschnitten.',
    color: 'blue'
  },
  {
    key: 'devsecops',
    title: 'DevSecOps & Cloud',
    href: '/services/devsecops/',
    icon: 'fa-solid fa-shield-halved',
    description: 'Sichere CI/CD-Pipelines, Kubernetes-Cluster, GitOps und Cloud-Infrastruktur für schnellere und zuverlässigere Software-Releases.',
    color: 'purple'
  },
  {
    key: 'it-service',
    title: 'IT-Service & Infrastruktur',
    href: '/services/it-service/',
    icon: 'fa-solid fa-desktop',
    description: 'Custom PCs & Workstations, Unifi-Netzwerke, NAS, Backup, Microsoft 365 und On-Premise-Dienste – komplett aus einer Hand für Windows, macOS & Linux.',
    color: 'green'
  },
  {
    key: 'smarthome',
    title: 'Smart Home & KNX',
    href: '/services/smarthome/',
    icon: 'fa-solid fa-house',
    description: 'KNX-Gebäudeautomation, intelligente Aktoren (Rollo, Heizung, Licht), AI-Kameras und vollständige Haussteuerung – Profitechnik für anspruchsvolle Gebäude.',
    color: 'orange'
  }
];
