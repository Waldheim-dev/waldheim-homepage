import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NavComponent } from './structur/nav/nav.component';
import { TagComponent } from './structur/tag/tag.component';
import { CloudcardComponent } from './structur/cloudcard/cloudcard.component';
import { CardComponent } from './structur/card/card.component';
import { BrandsComponent } from './structur/brands/brands.component';
import { EcodrivePreviewComponent } from './structur/ecodrive-preview/ecodrive-preview.component';
import { MenuComponent } from './structur/menu/menu.component';
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    NavComponent,
    TagComponent,
    CloudcardComponent,
    CardComponent,
    BrandsComponent,
    EcodrivePreviewComponent,
    MenuComponent,
  ],
  imports: [CommonModule, FlexLayoutModule, RouterModule],
  exports: [
    NavComponent,
    TagComponent,
    CloudcardComponent,
    CardComponent,
    BrandsComponent,
    EcodrivePreviewComponent,
    MenuComponent,
    FlexLayoutModule,
    RouterModule
  ],
})
export class SharedModule {}
