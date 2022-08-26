import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import {PrivacyComponent} from "./pages/privacy/privacy.component";
import {ImprintComponent} from "./pages/imprint/imprint.component";
import {ServicesComponent} from "./pages/services/services.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'privacy', redirectTo: 'datenschutz', pathMatch: "full"},
  {path: 'imprint', redirectTo: 'impressum', pathMatch: "full"},
  {path: 'services', redirectTo: 'service', pathMatch: "full"},
  {path: 'my-service', redirectTo: 'service', pathMatch: "full"},
  {path: 'datenschutz', component: PrivacyComponent},
  {path: 'impressum', component: ImprintComponent},
  {path: 'service', component: ServicesComponent},
  {path: 'projects', loadChildren: () => import('./pages/projects/project.module').then((m) => m.ProjectModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
