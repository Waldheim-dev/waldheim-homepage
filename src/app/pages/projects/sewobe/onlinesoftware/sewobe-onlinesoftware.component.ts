import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { Overview } from '../../../../shared/structur/project-details/project-details.component';

@Component({
  selector: 'app-onlinesoftware',
  templateUrl: './sewobe-onlinesoftware.component.html',
  styleUrls: ['./sewobe-onlinesoftware.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SewobeOnlinesoftwareComponent {
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
    },
  ];

  tags: string[] = [
    'Docker', 'WordPress', 'TYPO3', 'PHP', 'WordPress-Plugins', 'Own Theme', 'Git', 'Cypress', 'REST', 'PhpStorm', 'TypeScript', 'Code-Security', 'mySQL', 'SCSS'
  ];
}
