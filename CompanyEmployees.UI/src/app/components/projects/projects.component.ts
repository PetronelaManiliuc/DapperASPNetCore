import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProjectResponse } from 'src/app/models/project.response';
import { ProjectService } from 'src/app/services/project.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { AssignEmployeeDialogComponent } from '../assign-employee-dialog/assign-employee-dialog.component';
import { EmployeeService } from 'src/app/services/employee.service';
import { EmployeeResponse } from 'src/app/models/employee.response';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})

export class ProjectsComponent implements OnInit {

  projects: ProjectResponse[] = [];
  employees: EmployeeResponse[] = [];
  isEditItems: boolean = false;

  constructor(private projectService: ProjectService, private employeeService: EmployeeService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.projectService.getProjects().subscribe({
      next: (projects) => {
        this.projects = projects;
      },
      error: (response) => {
        console.log(response);
      }
    });

    this.getEmployees();

    // console.log(this.employees)
  }

  edit(id: Number): void {
    this.router.navigate([`projects/detail/${id}`]);
  }

  add(): void {
    this.router.navigate([`projects/add`]);
  }

  openDialog(id: Number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'Are you sure want to delete?',
        buttonText: {
          ok: 'Delete',
          cancel: 'Cancel'
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        console.log(confirmed);

        this.deleteProject(id);
        window.location.reload();
      }
    });
  }

  deleteProject(id: Number) {
    this.projectService.deleteProject(id);
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe({
      next: (employees) => {
        this.employees = employees;
      }, error: (response) => {
        console.log(response);
      }
    });
  }

  addEmployee(id: Number) {

    const dialogRef = this.dialog.open(AssignEmployeeDialogComponent, {
      data: {
        employees: this.employees,
        projectId: id
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {

        window.location.reload();
      }
    });
  }

}
