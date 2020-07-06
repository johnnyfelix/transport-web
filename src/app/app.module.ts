import { BrowserModule,Title  } from '@angular/platform-browser';
import { AngularMaterialModule } from './material.module'
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtInterceptor, ErrorInterceptor } from '@app/_services';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ControlErrorsDirective } from './control-errors.directive';
import { ControlErrorComponent } from './control-error/control-error.component';
import { ControlErrorContainerDirective } from './control-error-container.directive';
import { FormSubmitDirective } from './form-submit.directive';
import { HomeComponent } from '@app/home/home.component';
import { LoginComponent } from '@app/login/login.component';
import { CompaniesComponent } from '@app/companies/companies.component';
import { CreateCompanyComponent } from '@app/create-company/create-company.component';
import { EditCompanyComponent } from '@app/edit-company/edit-company.component'
import { UsersComponent } from '@app/users/users.component';
import { ResetPasswordComponent } from '@app/reset-password/reset-password.component';
import { CreateUserComponent } from '@app/create-user/create-user.component';
import { CreateMoveCfsComponent } from '@app/create-move-cfs/create-move-cfs.component';
import { ViewMoveCfsComponent } from '@app/view-move-cfs/view-move-cfs.component';
import {DialogBoxComponent} from '@app/dialog-box/dialog-box.component';
import {MAT_DATE_LOCALE} from '@angular/material';
import {ViewMoveFactoryComponent} from '@app/view-move-factory/view-move-factory.component';
import {ViewMoveEmptyComponent} from '@app/view-move-empty/view-move-empty.component';
import {CreateMoveFactoryComponent} from '@app/create-move-factory/create-move-factory.component';
import {CreateMoveEmptyComponent} from '@app/create-move-empty/create-move-empty.component';


@NgModule({
  declarations: [
    AppComponent,
    ControlErrorsDirective,
    ControlErrorComponent,
    ControlErrorContainerDirective,
    FormSubmitDirective,
    HomeComponent,
    LoginComponent,
    CompaniesComponent,
    CreateCompanyComponent,
    EditCompanyComponent,
    UsersComponent,
    ResetPasswordComponent,
    CreateUserComponent,
    CreateMoveCfsComponent,
    CreateMoveFactoryComponent,
    CreateMoveEmptyComponent,
    ViewMoveCfsComponent,
    DialogBoxComponent,
    ViewMoveFactoryComponent,
    ViewMoveEmptyComponent
  ],
  entryComponents: [ControlErrorComponent, DialogBoxComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
  ],
  providers: [
    Title,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'}
   // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
    ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
