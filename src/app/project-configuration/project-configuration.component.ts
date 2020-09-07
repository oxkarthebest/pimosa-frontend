import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Project } from '../models/project';

@Component({
  selector: 'app-project-configuration',
  templateUrl: './project-configuration.component.html',
  styleUrls: ['./project-configuration.component.scss']
})
export class ProjectConfigurationComponent implements OnInit, OnChanges {
  @Input() project: Project;
  @Output() projectUpdatedEvent = new EventEmitter<Project>();
  showInformation: boolean = false;
  showUpdate: boolean = false;
  showTasks: boolean = false;
  showMachinery: boolean = false;

  constructor() { }

  ngOnInit() {
    this.showInformation = true;
  }

  ngOnChanges(changes: SimpleChanges) {
    let previousProject: Project = changes['project']['previousValue'];
    let currentProject: Project = changes['project']['currentValue'];

    if (this.project != undefined && previousProject != undefined) {
      if (previousProject.pk !== currentProject.pk) {
        this.project = currentProject;
        this.resetNavigation();
        this.showInformation = true;
      }
    }
  }

  navigateTo(index: number) {
    this.resetNavigation();
    switch (index) {
      case 1:
        this.showInformation = true;
        break;
      case 2:
        this.showUpdate = true;
        break;
      case 3:
        this.showTasks = true;
        break;
      case 4:
        this.showMachinery = true;
        break;
      default:
        this.showInformation = true;
        break;
    }
  }

  notifyOfProjectUpdateEvent(updatedProject: Project) {
    this.projectUpdatedEvent.emit(updatedProject);
  }

  private resetNavigation() {
    this.showInformation = false;
    this.showUpdate = false;
    this.showTasks = false;
    this.showMachinery = false;
  }
}
