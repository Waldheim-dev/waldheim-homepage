import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private meta: Meta, private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Waldheim.dev | Microservices, Design, Automatisierung, Systemadministration');
    this.meta.addTags([
      { name: 'author', content: 'Waldheim.dev' },
      { name: 'description', content: 'Waldheim.dev bietet professionelle Dienstleistungen in den Bereichen Microservices- und Frontend-Entwicklung, Design, Automatisierung und Systemadministration an. Entdecken Sie unsere Expertise und machen Sie Ihr Unternehmen erfolgreich.' },
      { name: 'keywords', content: 'Microservices, Design, Automatisierung, Systemadministration' }
    ]);
  }

}
