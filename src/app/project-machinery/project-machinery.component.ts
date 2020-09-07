import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Project } from '../models/project';
import { Machinery } from '../models/machinery';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ProjectService } from '../services/project-service/project.service';
import { AddMachineryToProjectResponse, DeleteMachineryFromProjectResponse } from '../models/responses';

@Component({
  selector: 'app-project-machinery',
  templateUrl: './project-machinery.component.html',
  styleUrls: ['./project-machinery.component.scss']
})
export class ProjectMachineryComponent implements OnInit, OnChanges {
  @Input() project: Project;
  machineryList: Machinery[] = [];
  machineryListToAdd: Machinery[] = [];
  machineryMasterList: Machinery[] = [];
  showList: number[] = [];
  filterText: string;
  filterTextChanged: Subject<string> = new Subject<string>();
  machineryToAdd: Machinery = null;
  machineryToDelete: Machinery = null;
  successAlertMessage: string = null;
  errorAlertMessage: string = null;

  constructor(private projectService: ProjectService) {
    this.filterTextChanged.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe((value) => {
      this.machineryList = [];
      this.filterText = value;
      this.machineryMasterList.forEach((machinery) => {
        if (machinery.name.trim().toUpperCase().includes(this.filterText.trim().toUpperCase())) {
          this.machineryList.push(machinery);
        }
      })
    });
  }

  ngOnInit() {
    this.getMachineryList();
    this.getMachineryListToAdd();
  }

  ngOnChanges(changes: SimpleChanges) {
    let previousProject: Project = changes['project']['previousValue'];
    let currentProject: Project = changes['project']['currentValue'];

    if (this.project != undefined && previousProject != undefined) {
      if (previousProject.pk !== currentProject.pk) {
        this.project = currentProject;
        this.getMachineryList();
        this.getMachineryListToAdd();
      }
    }
  }

  addMachineryToProject() {
    if (this.machineryToAdd != null) {
      this.projectService.addMachineryToProject(this.machineryToAdd.pk, this.project.pk)
        .subscribe((response) => {
          let addMachineryToProjectResponse: AddMachineryToProjectResponse = new AddMachineryToProjectResponse(
            response['outCreated'],
            response['outMessage']
          );
          this.resetAlerts();

          if (addMachineryToProjectResponse.created) {
            this.successAlertMessage = addMachineryToProjectResponse.message;
            this.getMachineryListToAdd();
            this.addNewMachineryToList(this.machineryToAdd);
          } else {
            this.errorAlertMessage = addMachineryToProjectResponse.message;
          }
        });
    }
  }

  addNewMachineryToList(newMachinery: Machinery) {
    newMachinery.toggleNewMachineryClass();

    this.machineryMasterList.unshift(newMachinery);
    this.generateShowingList(this.machineryMasterList);

    setTimeout(() => {
      this.machineryList.forEach((machinery) => {
        if (machinery.pk === newMachinery.pk) {
          machinery.toggleMachineryClass();
        }
      });
    }, 2000);
  }

  closeErrorAlert() {
    this.errorAlertMessage = null;
  }

  closeSuccessAlert() {
    this.successAlertMessage = null;
  }

  deleteMachineryFromProject() {
    if (this.machineryToDelete != null) {
      this.projectService.deleteMachineryFromProject(this.machineryToDelete.pk, this.project.pk)
        .subscribe((response) => {
          let deleteMachineryFromProjectResponse: DeleteMachineryFromProjectResponse = new DeleteMachineryFromProjectResponse(
            response['outDeleted'],
            response['outMessage']
          );
          this.resetAlerts();

          if (deleteMachineryFromProjectResponse.deleted) {
            this.successAlertMessage = deleteMachineryFromProjectResponse.message;
            this.getMachineryListToAdd();
            this.getMachineryList();
            this.machineryToDelete = null;
          } else {
            this.errorAlertMessage = deleteMachineryFromProjectResponse.message;
          }
        });
    }
  }

  filterByName(text: string) {
    this.filterTextChanged.next(text);
  }

  selectingMachineryToAdd(machineryPk: string) {
    this.machineryListToAdd.forEach((machinery) => {
      if (machinery.pk === machineryPk) {
        this.machineryToAdd = machinery;
      }
    });
  }

  setMachineryToDelete(machineryToDelete: Machinery) {
    this.machineryToDelete = machineryToDelete;
  }

  showingListChange(value) {
    if (0 === parseInt(value)) {
      this.machineryList = [...this.machineryMasterList];
    } else {
      this.machineryList = [...this.machineryMasterList].slice(0, parseInt(value));
    }
  }

  private getMachineryList(): void {
    this.machineryMasterList = [];
    this.projectService.getProjectMachineryList(this.project.pk)
      .subscribe((response) => {
        let machinery: Machinery = null;
        response.forEach((element) => {
          machinery = new Machinery(
            element['PK'],
            element['Code'],
            element['Name'],
            element['Brand'],
            element['Price'],
            element['MaintenanceCost'],
            element['AcquisitionDate'],
            element['MachineryTypePK'],
            element['MachineryType'],
            element['PowerSourcePK'],
            element['PowerSource'],
            element['DisplacementPK'],
            element['Displacement'],
            element['OperationPK'],
            element['Operation'],
            element['WorkPK'],
            element['Work']
          );
          this.machineryMasterList.push(machinery);
        });
        this.generateShowingList(this.machineryMasterList);
      });
  }

  private getMachineryListToAdd(): void {
    this.machineryListToAdd = [];
    this.projectService.getProjectMachineryToAddList(this.project.pk)
      .subscribe((response) => {
        let machinery: Machinery = null;
        response.forEach((element) => {
          machinery = new Machinery(
            element['PK'],
            element['Code'],
            element['Name'],
            element['Brand'],
            element['Price'],
            element['MaintenanceCost'],
            element['AcquisitionDate'],
            element['MachineryTypePK'],
            element['MachineryType'],
            element['PowerSourcePK'],
            element['PowerSource'],
            element['DisplacementPK'],
            element['Displacement'],
            element['OperationPK'],
            element['Operation'],
            element['WorkPK'],
            element['Work']
          );
          this.machineryListToAdd.push(machinery);
        });
      });
  }

  private generateShowingList(machineryMasterList: Machinery[]) {
    this.showList = [];
    let factor = Math.ceil(machineryMasterList.length / 5);
    if (factor >= 1) {
      for (let i = 1; i <= factor; i++) {
        this.showList.push((i * 5));
      }
      this.machineryList = [...this.machineryMasterList].slice(0, 5);
    } else {
      this.showList.push(5);
      this.machineryList = [...this.machineryMasterList];
    }
  }

  private resetAlerts() {
    this.successAlertMessage = null;
    this.errorAlertMessage = null;
  }

}
