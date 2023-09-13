import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css']
})
export class CompanyDetailComponent implements OnInit {

  CompanyDetailsForm: FormGroup;
  submitted = false;
  selectedCountry = "";

  // Country names
  Country: any = ['Romania', 'Olanda', 'Bulgaria', 'Grecia']

  constructor(private companyService: CompanyService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {
    this.CompanyDetailsForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(60)]],
      address: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(60)]],
      country: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]]
    });

  }

  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    
    if (!Number.isNaN(id)) {
      this.getCompany(id);
    }

  }

  get name() {
    return this.CompanyDetailsForm.get('name');
  }

  get address() {
    return this.CompanyDetailsForm.get('address');
  }

  get country() {
    return this.CompanyDetailsForm.get('country');
  }

  // Getter method to access formcontrols
  get myForm() {
    return this.CompanyDetailsForm.controls;
  }

  changeCountry(e: any) {
    this.country?.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  getCompany(id: Number) {
    this.companyService.getCompanyById(id)
      .subscribe(company => {
        this.CompanyDetailsForm.setValue({
          'id': company.id,
          'name': company.name,
          'address': company.address,
          'country': company.country
        });

        this.selectedCountry = company.country;
      });
  }

  onSubmit(): void {
    this.submitted = true;
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    if (Number.isNaN(id)) {
      this.addCompany();

    } else {
      this.editCompany()
    }
  }

  editCompany() {
    this.companyService.updateCompany(this.CompanyDetailsForm.value).subscribe({
      next: (data) => {
        console.log(`Update successfully ${data}`);

        this.reloadPage();
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  addCompany(): void {
    this.companyService.addCompany(this.CompanyDetailsForm.value).subscribe({
      next: (data) => {
        console.log(`ADD successfully ${data}`);

        this.reloadPage();
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  reloadPage(): void {
    this.router.navigate(['companies']);
  }

}
