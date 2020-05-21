import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '@app/home/home.component';
import { LoginComponent } from '@app/login/login.component';
import { AuthGuardService } from '@app/_services/auth-guard.service';
import {CompaniesComponent} from '@app/companies/companies.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: CompaniesComponent,
    canActivate: [ AuthGuardService ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
