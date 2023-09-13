import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CompanyResponse } from 'src/app/models/company.response';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  companies: CompanyResponse[] = [];

  constructor(private companyService: CompanyService, private router: Router) { }

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

  editCompany(id: Int32Array) {
    this.router.navigate([`companies/detail/${id}`]);
  }

  deleteCompany(id: Int32Array) {

  }

}
