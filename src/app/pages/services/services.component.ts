import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class ServicesComponent implements OnInit {
  constructor(private meta: Meta, private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Microservices- und Frontend-Entwicklung | Waldheim.dev');
    this.meta.addTags([
      { name: 'author', content: 'Waldheim.dev' },
      { name: 'description', content: 'Waldheim.dev bietet professionelle Microservices- und Frontend-Entwicklung für kleine und mittelständische Unternehmen in der Umgebung an. Entdecken Sie unsere Expertise und machen Sie Ihr Unternehmen erfolgreich.' },
      { name: 'keywords', content: 'Microservices, Design, Automatisierung, Systemadministration' }
    ]);
  }
}
