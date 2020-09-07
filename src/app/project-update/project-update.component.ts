import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Project } from '../models/project';
import { Validators, FormBuilder } from '@angular/forms';
import { ProjectService } from '../services/project-service/project.service';
import { Industry } from '../models/industry';
import { UpdateProjectResponse } from '../models/responses';

@Component({
  selector: 'app-project-update',
  templateUrl: './project-update.component.html',
  styleUrls: ['./project-update.component.scss']
})
export class ProjectUpdateComponent implements OnInit {
  @Input() project: Project;
  @Output() projectUpdatedEvent = new EventEmitter<Project>();
  industryList: Industry[] = [];
  successAlertMessage: string = null;
  errorAlertMessage: string = null;
  updateProjectForm = this.formBuilder.group({
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
    this.updateProjectForm.setValue({
      'name': this.project.name,
      'code': this.project.code,
      'purchaseOrder': this.project.purchaseOrder,
      'description': this.project.description,
      'industry': this.project.industryPk,
      'startDate': this.project.startDate,
      'plannedEndDate': this.project.plannedEndDate
    });
  }

  closeErrorAlert() {
    this.errorAlertMessage = null;
  }

  closeSuccessAlert() {
    this.successAlertMessage = null;
  }

  submitUpdateProjectForm() {
    let name = this.updateProjectForm.value.name;
    let code = this.updateProjectForm.value.code;
    let purchaseOrder = this.updateProjectForm.value.purchaseOrder;
    let description = this.updateProjectForm.value.description;
    let industry = this.updateProjectForm.value.industry;
    let startDate = this.updateProjectForm.value.startDate;
    let plannedEndDate = this.updateProjectForm.value.plannedEndDate;

    this.projectService.updateProject(
      this.project.pk,
      name,
      code,
      purchaseOrder,
      description,
      industry,
      startDate,
      plannedEndDate
    ).subscribe((response) => {
      let updatedProjectResponse: UpdateProjectResponse = new UpdateProjectResponse(
        response['outUpdated'],
        response['outMessage'],
      );
      this.resetAlerts();

      if (updatedProjectResponse.updated) {
        this.successAlertMessage = updatedProjectResponse.message;
        this.getProject(this.project.pk);
      } else {
        this.errorAlertMessage = updatedProjectResponse.message;
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
        console.log(`Showing response`);
        console.log(response);
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
        this.notifyProjectUpdateEvent(project);
      });
  }

  private notifyProjectUpdateEvent(updatedProject: Project) {
    console.log(updatedProject);
    this.projectUpdatedEvent.emit(updatedProject);
  }

  private resetAlerts() {
    this.successAlertMessage = null;
    this.errorAlertMessage = null;
  }

}
