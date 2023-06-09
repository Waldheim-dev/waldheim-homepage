import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { Overview } from '../../../../shared/structur/project-details/project-details.component';

@Component({
  selector: 'app-homepage',
  templateUrl: './waldheim-it-homepage.component.html',
  styleUrls: ['./waldheim-it-homepage.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WaldheimItHomepageComponent {
  overview: Overview[] = [
  {
    title: 'Kunde',
    meta: 'Waldheim-it.de',
  },
  {
    title: 'Branche',
    meta: 'IT-Dienstleister',
  },
  { title: 'Projektgröße',
    meta: '1 Person',
  },
  {
    title: 'Homepage',
    meta: 'www.waldheim-it.de',
    link: 'https://www.waldheim-it.de',
  }
  ]

  tags: string[] = [
    "HTML","CSS",'JS',"Material You","Gitlab-CI","TypeScript","Code-Security"
  ]
}
