import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtInterceptor, ErrorInterceptor } from '@app/_services';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MatToolbarModule,
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
  MatTableModule,
  MatDividerModule,
  MatProgressSpinnerModule,
  MatInputModule,
  MatCardModule,
  MatSlideToggleModule,
  MatSelectModule,
  MatOptionModule} from '@angular/material';
import { HomeComponent } from '@app/home/home.component';
import { LoginComponent } from '@app/login/login.component';
import {CompaniesComponent} from '@app/companies/companies.component';
import {CreateCompanyComponent} from '@app/create-company/create-company.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    CompaniesComponent,
    CreateCompanyComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatOptionModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
   // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
