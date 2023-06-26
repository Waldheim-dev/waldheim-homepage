import { Component, OnInit } from '@angular/core';
import {MvObermeitingenInKonzertComponent} from "../in-konzert/mv-obermeitingen-in-konzert.component";
import { Overview } from '../../../../shared/structur/project-details/project-details.component';

@Component({
  selector: 'app-homepage',
  templateUrl: './mv-obermeitingen-homepage.component.html',
  styleUrls: ['./mv-obermeitingen-homepage.component.scss'],
})
export class MvObermeitingenHomepageComponent {

  overview: Overview[] = [
    {
      title: 'Kunde',
      meta: 'Musikverein Obermeitingen e.V.',
    },
    {
      title: 'Branche',
      meta: 'Verein',
    },
    {
      title: 'Projektgröße',
      meta: '1. Person',
    },
    {
      title: 'Homepage',
      meta: 'www.mv-obermeitingen.de',
      link: 'https://www.mv-obermeitingen.de',
    }
  ]

  tags: string[] = [
    "HTML", "CSS", "JS", "Angular", "Web-Components", "Gitlab-CI","Code-Security", "SEO", "Webdesign", "Webentwicklung"
  ]
}
