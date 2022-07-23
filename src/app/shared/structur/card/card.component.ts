import { Component, ElementRef, Input, OnInit } from '@angular/core';

const COLORS = [
  'primary',
  'secondary',
  'tertiary',
  'error',
  'surface',
  'inverse-surface'
];

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  readonly elevation: boolean = this._hasHostAttributes('elevation');

  constructor(public _elementRef: ElementRef) {
    for (const attr of COLORS) {
      if (this._hasHostAttributes(attr)) {
        (this._getHostElement() as HTMLElement).classList.add(attr);
      }
    }
    if (this.elevation) {
      (this._getHostElement() as HTMLElement).classList.add('is-elevation');
    }
  }

  ngOnInit(): void {
  }

  _getHostElement() {
    return this._elementRef.nativeElement;
  }
  _hasHostAttributes(...attributes: string[]) {
    return attributes.some(attribute => this._getHostElement().hasAttribute(attribute));
  }
}
