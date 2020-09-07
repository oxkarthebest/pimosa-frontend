import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CREATE_TASK_URL, GET_TASK_URL, GET_TASK_LIST_URL, GET_TASK_STATUS_LIST_URL, UPDATE_TASK_URL, DELETE_TASK_URL, MAR_TASK_COMPLETED_URL } from './../../api/endpoints';
import { CreateTaskResponse, UpdateTaskResponse } from 'src/app/models/responses';
import { Task } from 'src/app/models/task';
import { TaskStatus } from 'src/app/models/status';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  createTask(
    projectPk: string,
    name: string,
    description: string,
    startDate: string,
    plannedEndDate: string,
  ): Observable<CreateTaskResponse> {
    const data = {
      'projectPk': projectPk,
      'name': name,
      'description': description,
      'startDate': startDate,
      'plannedEndDate': plannedEndDate
    }
    return this.http.post<CreateTaskResponse>(CREATE_TASK_URL, data, this.httpOptions)
      .pipe(
        catchError(this.handleError<CreateTaskResponse>('createTask', null))
      );
  }

  deleteTask(taskPk: string): Observable<any> {
    const data = {
      'taskPk': taskPk
    }
    return this.http.post<any>(DELETE_TASK_URL, data, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>('deleteTask', null))
      );
  }

  getTask(taskPk: string): Observable<Task> {
    const data = {
      'taskPk': taskPk
    }
    return this.http.post<Task>(GET_TASK_URL, data, this.httpOptions)
      .pipe(
        catchError(this.handleError<Task>('getTask', null))
      );
  }

  getTaskList(projectPk: string): Observable<Task[]> {
    const data = {
      'projectPk': projectPk
    }
    return this.http.post<Task[]>(GET_TASK_LIST_URL, data, this.httpOptions)
      .pipe(
        catchError(this.handleError<Task[]>('getTaskList', []))
      );
  }

  getTaskStatusList(): Observable<TaskStatus[]> {
    const data = {}
    return this.http.post<TaskStatus[]>(GET_TASK_STATUS_LIST_URL, data, this.httpOptions)
      .pipe(
        catchError(this.handleError<TaskStatus[]>('getTaskStatusList', []))
      );
  }

  markTaskAsCompleted(taskPk: string): Observable<any> {
    const data = {
      'taskPk': taskPk
    }
    return this.http.post<any>(MAR_TASK_COMPLETED_URL, data, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>('markTaskAsCompleted', null))
      );
  }

  updateTask(
    taskPk: string,
    name: string,
    description: string,
    startDate: string,
    plannedEndDate: string,
  ): Observable<UpdateTaskResponse> {
    const data = {
      'taskPk': taskPk,
      'name': name,
      'description': description,
      'startDate': startDate,
      'plannedEndDate': plannedEndDate
    }
    return this.http.post<UpdateTaskResponse>(UPDATE_TASK_URL, data, this.httpOptions)
      .pipe(
        catchError(this.handleError<UpdateTaskResponse>('updateTask', null))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} => ${error.message}`)
      return of(result as T);
    }
  }
}
