import { Machinery } from 'src/app/models/machinery';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Project } from '../models/project';
import { MachineryService } from '../services/machinery-service/machinery.service';

@Component({
  selector: 'app-machinery-information',
  templateUrl: './machinery-information.component.html',
  styleUrls: ['./machinery-information.component.scss']
})
export class MachineryInformationComponent implements OnInit, OnChanges {

  @Input() machinery: Machinery;
  projectList: Project[] = [];

  constructor(private machineryService: MachineryService) { }

  ngOnInit() {
    this.getMachineryProjectList();
  }

  ngOnChanges(changes: SimpleChanges) {
    let previousMachinery: Machinery = changes['machinery']['previousValue'];
    let currentMachinery: Machinery = changes['machinery']['currentValue'];

    if (this.machinery != undefined && previousMachinery != undefined) {
      if (previousMachinery.pk !== currentMachinery.pk) {
        this.machinery = currentMachinery;
        this.getMachineryProjectList();
      }
    }
  }

  private getMachineryProjectList() {
    this.projectList = [];
    this.machineryService.getMachineryProjectList(this.machinery.pk)
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
          this.projectList.push(project);
        });
      });
  }
}
