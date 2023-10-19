import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeResponse } from 'src/app/models/employee.response';
import { EmployeeService } from 'src/app/services/employee.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})

export class EmployeesComponent implements OnInit {

  employees: EmployeeResponse[] = [];

  constructor(private employeeService: EmployeeService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe({
      next: (employees) => {
        this.employees = employees;
      },
      error: (response) => {
        console.log(response);
      }
    });
  }

  edit(id: Number): void {
    this.router.navigate([`employees/detail/${id}`]);
  }

  add(): void {
    this.router.navigate([`employees/add`]);
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

        this.deleteEmployee(id);
      //  window.location.reload();
      }
    });
  }

  deleteEmployee(id: Number) {
    this.employeeService.deleteEmployee(id);
  }


}
