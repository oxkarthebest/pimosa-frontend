import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { Industry } from 'src/app/models/industry';
import { catchError } from 'rxjs/operators';
import { GET_PROJECT_INFORMATION_URL, GET_INDUSTRY_LIST_URL, CREATE_PROJECT_URL, GET_PROJECT_URL, GET_PROJECT_LIST_URL, UPDATE_PROJECT_URL, GET_PROJECT_MACHINERY_LIST_TO_ADD_URL, GET_PROJECT_MACHINERY_LIST_URL, ADD_MACHINERY_TO_PROJECT_URL, DELETE_MACHINERY_FROM_PROJECT_URL } from './../../api/endpoints';
import { CreateProjectResponse, AddMachineryToProjectResponse, DeleteMachineryFromProjectResponse } from 'src/app/models/responses';
import { Project } from 'src/app/models/project';
import { Machinery } from 'src/app/models/machinery';
import { ProjectInformation } from 'src/app/models/proyect-information';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  addMachineryToProject(machineryPk: string, projectPk: string): Observable<AddMachineryToProjectResponse> {
    const data = {
      'machineryPk': machineryPk,
      'projectPk': projectPk
    }
    console.log(data);
    return this.http.post<AddMachineryToProjectResponse>(ADD_MACHINERY_TO_PROJECT_URL, data, this.httpOptions)
      .pipe(
        catchError(this.handleError<AddMachineryToProjectResponse>('addMachineryToProject', null))
      );
  }

  createProject(
    name: string,
    code: string,
    purchaseOrder: string,
    description: string,
    industry: string,
    startDate: string,
    plannedEndDate: string,
  ): Observable<CreateProjectResponse> {
    const data = {
      'name': name,
      'code': code,
      'purchaseOrder': purchaseOrder,
      'description': description,
      'industry': industry,
      'startDate': startDate,
      'plannedEndDate': plannedEndDate
    }
    return this.http.post<CreateProjectResponse>(CREATE_PROJECT_URL, data, this.httpOptions)
      .pipe(
        catchError(this.handleError<CreateProjectResponse>('createProject', null))
      );
  }

  deleteMachineryFromProject(machineryPk: string, projectPk: string): Observable<DeleteMachineryFromProjectResponse> {
    const data = {
      'machineryPk': machineryPk,
      'projectPk': projectPk
    }
    return this.http.post<DeleteMachineryFromProjectResponse>(DELETE_MACHINERY_FROM_PROJECT_URL, data, this.httpOptions)
      .pipe(
        catchError(this.handleError<DeleteMachineryFromProjectResponse>('deleteMachineryFromProject', null))
      );
  }

  getIndustryList(): Observable<Industry[]> {
    const data = {}
    return this.http.post<Industry[]>(GET_INDUSTRY_LIST_URL, data, this.httpOptions)
      .pipe(
        catchError(this.handleError<Industry[]>('getIndustryList', []))
      );
  }

  getProject(projectPk: string): Observable<Project> {
    const data = {
      'projectPk': projectPk
    }
    return this.http.post<Project>(GET_PROJECT_URL, data, this.httpOptions)
      .pipe(
        catchError(this.handleError<Project>('getProject', null))
      );
  }

  getProjectList(): Observable<Project[]> {
    const data = {}
    return this.http.post<Project[]>(GET_PROJECT_LIST_URL, data, this.httpOptions)
      .pipe(
        catchError(this.handleError<Project[]>('getProjectList', []))
      );
  }

  getProjectInformation(projectPk: string): Observable<ProjectInformation> {
    const data = {
      'projectPk': projectPk
    }
    return this.http.post<ProjectInformation>(GET_PROJECT_INFORMATION_URL, data, this.httpOptions)
      .pipe(
        catchError(this.handleError<ProjectInformation>('getProjectInformation', null))
      );
  }

  getProjectMachineryList(projectPk: string): Observable<Machinery[]> {
    const data = {
      'projectPk': projectPk
    }
    return this.http.post<Machinery[]>(GET_PROJECT_MACHINERY_LIST_URL, data, this.httpOptions)
      .pipe(
        catchError(this.handleError<Machinery[]>('getProjectMachineryList', []))
      );
  }

  getProjectMachineryToAddList(projectPk: string): Observable<Machinery[]> {
    const data = {
      'projectPk': projectPk
    }
    return this.http.post<Machinery[]>(GET_PROJECT_MACHINERY_LIST_TO_ADD_URL, data, this.httpOptions)
      .pipe(
        catchError(this.handleError<Machinery[]>('getProjectMachineryToAddList', []))
      );
  }

  updateProject(
    projectPk: string,
    name: string,
    code: string,
    purchaseOrder: string,
    description: string,
    industry: string,
    startDate: string,
    plannedEndDate: string,
  ): Observable<CreateProjectResponse> {
    const data = {
      'projectPk': projectPk,
      'name': name,
      'code': code,
      'purchaseOrder': purchaseOrder,
      'description': description,
      'industry': industry,
      'startDate': startDate,
      'plannedEndDate': plannedEndDate
    }
    console.log(data);
    return this.http.post<CreateProjectResponse>(UPDATE_PROJECT_URL, data, this.httpOptions)
      .pipe(
        catchError(this.handleError<CreateProjectResponse>('updateProject', null))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} => ${error.message}`)
      return of(result as T);
    }
  }
}
