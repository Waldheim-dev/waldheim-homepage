import {Component, EventEmitter, Output, ViewEncapsulation} from '@angular/core';
import pack from "../../../../../../../package.json";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class MenuComponent {
  version = '0.0.0';
  isMenuOpen = false;

  @Output() isMenuEvent = new EventEmitter<boolean>(false);

  constructor() {
    this.version = pack.version;
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    this.isMenuEvent.emit(this.isMenuOpen);
  }
}
