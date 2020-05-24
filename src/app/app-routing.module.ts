import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '@app/home/home.component';
import { LoginComponent } from '@app/login/login.component';
import { AuthGuardService } from '@app/_services/auth-guard.service';
import {CompaniesComponent} from '@app/companies/companies.component';
import {CreateCompanyComponent} from '@app/create-company/create-company.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'companies',
    component: CompaniesComponent,
    canActivate: [ AuthGuardService ]
  },{
    path: 'create-company',
    component: CreateCompanyComponent,
    canActivate: [ AuthGuardService ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
