import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { Overview } from '../../../../shared/structur/project-details/project-details.component';

@Component({
  selector: 'app-ecodrive',
  templateUrl: './waldheim-dev-ecodrive.component.html',
  styleUrls: ['./waldheim-dev-ecodrive.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WaldheimDevEcodriveComponent {

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
      meta: '2 Personen',
    },
    {
      title: 'Homepage',
      meta: 'www.eco-drive.app',
      link: 'https://www.eco-drive.app',
    }
  ]

  tags: string[] = [
    "Docker", "Angular", "TypeScript","Material You","Gitlab-CI","Code-Security","Clean Code", "auto. Version-Control", "auto. Deployment", "Jest", "C#", "Cypress", "REST", "Jira", "Stripe", "Apexcharts", "Firebase-Auth"
  ]
}
