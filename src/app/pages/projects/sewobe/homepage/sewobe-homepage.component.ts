import { Component, ViewEncapsulation } from '@angular/core';
import { Overview } from '../../../../shared/structur/project-details/project-details.component';

@Component({
  selector: 'app-homepage',
  templateUrl: './sewobe-homepage.component.html',
  styleUrls: ['./sewobe-homepage.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SewobeHomepageComponent {
  overview: Overview[] = [
    {
      title: 'Arbeitgeber',
      meta: 'SEWOBE AG (2015 - 2022)'
    },
    {
      title: 'Branche',
      meta: 'Verwaltung'
    },
    {
      title: 'Projektgröße',
      meta: '24 Personen (+ Ausbildung & Ausbilden)'
    },
    {
      title: 'Homepage',
      meta: 'www.sewobe.de',
      link: 'https://www.sewobe.de'
    },
    {
      title: 'Status',
      meta: 'Ehemaliger Arbeitgeber'
    }
  ];

  tags: string[] = [
    'Docker', 'Angular', 'PHP', 'OAuth2', 'Own Theme', 'Git', 'Cypress', 'Jest', 'REST', 'PhpStorm', 'TypeScript', 'Code-Security', 'mySQL', 'SCSS', 'SonarQube', 'OOP', 'Apexcharts', 'Twig', 'Android', 'iOS', 'HTML', 'CSS', 'Fastlane', 'Capacitor', 'Python'
  ];
}
