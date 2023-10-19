import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyResponse } from 'src/app/models/company.response';
import { CompanyService } from 'src/app/services/company.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})

export class EmployeeDetailComponent implements OnInit {

  EmployeeDetailsForm: FormGroup;
  submitted = false;
  selectedManager = 0;
  selectedCompany = 0;
  Managers: any = [];
  Companies: CompanyResponse[] = [];

  constructor(private employeeService: EmployeeService, private companyService: CompanyService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {

    this.EmployeeDetailsForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(60)]],
      managerId: ['', Validators.required],
      companyId: ['', Validators.required],
      position: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(60)]],
      age: ['', [Validators.required, Validators.min(18), Validators.max(62)]]
    });
  }

  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);

    if (!Number.isNaN(id)) {
      this.getEmployee(id);
    }

    this.getCompanies();
  }

  get name() {
    return this.EmployeeDetailsForm.get('name');
  }

  get position() {
    return this.EmployeeDetailsForm.get('position');
  }

  get age() {
    return this.EmployeeDetailsForm.get('age');
  }
  get managerId() {
    return this.EmployeeDetailsForm.get('managerId');
  }

  get companyId() {
    return this.EmployeeDetailsForm.get('companyId');
  }

  changeManger(e: any) {
    this.managerId?.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  changeCompany(e: any) {
    this.companyId?.setValue(e.target.value, {
      onlySelf: true,
    });

    this.getManagers(e.target.value);
  }

  getManagers(companyId: number) {
    this.employeeService.getManagers(companyId).subscribe({
      next: (managers) => {
        this.Managers = managers;
      },
      error: (response) => {
        console.log(response);
      }
    });
  }

  getCompanies() {
    this.companyService.getCompanies().subscribe({
      next: (companies) => {
        this.Companies = companies;
      },
      error: (response) => {
        console.log(response);
      }
    });
  }

  getEmployee(id: Number) {

    this.employeeService.getEmployeeById(id)
      .subscribe(employee => {
        this.EmployeeDetailsForm.setValue({
          'id': employee.id,
          'name': employee.name,
          'position': employee.position,
          'age': employee.age,
          'managerId': employee.managerId,
          'companyId': employee.companyId
        });

        this.selectedCompany = employee.companyId;
        this.selectedManager = employee.managerId;

        this.getManagers(this.selectedCompany);
      });
  }

  get myForm() {
    return this.EmployeeDetailsForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    console.log(this.EmployeeDetailsForm.value);
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    if (Number.isNaN(id)) {
      this.addEmployee();

    } else {
      this.editEmployee()
    }
  }

  editEmployee() {
    this.employeeService.updateEmployee(this.EmployeeDetailsForm.value).subscribe({
      next: (data) => {
        console.log(`Update successfully ${data}`);

        this.reloadPage();
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  addEmployee(): void {
    this.employeeService.addEmployee(this.EmployeeDetailsForm.value).subscribe({
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
    this.router.navigate(['employees']);
  }


}
