import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CompanyRequest } from '../models/company.request';
import { CompanyResponse } from '../models/company.response';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private readonly httpClient: HttpClient) { }

  //get companies
  getCompanies(): Observable<CompanyResponse[]> {
    return this.httpClient.get<CompanyResponse[]>(`${environment.apiUrl}/companies`);
  }

  getCompanyById(id: Number): Observable<CompanyResponse> {
    return this.httpClient.get<CompanyResponse>(`${environment.apiUrl}/companies/${id}`);
  }

  addCompany(companyRequest: CompanyRequest): Observable<CompanyResponse> {
    return this.httpClient.post<CompanyResponse>(
      `${environment.apiUrl}/companies`,
      companyRequest
    );
  }

  updateCompany(company: CompanyResponse): Observable<CompanyResponse> {
    console.log(company);
    return this.httpClient.put<CompanyResponse>(
      `${environment.apiUrl}/companies`,
      company
    );
  }

}
