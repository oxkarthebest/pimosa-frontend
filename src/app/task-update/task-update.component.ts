import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Task } from '../models/task';
import { Validators, FormBuilder } from '@angular/forms';
import { TaskService } from '../services/task-service/task.service';
import { UpdateTaskResponse } from '../models/responses';

@Component({
  selector: 'app-task-update',
  templateUrl: './task-update.component.html',
  styleUrls: ['./task-update.component.scss']
})
export class TaskUpdateComponent implements OnInit {
  @Input() task: Task;
  @Output() taskUpdatedEvent = new EventEmitter<Task>();
  successAlertMessage: string = null;
  errorAlertMessage: string = null;
  updateTaskForm = this.formBuilder.group({
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
    this.fillUpdateTaskForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    let previousTask: Task = changes['task']['previousValue'];
    let currentTask: Task = changes['task']['currentValue'];

    if (this.task != undefined && previousTask != undefined) {
      if (previousTask.pk !== currentTask.pk) {
        this.task = currentTask;
        this.fillUpdateTaskForm();
        this.resetAlerts();
      }
    }
  }

  closeErrorAlert() {
    this.errorAlertMessage = null;
  }

  closeSuccessAlert() {
    this.successAlertMessage = null;
  }

  submitUpdateTaskForm() {
    let name = this.updateTaskForm.value.name;
    let description = this.updateTaskForm.value.description;
    let startDate = this.updateTaskForm.value.startDate;
    let plannedEndDate = this.updateTaskForm.value.plannedEndDate;

    this.taskService.updateTask(
      this.task.pk,
      name,
      description,
      startDate,
      plannedEndDate
    ).subscribe((response) => {
      let createTaskResponse: UpdateTaskResponse = new UpdateTaskResponse(
        response['outUpdated'],
        response['outMessage']
      );
      this.resetAlerts();

      if (createTaskResponse.updated) {
        this.successAlertMessage = createTaskResponse.message;
        this.getTask(this.task.pk);
      } else {
        this.errorAlertMessage = createTaskResponse.message;
      }
    });
  }

  private fillUpdateTaskForm() {
    this.updateTaskForm.setValue({
      'name': this.task.name,
      'description': this.task.description,
      'startDate': this.task.startDate,
      'plannedEndDate': this.task.plannedEndDate
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
    this.taskUpdatedEvent.emit(createdTask);
  }

  private resetAlerts() {
    this.successAlertMessage = null;
    this.errorAlertMessage = null;
  }

}
