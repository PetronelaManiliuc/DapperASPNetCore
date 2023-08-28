import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CompanyResponse } from '../models/company.request';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private readonly httpClient: HttpClient) { }

  //get companies
  getCompanies(): Observable<CompanyResponse[]> {
    return this.httpClient.get<CompanyResponse[]>(`${environment.apiUrl}/companies`);
  }

}
