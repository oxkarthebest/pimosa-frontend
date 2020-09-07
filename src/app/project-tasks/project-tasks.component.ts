import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../models/task';
import { Subject } from 'rxjs';
import { TaskService } from '../services/task-service/task.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Project } from '../models/project';
import { TaskStatus } from '../models/status';

@Component({
  selector: 'app-project-tasks',
  templateUrl: './project-tasks.component.html',
  styleUrls: ['./project-tasks.component.scss']
})
export class ProjectTasksComponent implements OnInit {
  @Input() project: Project;
  showCreation: boolean = false;
  taskList: Task[] = [];
  taskMasterList: Task[] = [];
  showList: number[] = [];
  statusList: TaskStatus[] = [];
  filterText: string;
  filterTextChanged: Subject<string> = new Subject<string>();
  selectedTask: Task = null;
  successAlertMessage: string = null;

  constructor(private taskService: TaskService) {
    this.filterTextChanged.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe((value) => {
      this.taskList = [];
      this.filterText = value;
      this.taskMasterList.forEach((task) => {
        if (task.name.trim().toUpperCase().includes(this.filterText.trim().toUpperCase())) {
          this.taskList.push(task);
        }
      })
    });
  }

  ngOnInit() {
    this.getTaskStatusList();
    this.getTaskList();
  }

  addNewTaskToList(newTask: Task) {
    newTask.toggleNewTaskClass();

    this.taskMasterList.unshift(newTask);
    this.generateShowingList(this.taskMasterList);

    setTimeout(() => {
      this.taskList.forEach((task) => {
        if (task.pk === newTask.pk) {
          task.toggleTaskClass();
        }
      });
    }, 2000);
  }

  closeSuccessAlert() {
    this.successAlertMessage = null;
  }

  filterByName(text: string) {
    this.filterTextChanged.next(text);
  }

  deleteTask() {
    this.taskService.deleteTask(this.selectedTask.pk)
      .subscribe(() => {
        this.getTaskList();
        this.successAlertMessage = 'Se ha eliminado la tarea.';
      })
  }

  markTaskAsCompleted() {
    this.taskService.markTaskAsCompleted(this.selectedTask.pk)
      .subscribe(() => {
        this.selectedTask.assignStatusClass('Completada');
        this.selectedTask.status = 'Completada';
        for (let task of this.taskList) {
          if (task.pk === this.selectedTask.pk) {
            task.assignStatusClass('Completada');
            task.status = 'Completada';
          }
        }
      })
  }

  selectTask(task: Task) {
    this.selectedTask = task;

    this.taskList.forEach((task) => {
      if (task.pk === this.selectedTask.pk) {
        task.toggleSelectedTaskClass();
      }
      else {
        task.toggleTaskClass();
      }
    });

    window.scroll(0, 0);
  }

  showCreationModal() {
    this.showCreation = true;
  }

  showingListChange(value) {
    if (0 === parseInt(value)) {
      this.taskList = [...this.taskMasterList];
    } else {
      this.taskList = [...this.taskMasterList].slice(0, parseInt(value));
    }
  }

  statusListChange(value) {
    this.taskList = [];
    if (0 == value) {
      this.taskList = [...this.taskMasterList];
    } else {
      for (let task of this.taskMasterList) {
        if (task.statusPk === value) {
          this.taskList.push(task);
        }
      }
    }
  }

  updateTaskInList(updatedTask: Task) {
    this.taskList.forEach((task) => {
      if (task.pk === updatedTask.pk) {
        task.updateTask(updatedTask);
        task.toggleUpdatedTaskClass();
      }
    });

    setTimeout(() => {
      this.taskList.forEach((task) => {
        if (task.pk === updatedTask.pk) {
          task.toggleSelectedTaskClass();
        }
      });
    }, 2000);

    this.selectedTask = updatedTask;
  }

  private generateShowingList(taskMasterList: Task[]) {
    this.showList = [];
    let factor = Math.ceil(taskMasterList.length / 5);
    if (factor >= 1) {
      for (let i = 1; i <= factor; i++) {
        this.showList.push((i * 5));
      }
      this.taskList = [...this.taskMasterList].slice(0, 5);
    } else {
      this.showList.push(5);
      this.taskList = [...this.taskMasterList];
    }

    this.selectTask(this.taskList[0]);
  }

  private getTaskList(): void {
    this.taskMasterList = [];
    this.taskService.getTaskList(this.project.pk)
      .subscribe((response) => {
        let task: Task = null;
        response.forEach((element) => {
          task = new Task(
            element['PK'],
            element['Name'],
            element['Description'],
            element['StartDate'],
            element['PlannedEndDate'],
            element['EndDate'],
            element['StatusPK'],
            element['Status']
          );
          this.taskMasterList.push(task);
        });
        this.generateShowingList(this.taskMasterList);
      });
  }

  private getTaskStatusList(): void {
    this.taskService.getTaskStatusList()
      .subscribe((response) => {
        let taskStatus: TaskStatus = null;
        response.forEach((element) => {
          taskStatus = new TaskStatus(
            element['PK'],
            element['Name']
          );
          this.statusList.push(taskStatus);
        });
      });
  }

}
