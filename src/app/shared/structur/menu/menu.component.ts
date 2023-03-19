import { Component, EventEmitter, Inject, InjectionToken, Output, ViewEncapsulation } from '@angular/core';
import pack from "../../../../../package.json";
import { LocalStorageService } from '../../services/local-storage.service';
import { DOCUMENT } from '@angular/common';
import { WindowRef } from '../../services/window-ref.service';

export const LOCAL_STORAGE = new InjectionToken<Storage>('LOCAL_STORAGE');

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  providers: [
    { provide: LOCAL_STORAGE, useValue: typeof window !== 'undefined' ? window.localStorage : null }
  ]
})
export class MenuComponent {
  version = '0.0.0';
  isMenuOpen = false;
  isDarkTheme = false;

  @Output() isMenuEvent = new EventEmitter<boolean>(false);
  @Output() isDarkEvent = new EventEmitter<boolean>(false);

  constructor(
    private localStorageService: LocalStorageService,
    @Inject(DOCUMENT) private document: Document,
    private windowRef: WindowRef
  ) {
    this.version = pack.version;
    // is isDarkTheme is undefined in local Storage, get it from Browser
    if (this.localStorageService.getItem('isDarkTheme') === null) {
      this.isDarkTheme = this.windowRef.nativeWindow?.matchMedia('(prefers-color-scheme: dark)').matches ?? false;
    } else {
      // load isDarkTheme from local storage
      this.isDarkTheme = this.localStorageService.getItem('isDarkTheme') === 'true';
    }

    // set a flag :root for css
    this.document.documentElement.setAttribute('data-theme', this.isDarkTheme ? 'dark' : 'light');
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    this.isMenuEvent.emit(this.isMenuOpen);
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    // set to local storage
    this.localStorageService.setItem('isDarkTheme', this.isDarkTheme.toString());
    // set a flag :root for css
    this.document.documentElement.setAttribute('data-theme', this.isDarkTheme ? 'dark' : 'light');
    this.isDarkEvent.emit(this.isDarkTheme);
  }
}