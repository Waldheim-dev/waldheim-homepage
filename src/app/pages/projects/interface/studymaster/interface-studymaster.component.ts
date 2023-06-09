import { Component, ViewEncapsulation } from '@angular/core';
import { Overview } from '../../../../shared/structur/project-details/project-details.component';

@Component({
  selector: 'app-studymaster',
  templateUrl: './interface-studymaster.component.html',
  styleUrls: ['./interface-studymaster.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InterfaceStudymasterComponent {
  overview: Overview[] = [
    {
      title: 'Arbeitgeber',
      meta: 'InterFace AG'
    },
    {
      title: 'Branche',
      meta: 'Medizin'
    },
    {
      title: 'Projektgröße',
      meta: '9 Personen'
    },
    {
      title: 'Homepage',
      meta: 'www.if.de',
      link: 'https://www.if.de'
    }
  ];

  tags: string[] = [
    'Scrum', 'CleanCode', 'Pair Programming', 'Docker', 'PostgresSQL', 'Jest', 'Cypress', 'SonarQube', 'Gitlab-CI', 'Maven', 'IntelliJ', 'JUnit', 'Java', 'Angular', 'Git', 'REST', 'Jira', 'Confluence', 'Ms Office', 'Windows'
  ];
}
