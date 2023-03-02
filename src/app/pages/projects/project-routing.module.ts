import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InterfaceStudymasterComponent } from './interface/studymaster/interface-studymaster.component';
import { ProjectsComponent } from './projects.component';
import { SewobeHomepageComponent } from './sewobe/homepage/sewobe-homepage.component';
import { SewobeOnlinesoftwareComponent } from './sewobe/onlinesoftware/sewobe-onlinesoftware.component';
import { SewobeRedesignComponent } from './sewobe/redesign/sewobe-redesign.component';
import { WaldheimDevEcodriveComponent } from './waldheim-dev/ecodrive/waldheim-dev-ecodrive.component';
import { WaldheimDevHomepageComponent } from './waldheim-dev/homepage/waldheim-dev-homepage.component';
import { WaldheimItHomepageComponent } from './waldheim-it/homepage/waldheim-it-homepage.component';
import { WaldheimDevAusgabescheinComponent } from "./waldheim-dev/ausgabeschein/waldheim-dev-ausgabeschein.component";
import { MvObermeitingenInKonzertComponent } from "./mv-obermeitingen/in-konzert/mv-obermeitingen-in-konzert.component";
import { MvObermeitingenHomepageComponent } from "./mv-obermeitingen/homepage/mv-obermeitingen-homepage.component";
import {
  MvObermeitingenFaschingComponent
} from "./mv-obermeitingen/mv-obermeitingen-fasching/mv-obermeitingen-fasching.component";

const routes: Routes = [
  {path:'', component: ProjectsComponent, children: [
    {path: 'waldheim-dev', children: [
        {path: 'homepage', component: WaldheimDevHomepageComponent},
        {path: 'ecodrive', component: WaldheimDevEcodriveComponent},
        {path: 'ausgabeschein', component: WaldheimDevAusgabescheinComponent},
      ]
    },
    {path: 'waldheim-it', children: [
        {path: 'homepage', component: WaldheimItHomepageComponent},
      ]
    },
    {path: 'mv-obermeitingen', children: [
        {path: 'homepage', component: MvObermeitingenHomepageComponent},
        {path: 'in-konzert', component: MvObermeitingenInKonzertComponent},
        {path: 'fasching', component: MvObermeitingenFaschingComponent},
      ]
    },
    {path: 'interface', children: [
        {path: 'studymaster', component: InterfaceStudymasterComponent},
      ]
    },
    {path: 'sewobe', children: [
        {path: 'homepage', component: SewobeHomepageComponent},
        {path: 'design', component: SewobeRedesignComponent},
        {path: 'software', component: SewobeOnlinesoftwareComponent},
      ]
    },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
