import { Component } from '@angular/core';
import { Overview } from '../../../../shared/structur/project-details/project-details.component';

@Component({
  selector: 'app-mv-obermeitingen-kirchenkonzert',
  templateUrl: './mv-obermeitingen-kirchenkonzert.component.html',
  styleUrls: ['./mv-obermeitingen-kirchenkonzert.component.scss'],
})
export class MvObermeitingenKirchenkonzertComponent {

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
    "Vektoren", "Affinity Designer", "Print-Design"
  ]
}
