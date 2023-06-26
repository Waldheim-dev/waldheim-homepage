import { Component, OnInit } from '@angular/core';
import { Overview } from '../../../../shared/structur/project-details/project-details.component';

@Component({
  selector: 'app-ausgabeschein',
  templateUrl: './waldheim-dev-ausgabeschein.component.html',
  styleUrls: ['./waldheim-dev-ausgabeschein.component.scss'],
})
export class WaldheimDevAusgabescheinComponent {

  overview: Overview[] = [
    {
      title: 'Kunde',
      meta: 'Waldheim.dev',
    },
    {
      title: 'Branche',
      meta: 'IT-Dienstleister',
    },
    { title: 'OpenSource',
      meta: 'Ja',
    },
    {
      title: 'Git',
      meta: 'Ausgabeschein',
      link: 'https://gitlab.com/mwaldheim/ausgabeschein-generator',
    },
    {
      title: 'Projektgröße',
      meta: '1. Person',
    },
    {
      title: 'Homepage',
      meta: 'www.waldheim.dev',
      link: 'https://www.waldheim.dev',
    }
  ]

  tags: string[] = [
    "Docker", "Angular", "TypeScript","Material Design", "Netbox", "Gitlab-CI", "Code-Security", "Clean Code", "auto. Version-Control", "Cypress","Jira"
  ]
}
