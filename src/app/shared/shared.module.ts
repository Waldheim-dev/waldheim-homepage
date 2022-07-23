import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NavComponent } from './structur/nav/nav.component';
import { TagComponent } from './structur/tag/tag.component';
import { CloudcardComponent } from './structur/cloudcard/cloudcard.component';
import { CardComponent } from './structur/card/card.component';



@NgModule({
  declarations: [
    NavComponent,
    TagComponent,
    CloudcardComponent,
    CardComponent
  ],
    imports: [
        CommonModule,
        FlexLayoutModule
    ],
  exports: [
    NavComponent,
    TagComponent,
    CloudcardComponent,
    CardComponent
  ]
})
export class SharedModule { }
