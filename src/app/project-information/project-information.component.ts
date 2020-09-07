import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Project } from '../models/project';
import { ProjectService } from '../services/project-service/project.service';
import { ProjectInformation } from '../models/proyect-information';

@Component({
  selector: 'app-project-information',
  templateUrl: './project-information.component.html',
  styleUrls: ['./project-information.component.scss']
})
export class ProjectInformationComponent implements OnInit, OnChanges {
  @Input() project: Project;
  projectInformation: ProjectInformation = null;

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.getProjectInformation();
  }

  ngOnChanges(changes: SimpleChanges) {
    let previousProject: Project = changes['project']['previousValue'];
    let currentProject: Project = changes['project']['currentValue'];

    if (this.project != undefined && previousProject != undefined) {
      if (previousProject.pk !== currentProject.pk) {
        this.project = currentProject;
        this.getProjectInformation();
      }
    }
  }

  getProgress() {
    return `${this.projectInformation.progress}%`
  }

  private getProjectInformation() {
    this.projectService.getProjectInformation(this.project.pk)
      .subscribe((response) => {
        let projectInformation: ProjectInformation = new ProjectInformation(
          response['outProgress'],
          response['outCompletedTasks'],
          response['outTasksDelayed'],
          response['outTasksInProgress']
        );
        this.projectInformation = projectInformation;
      })
  }

}
