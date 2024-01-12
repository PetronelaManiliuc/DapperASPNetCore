import { ANIMATION_MODULE_TYPE, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { CompaniesComponent } from './components/companies/companies.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { ManagersComponent } from './components/managers/managers.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CompanyDetailComponent } from './components/company-detail/company-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { EmployeeDetailComponent } from './components/employee-detail/employee-detail.component';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';
import { AssignEmployeeDialogComponent } from './components/assign-employee-dialog/assign-employee-dialog.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgSelectModule } from "@ng-select/ng-select"; 

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    CompaniesComponent,
    EmployeesComponent,
    ManagersComponent,
    CompanyDetailComponent,
    ConfirmDialogComponent,
    EmployeeDetailComponent,
    ProjectDetailComponent,
    AssignEmployeeDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule, 
    MatDialogModule,
    MatSnackBarModule, 
    BrowserAnimationsModule,
    NoopAnimationsModule ,
    NgMultiSelectDropDownModule.forRoot(),
    NgSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
