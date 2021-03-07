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
import {VehicleMasterComponent} from '@app/vehicle-master/vehicle-master.component';
import {ConsigneeMasterComponent} from '@app/consignee-master/consignee-master.component';
import {CreateVehicleMasterComponent} from '@app/create-vehicle-master/create-vehicle-master.component';
import {CreateConsigneeMasterComponent} from '@app/create-consignee-master/create-consignee-master.component';
import {CreateDriverMasterComponent} from '@app/create-driver-master/create-driver-master.component';
import {DriverMasterComponent} from '@app/driver-master/driver-master.component';
import {FactoryMasterComponent} from '@app/factory-master/factory-master.component';
import {CreateFactoryMasterComponent} from '@app/create-factory-master/create-factory-master.component';
import {AdminMasterComponent} from '@app/admin-master/admin-master.component';
import {ViewMoveAllComponent} from '@app/view-move-all/view-move-all.component';
import {CreateCashVoucherComponent} from '@app/create-cash-voucher/create-cash-voucher.component';
import {ViewCashVouchersComponent} from '@app/view-cash-vouchers/view-cash-vouchers.component';
import {ViewCashVoucherComponent} from '@app/view-cash-voucher/view-cash-voucher.component';
import {PrintLayoutComponent} from '@app/print-layout/print-layout.component';
import {PrintCashVoucherComponent} from '@app/print-cash-voucher/print-cash-voucher.component';
import {HomeLayoutComponent} from '@app/home-layout/home-layout.component';

const routes: Routes = [
  {
  path: 'login',
  data: {title: 'Grace Transport Solutions'},
  component: LoginComponent
  },
  {
    path: '',
    data: {title: 'App Home'},
    component: HomeLayoutComponent,
    children: [
      { path: 'home',
        component: HomeComponent,
        data: {title: 'Grace Transport Solutions'}
      },
      { path: '',
        component: HomeComponent,
        data: {title: 'Grace Transport Solutions'}
      },
      {
        path: 'companies',
        component: CompaniesComponent,
        data: {title: 'Company List'}
      },
      {
        path: 'create-company',
        data: {title: 'Create Company'},
        component: CreateCompanyComponent
      } ,
      {
        path: 'edit-company/:id',
        data: {title: 'Edit Company'},
        component: EditCompanyComponent
      },
      {
        path: 'users',
        component: UsersComponent,
        data: {title: 'User List'}
      },
      {
        path: 'create-user',
        data: {title: 'Create User'},
        component: CreateUserComponent
      },
      {
        path: 'view-move-cfs',
        data: {title: 'Report - Movement (Port to CFS)'},
        component: ViewMoveCfsComponent
      },
      {
        path: 'reset-password/:username',
        data: {title: 'Reset Password'},
        component: ResetPasswordComponent
      },
      {
        path: 'create-move-cfs',
        data: {title: 'Movement (Port to CFS)'},
        component: CreateMoveCfsComponent
      },
      {
        path: 'create-move-factory',
        data: {title: 'Movement (Port/CFS to Factory)'},
        component: CreateMoveFactoryComponent,
      },
      {
        path: 'create-move-empty',
        data: {title: 'Movement (Empty)'},
        component: CreateMoveEmptyComponent
      },
      {
        path: 'view-move-all',
        data: {title: 'Report - All Movements'},
        component: ViewMoveAllComponent
      },
      {
        path: 'view-move-factory',
        data: {title: 'Report - Movement (Port/CFS to Factory)'},
        component: ViewMoveFactoryComponent
      },
      {
        path: 'view-move-empty',
        data: {title: 'Report - Movement (Empty)'},
        component: ViewMoveEmptyComponent
      },
      {
        path: 'vehicle-master',
        data: {title: 'Vehicle Master'},
        component: VehicleMasterComponent
      },
      {
        path: 'consignee-master',
        data: {title: 'consignee Master'},
        component: ConsigneeMasterComponent
      },
      {
        path: 'create-vehicle-master',
        data: {title: 'Create Vehicle Master'},
        component: CreateVehicleMasterComponent
      },
      {
        path: 'create-consignee-master',
        data: {title: 'Create Consignee Master'},
        component: CreateConsigneeMasterComponent
      },
      {
        path: 'create-driver-master',
        data: {title: 'Create Driver Master'},
        component: CreateDriverMasterComponent
      },
      {
        path: 'driver-master',
        data: {title: 'Driver Master'},
        component: DriverMasterComponent
      },
      {
        path: 'factory-master',
        data: {title: 'Factory Master'},
        component: FactoryMasterComponent
      },
      {
        path: 'admin-master',
        data: {title: 'Admin Master'},
        component: AdminMasterComponent
      },
      {
        path: 'create-factory-master',
        data: {title: 'Create Factory Master'},
        component: CreateFactoryMasterComponent
      },
      {
        path: 'create-cash-voucher',
        data: {title: 'Create Cash Voucher'},
        component: CreateCashVoucherComponent
      },
      {
        path: 'view-cash-vouchers',
        data: {title: 'View Cash Vouchers'},
        component: ViewCashVouchersComponent
      },
      {
        path: 'view-cash-voucher/:id',
        data: {title: 'View Cash Voucher'},
        component: ViewCashVoucherComponent,
        canActivate: [ AuthGuardService ]
      }
    ],
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'print-cash-voucher/:id',
    data: {title: 'Print Cash Voucher'},
    component: PrintCashVoucherComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'print-document',
    data: {title: 'Print Document'},
    component: PrintLayoutComponent,
    children: [
      { path: 'print-cash-voucher/:id', component: PrintCashVoucherComponent }
    ],
    canActivate: [ AuthGuardService ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
