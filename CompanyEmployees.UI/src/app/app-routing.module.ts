import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompaniesComponent } from './components/companies/companies.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { ManagersComponent } from './components/managers/managers.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { CompanyDetailComponent } from './components/company-detail/company-detail.component';

const routes: Routes = [
  { path: 'companies', component: CompaniesComponent },
  { path: 'employees', component: EmployeesComponent },
  { path: 'managers', component: ManagersComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'companies/detail/:id', component: CompanyDetailComponent },
  { path: 'companies/add', component: CompanyDetailComponent },
  { path: '', redirectTo: 'companies', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
