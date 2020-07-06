import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '@app/home/home.component';
import { LoginComponent } from '@app/login/login.component';
import { AuthGuardService } from '@app/_services/auth-guard.service';
import {CompaniesComponent} from '@app/companies/companies.component';
import {CreateCompanyComponent} from '@app/create-company/create-company.component';
import {EditCompanyComponent} from '@app/edit-company';
import {UsersComponent} from '@app/users/users.component';
import {ResetPasswordComponent} from '@app/reset-password/reset-password.component';
import {CreateUserComponent} from '@app/create-user/create-user.component';
import {CreateMoveCfsComponent} from '@app/create-move-cfs/create-move-cfs.component';
import {ViewMoveCfsComponent} from '@app/view-move-cfs/view-move-cfs.component';
import {ViewMoveFactoryComponent} from '@app/view-move-factory/view-move-factory.component';
import {ViewMoveEmptyComponent} from '@app/view-move-empty/view-move-empty.component';
import {CreateMoveFactoryComponent} from '@app/create-move-factory/create-move-factory.component';
import {CreateMoveEmptyComponent} from '@app/create-move-empty/create-move-empty.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {title: 'Grace Transport Solutions'},
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'home',
    component: HomeComponent,
    data: {title: 'Grace Transport Solutions'},
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'login',
    data: {title: 'Grace Transport Solutions'},
    component: LoginComponent
  },
  {
    path: 'companies',
    component: CompaniesComponent,
    data: {title: 'Company List'},
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'create-company',
    data: {title: 'Create Company'},
    component: CreateCompanyComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'edit-company/:id',
    data: {title: 'Edit Company'},
    component: EditCompanyComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'companies',
    component: CompaniesComponent,
    data: {title: 'Company List'},
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'users',
    component: UsersComponent,
    data: {title: 'User List'},
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'create-user',
    data: {title: 'Create User'},
    component: CreateUserComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'reset-password/:username',
    data: {title: 'Reset Password'},
    component: ResetPasswordComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'create-move-cfs',
    data: {title: 'Movement (Port to CFS)'},
    component: CreateMoveCfsComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'create-move-factory',
    data: {title: 'Movement (Port/CFS to Factory)'},
    component: CreateMoveFactoryComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'create-move-empty',
    data: {title: 'Movement (Empty)'},
    component: CreateMoveEmptyComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'view-move-cfs',
    data: {title: 'View Movement (Port to CFS)'},
    component: ViewMoveCfsComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'view-move-factory',
    data: {title: 'View Movement (Port/CFS to Factory)'},
    component: ViewMoveFactoryComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'view-move-empty',
    data: {title: 'View Movement Empty'},
    component: ViewMoveEmptyComponent,
    canActivate: [ AuthGuardService ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
