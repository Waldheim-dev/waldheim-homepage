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

const routes: Routes = [
  {path:'', component: ProjectsComponent, children: [
    {path: 'waldheim-dev', children: [
        {path: 'homepage', component: WaldheimDevHomepageComponent},
        {path: 'ecodrive', component: WaldheimDevEcodriveComponent},
      ]
    },
    {path: 'waldheim-it', children: [
        {path: 'homepage', component: WaldheimItHomepageComponent},
      ]
    },
    // {path: 'interface', children: [
    //     {path: 'studymaster', component: InterfaceStudymasterComponent},
    //   ]
    // },
    // {path: 'sewobe', children: [
    //     {path: 'homepage', component: SewobeHomepageComponent},
    //     {path: 'design', component: SewobeRedesignComponent},
    //     {path: 'software', component: SewobeOnlinesoftwareComponent},
    //   ]
    // },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
