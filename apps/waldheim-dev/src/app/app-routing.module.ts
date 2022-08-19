import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import {PrivacyComponent} from "./pages/privacy/privacy.component";
import {ImprintComponent} from "./pages/imprint/imprint.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'privacy', redirectTo: 'datenschutz', pathMatch: "full"},
  {path: 'imprint', redirectTo: 'impressum', pathMatch: "full"},
  {path: 'datenschutz', component: PrivacyComponent},
  {path: 'impressum', component: ImprintComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
