import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Project } from '../models/project';
import { Industry } from '../models/industry';
import { FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from '../services/project-service/project.service';
import { CreateProjectResponse } from '../models/responses';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss']
})
export class ProjectCreateComponent implements OnInit {
  @Output() projectCreatedEvent = new EventEmitter<Project>();
  industryList: Industry[] = [];
  successAlertMessage: string = null;
  errorAlertMessage: string = null;
  newProjectForm = this.formBuilder.group({
    name: [
      '',
      [
        Validators.required,
        Validators.maxLength(254),
        Validators.minLength(2)
      ]
    ],
    code: [
      '',
      [
        Validators.required,
        Validators.maxLength(124),
        Validators.minLength(2)
      ]
    ],
    purchaseOrder: [
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
        Validators.maxLength(400),
        Validators.minLength(2)
      ]
    ],
    industry: [
      '',
      [
        Validators.required
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
    private projectService: ProjectService
  ) { }

  ngOnInit() {
    this.getIndustryList();
  }

  closeErrorAlert() {
    this.errorAlertMessage = null;
  }

  closeSuccessAlert() {
    this.successAlertMessage = null;
  }

  submitNewProjectForm() {
    let name = this.newProjectForm.value.name;
    let code = this.newProjectForm.value.code;
    let purchaseOrder = this.newProjectForm.value.purchaseOrder;
    let description = this.newProjectForm.value.description;
    let industry = this.newProjectForm.value.industry;
    let startDate = this.newProjectForm.value.startDate;
    let plannedEndDate = this.newProjectForm.value.plannedEndDate;

    this.projectService.createProject(
      name,
      code,
      purchaseOrder,
      description,
      industry,
      startDate,
      plannedEndDate
    ).subscribe((response) => {
      let createProjectResponse: CreateProjectResponse = new CreateProjectResponse(
        response['outCreated'],
        response['outMessage'],
        response['outProjectPk']
      );
      this.resetAlerts();

      if (createProjectResponse.created) {
        this.successAlertMessage = createProjectResponse.message;
        this.getProject(createProjectResponse.projectPk);
        this.newProjectForm.reset();
      } else {
        this.errorAlertMessage = createProjectResponse.message;
      }
    });
  }

  private getIndustryList() {
    this.industryList = [];
    this.projectService.getIndustryList()
      .subscribe((response) => {
        let industry: Industry = null;
        response.forEach((element) => {
          industry = new Industry(
            element['PK'],
            element['Name']
          );
          this.industryList.push(industry);
        });
      });
  }

  private getProject(projectPk: string) {
    this.projectService.getProject(projectPk)
      .subscribe((response) => {
        let project: Project = new Project(
          response[0]['PK'],
          response[0]['Code'],
          response[0]['Name'],
          response[0]['PurchaseOrder'],
          response[0]['Description'],
          response[0]['IndustryPK'],
          response[0]['Industry'],
          response[0]['StartDate'],
          response[0]['PlannedEndDate'],
          response[0]['EndDate'],
          response[0]['StatusPK'],
          response[0]['Status']
        );
        this.notifyProjectCreatedEvent(project);
      });
  }

  private notifyProjectCreatedEvent(createdProject: Project) {
    this.projectCreatedEvent.emit(createdProject);
  }

  private resetAlerts() {
    this.successAlertMessage = null;
    this.errorAlertMessage = null;
  }
}
