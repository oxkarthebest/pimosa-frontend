import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Project } from '../models/project';
import { Validators, FormBuilder } from '@angular/forms';
import { TaskService } from '../services/task-service/task.service';
import { CreateTaskResponse } from '../models/responses';
import { Task } from '../models/task';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss']
})
export class TaskCreateComponent implements OnInit {
  @Input() project: Project;
  @Output() taskCreatedEvent = new EventEmitter<Task>();
  successAlertMessage: string = null;
  errorAlertMessage: string = null;
  newTaskForm = this.formBuilder.group({
    name: [
      '',
      [
        Validators.required,
        Validators.maxLength(254),
        Validators.minLength(2)
      ]
    ],
    description: [
      '',
      [
        Validators.required,
        Validators.maxLength(400),
        Validators.minLength(2)
      ]
    ],
    startDate: [
      '',
      [
        Validators.required
      ]
    ],
    plannedEndDate: [
      '',
      [
        Validators.required
      ]
    ]
  });

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService
  ) { }

  ngOnInit() {
  }

  closeErrorAlert() {
    this.errorAlertMessage = null;
  }

  closeSuccessAlert() {
    this.successAlertMessage = null;
  }

  submitNewTaskForm() {
    let name = this.newTaskForm.value.name;
    let description = this.newTaskForm.value.description;
    let startDate = this.newTaskForm.value.startDate;
    let plannedEndDate = this.newTaskForm.value.plannedEndDate;

    this.taskService.createTask(
      this.project.pk,
      name,
      description,
      startDate,
      plannedEndDate
    ).subscribe((response) => {
      let createTaskResponse: CreateTaskResponse = new CreateTaskResponse(
        response['outCreated'],
        response['outMessage'],
        response['outTaskPk']
      );
      this.resetAlerts();

      if (createTaskResponse.created) {
        this.successAlertMessage = createTaskResponse.message;
        this.getTask(createTaskResponse.taskPk);
        this.newTaskForm.reset();
      } else {
        this.errorAlertMessage = createTaskResponse.message;
      }
    });
  }

  private getTask(taskPk: string) {
    this.taskService.getTask(taskPk)
      .subscribe((response) => {
        let task: Task = new Task(
          response[0]['PK'],
          response[0]['Name'],
          response[0]['Description'],
          response[0]['StartDate'],
          response[0]['PlannedEndDate'],
          response[0]['EndDate'],
          response[0]['StatusPK'],
          response[0]['Status']
        );
        this.notifyTaskCreatedEvent(task);
      });
  }

  private notifyTaskCreatedEvent(createdTask: Task) {
    this.taskCreatedEvent.emit(createdTask);
  }

  private resetAlerts() {
    this.successAlertMessage = null;
    this.errorAlertMessage = null;
  }

}
