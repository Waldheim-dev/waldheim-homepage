import { Component } from '@angular/core';
import  pack  from '../../../../package.json';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  version = '0.0.0';

  constructor() {
    this.version = pack.version;
  }
}
