import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NavComponent } from './structur/nav/nav.component';
import { TagComponent } from './structur/tag/tag.component';
import { CloudcardComponent } from './structur/cloudcard/cloudcard.component';
import { CardComponent } from './structur/card/card.component';
import { BrandsComponent } from './structur/brands/brands.component';
import { EcodrivePreviewComponent } from './structur/ecodrive-preview/ecodrive-preview.component';
import { MenuComponent } from './structur/menu/menu.component';
import {RouterModule} from "@angular/router";
import { LocalStorageService } from './services/local-storage.service';
import { WindowRef } from './services/window-ref.service';
import { MediaService } from './services/media.service';

const COMP_IMPORT_EXPORT = [
  NavComponent,
  TagComponent,
  CloudcardComponent,
  CardComponent,
  BrandsComponent,
  EcodrivePreviewComponent,
  MenuComponent,
];
const COMP_IMPORT_ONLY: never[] = [

];
const MOD_IMPORT_EXPORT = [
  FlexLayoutModule,
  RouterModule,
  NgOptimizedImage
];
const MOD_IMPORT_ONLY = [
  CommonModule
];

@NgModule({
  declarations: [
    ...COMP_IMPORT_EXPORT,
    ...COMP_IMPORT_ONLY
  ],
    imports: [
        ...MOD_IMPORT_ONLY,
        ...MOD_IMPORT_EXPORT,
    ],
  exports: [
    ...MOD_IMPORT_EXPORT,
    ...COMP_IMPORT_EXPORT
  ],
  providers: [
    MediaService,
    WindowRef,
    LocalStorageService,
    { provide: 'LOCALSTORAGE', useFactory: getLocalStorage }
  ]
})
export class SharedModule {}

export function getLocalStorage() {
  return (typeof window !== 'undefined') ? window.localStorage : null;
}