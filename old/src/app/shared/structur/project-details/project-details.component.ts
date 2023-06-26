import { Component, Input } from '@angular/core';

export interface Overview {
  title: string;
  meta: string;
  link?: string;
}

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
})
export class ProjectDetailsComponent {
  @Input() overview: Overview[] = [];
  @Input() tags: string[] = [];
}
