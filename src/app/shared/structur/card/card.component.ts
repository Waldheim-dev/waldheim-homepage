import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, ElementRef, HostBinding, Input, OnInit, ViewEncapsulation } from '@angular/core';

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
  styleUrls: ['./card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CardComponent implements OnInit {

  @Input()
  @HostBinding('class.is-elevation')
  get elevation(): boolean {
    return this._elevation;
  }

  set elevation(value: BooleanInput) {
    this._elevation = coerceBooleanProperty(value);
  }

  private _elevation: boolean = false;


  constructor(public _elementRef: ElementRef) {
    for (const attr of COLORS) {
      if (this._hasHostAttributes(attr)) {
        (this._getHostElement() as HTMLElement).classList.add(attr);
      }
    }
    if (this._elevation) {
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
