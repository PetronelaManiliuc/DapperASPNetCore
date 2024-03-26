import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeResponse } from '../models/employee.response';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { EmployeeRequest } from '../models/employee.request';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  constructor(private readonly httpClient: HttpClient) { }

  getEmployees(): Observable<EmployeeResponse[]> {
    return this.httpClient.get<EmployeeResponse[]>(`${environment.apiUrl}/employees`);
  }

  getEmployeeById(id: Number): Observable<EmployeeRequest> {
    console.log(`${environment.apiUrl}/employees/${id}`);
    return this.httpClient.get<EmployeeRequest>(`${environment.apiUrl}/employees/${id}`);
  }

  deleteEmployee(id: Number) {
    console.log(id);
    this.httpClient.delete(`${environment.apiUrl}/employees/` + id).subscribe(() => console.log("employee deleted"));
  }

  addEmployee(employeeRequest: EmployeeRequest): Observable<EmployeeRequest> {
    console.log(employeeRequest);
    return this.httpClient.post<EmployeeRequest>(
      `${environment.apiUrl}/employees`,
      employeeRequest
    );
  }

  updateEmployee(employee: EmployeeRequest): Observable<EmployeeRequest> {
    console.log(employee);
    return this.httpClient.put<EmployeeRequest>(
      `${environment.apiUrl}/employees`,
      employee
    );
  }

  getManagers(companyId: Number) {
    return this.httpClient.get<EmployeeRequest>(`${environment.apiUrl}/managers/${companyId}`);
  }

  assignToProject(employees: any) {
    console.log(employees);
    return this.httpClient.post<EmployeeRequest>(`${environment.apiUrl}/employees/assignEmployeeToCompany`, employees);
    //   return this.httpClient.get<EmployeeRequest>(`${environment.apiUrl}/managers/}`);
  }

}
