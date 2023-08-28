import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompaniesComponent } from './components/companies/companies.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { ManagersComponent } from './components/managers/managers.component';
import { ProjectsComponent } from './components/projects/projects.component';

const routes: Routes = [
  { path: 'companies', component: CompaniesComponent },
  { path: 'employees', component: EmployeesComponent },
  { path: 'managers', component: ManagersComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: '', redirectTo: 'companies', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
