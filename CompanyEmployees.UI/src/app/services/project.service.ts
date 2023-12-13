import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProjectResponse } from '../models/project.response';
import { Observable } from 'rxjs';
import { ProjectRequest } from '../models/project.request';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ProjectService {

  constructor(private readonly httpClient: HttpClient) { }

  getProjects(): Observable<ProjectResponse[]> {
    return this.httpClient.get<ProjectResponse[]>(`${environment.apiUrl}/projects`);
  }

  getProjectById(id: Number): Observable<ProjectRequest> {
    console.log(`${environment.apiUrl}/projects/${id}`);
    return this.httpClient.get<ProjectRequest>(`${environment.apiUrl}/projects/${id}`);
  }

  deleteProject(id: Number) {
    console.log(id);
    this.httpClient.delete(`${environment.apiUrl}/projects/` + id).subscribe(() => console.log("project deleted"));
  }

  addProject(projectRequest: ProjectRequest): Observable<ProjectRequest> {
    console.log(projectRequest);
    return this.httpClient.post<ProjectRequest>(
      `${environment.apiUrl}/projects`,
      projectRequest
    );
  }

  updateProject(project: ProjectRequest): Observable<ProjectRequest> {
    console.log(project);
    return this.httpClient.put<ProjectRequest>(
      `${environment.apiUrl}/projects`,
      project
    );
  }

  getManagers(companyId: Number) {
    return this.httpClient.get<ProjectRequest>(`${environment.apiUrl}/managers/${companyId}`);
  }
}
