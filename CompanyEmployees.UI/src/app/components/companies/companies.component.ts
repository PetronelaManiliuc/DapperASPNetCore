import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CompanyResponse } from 'src/app/models/company.request';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  companies: CompanyResponse[] = [];

  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
    console.log("here");
    this.companyService.getCompanies().subscribe({
      next: (companies) => {
        this.companies = companies;
      },
      error: (response) => {
        console.log(response);
      }
    });

    console.log(this.companies);
  }

}
