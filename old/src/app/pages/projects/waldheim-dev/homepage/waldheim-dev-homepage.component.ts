import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { Overview } from '../../../../shared/structur/project-details/project-details.component';

@Component({
  selector: 'app-homepage',
  templateUrl: './waldheim-dev-homepage.component.html',
  styleUrls: ['./waldheim-dev-homepage.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WaldheimDevHomepageComponent {

  overview: Overview[] = [
    {
      title: 'Kunde',
      meta: 'Waldheim.dev',
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
      meta: 'www.waldheim.dev',
      link: 'https://www.waldheim.dev',
    }
  ]

  tags: string[] = [
    "Docker", "Angular", "TypeScript","Material You","Gitlab-CI","Code-Security","Clean Code", "auto. Version-Control", "auto. Deployment", "SSR"
  ]
}
