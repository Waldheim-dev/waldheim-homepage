import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { ProjectRoutingModule } from './project-routing.module';
import { SewobeOnlinesoftwareComponent } from './sewobe/onlinesoftware/sewobe-onlinesoftware.component';
import { SewobeRedesignComponent } from './sewobe/redesign/sewobe-redesign.component';
import { SewobeHomepageComponent } from './sewobe/homepage/sewobe-homepage.component';
import { WaldheimDevEcodriveComponent } from './waldheim-dev/ecodrive/waldheim-dev-ecodrive.component';
import { InterfaceStudymasterComponent } from './interface/studymaster/interface-studymaster.component';
import { WaldheimItHomepageComponent } from './waldheim-it/homepage/waldheim-it-homepage.component';
import { ProjectsComponent } from './projects.component';
import { WaldheimDevHomepageComponent } from './waldheim-dev/homepage/waldheim-dev-homepage.component';
import { WaldheimDevAusgabescheinComponent } from './waldheim-dev/ausgabeschein/waldheim-dev-ausgabeschein.component';
import { MvObermeitingenInKonzertComponent } from './mv-obermeitingen/in-konzert/mv-obermeitingen-in-konzert.component';
import { MvObermeitingenHomepageComponent } from './mv-obermeitingen/homepage/mv-obermeitingen-homepage.component';

@NgModule({
  declarations: [
    SewobeOnlinesoftwareComponent,
    SewobeRedesignComponent,
    SewobeHomepageComponent,
    WaldheimItHomepageComponent,
    WaldheimDevHomepageComponent,
    WaldheimDevEcodriveComponent,
    InterfaceStudymasterComponent,
    ProjectsComponent,
    WaldheimDevAusgabescheinComponent,
    MvObermeitingenInKonzertComponent,
    MvObermeitingenHomepageComponent,
  ],
  imports: [ProjectRoutingModule, SharedModule],
})
export class ProjectModule {}
