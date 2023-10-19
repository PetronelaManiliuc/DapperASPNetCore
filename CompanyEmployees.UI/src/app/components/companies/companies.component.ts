import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyResponse } from 'src/app/models/company.response';
import { CompanyService } from 'src/app/services/company.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  companies: CompanyResponse[] = [];

  constructor(private companyService: CompanyService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.companyService.getCompanies().subscribe({
      next: (companies) => {
        this.companies = companies;
      },
      error: (response) => {
        console.log(response);
      }
    });
  }

  addCompany() {
    this.router.navigate(['companies/add']);
  }

  editCompany(id: Number) {
    this.router.navigate([`companies/detail/${id}`]);
  }

  deleteCompany(id: Number) {
    this.companyService.deleteCompany(id);
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

        this.deleteCompany(id);
        window.location.reload();
      }
    });
  }

}
