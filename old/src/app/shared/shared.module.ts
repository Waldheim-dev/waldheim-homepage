import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NavComponent } from './structur/nav/nav.component';
import { TagComponent } from './structur/tag/tag.component';
import { CloudcardComponent } from './structur/cloudcard/cloudcard.component';
import { CardComponent } from './structur/card/card.component';
import { BrandsComponent } from './structur/brands/brands.component';
import { EcodrivePreviewComponent } from './structur/ecodrive-preview/ecodrive-preview.component';
import { MenuComponent } from './structur/menu/menu.component';
import { RouterModule } from '@angular/router';
import { LocalStorageService } from './services/local-storage.service';
import { WindowRef } from './services/window-ref.service';
import { MediaService } from './services/media.service';
import { ProjectDetailsComponent } from './structur/project-details/project-details.component';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';
import { HttpClient, HttpClientModule } from '@angular/common/http';

const COMP_IMPORT_EXPORT = [
  NavComponent,
  TagComponent,
  CloudcardComponent,
  CardComponent,
  BrandsComponent,
  EcodrivePreviewComponent,
  MenuComponent,
  ProjectDetailsComponent,
];
const COMP_IMPORT_ONLY: never[] = [];
const MOD_IMPORT_EXPORT = [RouterModule, NgOptimizedImage];
const MOD_IMPORT_ONLY = [CommonModule,HttpClientModule,
  MarkdownModule.forRoot({
    loader: HttpClient, // optional, only if you use [src] attribute
    markedOptions: {
      provide: MarkedOptions,
      useValue: {
        gfm: true,
        breaks: false,
        pedantic: false,
        smartLists: true,
        smartypants: false,
      },
    },
  }),];
const MOD_EXPORT_ONLY = [
  MarkdownModule];

@NgModule({
  declarations: [
    ...COMP_IMPORT_EXPORT,
    ...COMP_IMPORT_ONLY,
  ],
  imports: [...MOD_IMPORT_ONLY, ...MOD_IMPORT_EXPORT],
  exports: [...MOD_IMPORT_EXPORT, ...COMP_IMPORT_EXPORT, ...MOD_EXPORT_ONLY],
  providers: [
    MediaService,
    WindowRef,
    LocalStorageService,
    { provide: 'LOCALSTORAGE', useFactory: getLocalStorage },
  ],
})
export class SharedModule {}

export function getLocalStorage() {
  return typeof window !== 'undefined' ? window.localStorage : null;
}
