import {Component, EventEmitter, Output, ViewEncapsulation} from '@angular/core';
import pack from "../../../../../package.json";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class MenuComponent {
  version = '0.0.0';
  isMenuOpen = false;
  isDarkTheme = false;

  @Output() isMenuEvent = new EventEmitter<boolean>(false);
  @Output() isDarkEvent = new EventEmitter<boolean>(false);

  constructor() {
    this.version = pack.version;
    // is isDarkTheme is undefined in local Storage, get it from Browser
    if (localStorage.getItem('isDarkTheme') === null) {
      this.isDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    } else {
      // load isDarkTheme from local storage
      this.isDarkTheme = localStorage.getItem('isDarkTheme') === 'true';
    }

    // set a flag :root for css
    document.documentElement.setAttribute('data-theme', this.isDarkTheme ? 'dark' : 'light');
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    this.isMenuEvent.emit(this.isMenuOpen);
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    // set to local storage
    localStorage.setItem('isDarkTheme', this.isDarkTheme.toString());
    // set a flag :root for css
    document.documentElement.setAttribute('data-theme', this.isDarkTheme ? 'dark' : 'light');
    this.isDarkEvent.emit(this.isDarkTheme);
  }
}
