import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexModule } from '@angular/flex-layout';
import { SharedModule } from '../../shared/shared.module';

import { ProjectRoutingModule } from './project-routing.module';
import { SewobeOnlinesoftwareComponent } from './sewobe/onlinesoftware/sewobe-onlinesoftware.component';
import { SewobeRedesignComponent } from './sewobe/redesign/sewobe-redesign.component';
import { SewobeHomepageComponent } from './sewobe/homepage/sewobe-homepage.component';
import { WaldheimDevEcodriveComponent } from './waldheim-dev/ecodrive/waldheim-dev-ecodrive.component';
import { InterfaceStudymasterComponent } from './interface/studymaster/interface-studymaster.component';
import { WaldheimItHomepageComponent } from './waldheim-it/homepage/waldheim-it-homepage.component';
import { ProjectsComponent } from './projects.component';

@NgModule({
  declarations: [
    SewobeOnlinesoftwareComponent,
    SewobeRedesignComponent,
    SewobeHomepageComponent,
    WaldheimItHomepageComponent,
    WaldheimItHomepageComponent,
    WaldheimDevEcodriveComponent,
    InterfaceStudymasterComponent,
    ProjectsComponent,
  ],
  imports: [ProjectRoutingModule, SharedModule],
})
export class ProjectModule {}
