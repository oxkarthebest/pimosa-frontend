import { Component, OnInit } from '@angular/core';
import { Project } from '../models/project';
import { Subject } from 'rxjs';
import { ProjectService } from '../services/project-service/project.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrls: ['./project-dashboard.component.scss']
})
export class ProjectDashboardComponent implements OnInit {

  creationPanel: boolean = false;
  configurationPanel: boolean = false;
  projectList: Project[] = [];
  projectMasterList: Project[] = [];
  showList: number[] = [];
  filterText: string;
  filterTextChanged: Subject<string> = new Subject<string>();
  selectedProject: Project = null;

  constructor(
    private projectService: ProjectService
  ) {
    this.filterTextChanged.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe((value) => {
      this.projectList = [];
      this.filterText = value;
      this.projectMasterList.forEach((project) => {
        if (project.name.trim().toUpperCase().includes(this.filterText.trim().toUpperCase())) {
          this.projectList.push(project);
        }
      })
    });
  }

  ngOnInit() {
    this.getProjectList();
  }

  addNewProjectToList(newProject: Project) {
    newProject.toggleNewProjectClass();

    this.projectMasterList.unshift(newProject);
    this.generateShowingList(this.projectMasterList);

    setTimeout(() => {
      this.projectList.forEach((project) => {
        if (project.pk === newProject.pk) {
          project.toggleProjectClass();
        }
      });
    }, 2000);
  }

  filterByName(text: string) {
    this.filterTextChanged.next(text);
  }

  showConfigurationPanel(project: Project) {
    this.creationPanel = false;
    this.configurationPanel = true;
    this.selectedProject = project;

    this.projectList.forEach((project) => {
      if (project.pk === this.selectedProject.pk) {
        project.toggleSelectedProjectClass();
      }
      else {
        project.toggleProjectClass();
      }
    });
  }

  showCreationPanel() {
    this.creationPanel = true;
    this.configurationPanel = false;
    this.selectedProject = null;

    this.projectList.forEach((project) => {
      project.toggleProjectClass();
    });
  }

  showingListChange(value) {
    if (0 === parseInt(value)) {
      this.projectList = [...this.projectMasterList];
    } else {
      this.projectList = [...this.projectMasterList].slice(0, parseInt(value));
    }
  }

  updateProjectList(updatedProject: Project) {
    this.projectList.forEach((project) => {
      if (project.pk === updatedProject.pk) {
        project.updateProject(updatedProject);
        project.toggleUpdatedProjectClass();
      }
    });

    setTimeout(() => {
      this.projectList.forEach((project) => {
        if (project.pk === updatedProject.pk) {
          project.toggleSelectedProjectClass();
        }
      });
    }, 2000);
  }

  private generateShowingList(projectMasterList: Project[]) {
    this.showList = [];
    let factor = Math.ceil(projectMasterList.length / 5);
    if (factor >= 1) {
      for (let i = 1; i <= factor; i++) {
        this.showList.push((i * 5));
      }
      this.projectList = [...this.projectMasterList].slice(0, 5);
    } else {
      this.showList.push(5);
      this.projectList = [...this.projectMasterList];
    }

    if (this.projectMasterList.length > 0) {
      console.log(`Selecting Project`);
      this.selectedProject = this.projectMasterList[0];
      this.showConfigurationPanel(this.selectedProject);
    }
  }

  private getProjectList(): void {
    this.projectService.getProjectList()
      .subscribe((response) => {
        let project: Project = null;
        response.forEach((element) => {
          project = new Project(
            element['PK'],
            element['Code'],
            element['Name'],
            element['PurchaseOrder'],
            element['Description'],
            element['IndustryPK'],
            element['Industry'],
            element['StartDate'],
            element['PlannedEndDate'],
            element['EndDate'],
            element['StatusPK'],
            element['Status']
          );
          this.projectMasterList.push(project);
        });
        this.generateShowingList(this.projectMasterList);
      });
  }
}
