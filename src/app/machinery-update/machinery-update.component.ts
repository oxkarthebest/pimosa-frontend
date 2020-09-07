import { UpdateMachineryResponse } from './../models/responses';
import { Displacement } from './../models/displacement';
import { Operation } from './../models/operation';
import { PowerSource } from './../models/power-source';
import { Work } from './../models/work';
import { MachineryType } from './../models/machinery-type';
import { MachineryService } from './../services/machinery-service/machinery.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Machinery } from '../models/machinery';

@Component({
  selector: 'app-machinery-update',
  templateUrl: './machinery-update.component.html',
  styleUrls: ['./machinery-update.component.scss']
})
export class MachineryUpdateComponent implements OnInit {

  @Input() machinery: Machinery;
  @Output() machineryUpdatedEvent = new EventEmitter<Machinery>();

  displacementList: Displacement[] = [];
  machineryTypeList: MachineryType[] = [];
  operationList: Operation[] = [];
  powerSourceList: PowerSource[] = [];
  workList: Work[] = [];

  successAlertMessage: string = null;
  errorAlertMessage: string = null;

  updateMachineryForm = this.formBuilder.group({
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
        Validators.maxLength(254),
        Validators.minLength(2)
      ]
    ],
    brand: [
      '',
      [
        Validators.maxLength(254),
        Validators.minLength(2)
      ]
    ],
    price: [
      '',
      [
        Validators.maxLength(8),
        Validators.minLength(2)
      ]
    ],
    maintenanceCost: [
      '',
      [
        Validators.maxLength(8),
        Validators.minLength(2)
      ]
    ],
    acquisitionDate: [
      '',
      []
    ],
    type: [
      '',
      [
        Validators.required
      ]
    ],
    powerSource: [
      '',
      [
        Validators.required
      ]
    ],
    displacement: [
      '',
      [
        Validators.required
      ]
    ],
    operation: [
      '',
      [
        Validators.required
      ]
    ],
    work: [
      '',
      [
        Validators.required
      ]
    ]
  });

  constructor(
    private formBuilder: FormBuilder,
    private machineryService: MachineryService
  ) { }

  ngOnInit() {
    this.getDisplacementList();
    this.getMachineryTypeList();
    this.getOperationList();
    this.getPowerSourceList();
    this.getWorkList();

    this.updateMachineryForm.setValue({
      name: this.machinery.name,
      code: this.machinery.code,
      brand: this.machinery.brand,
      price: this.machinery.price,
      maintenanceCost: this.machinery.maintenanceCost,
      acquisitionDate: this.machinery.acquisitionDate,
      type: this.machinery.typePk,
      powerSource: this.machinery.powerSourcePk,
      displacement: this.machinery.displacementPk,
      operation: this.machinery.operationPk,
      work: this.machinery.workPk
    });
  }

  closeErrorAlert() {
    this.errorAlertMessage = null;
  }

  closeSuccessAlert() {
    this.successAlertMessage = null;
  }

  submitUpdateMachineryForm() {
    let code = this.updateMachineryForm.value.code;
    let name = this.updateMachineryForm.value.name;
    let brand = this.updateMachineryForm.value.brand;
    let price = this.updateMachineryForm.value.price;
    let maintenanceCost = this.updateMachineryForm.value.maintenanceCost;
    let acquisitionDate = this.updateMachineryForm.value.acquisitionDate;
    let type = this.updateMachineryForm.value.type;
    let powerSource = this.updateMachineryForm.value.powerSource;
    let displacement = this.updateMachineryForm.value.displacement;
    let operation = this.updateMachineryForm.value.operation;
    let work = this.updateMachineryForm.value.work;

    this.updateMachinery(
      this.machinery.pk,
      code,
      name,
      brand,
      price,
      maintenanceCost,
      acquisitionDate,
      type,
      powerSource,
      displacement,
      operation,
      work
    );
  }

  private getDisplacementList() {
    this.displacementList = [];
    this.machineryService.getDisplacementList()
      .subscribe((response) => {
        let displacement: Displacement = null;
        response.forEach((element) => {
          displacement = new Displacement(
            element['PK'],
            element['Name']
          );
          this.displacementList.push(displacement);
        });
      });
  }

  private getMachinery(machineryPk: string) {
    this.machineryService.getMachinery(machineryPk)
      .subscribe((response) => {
        let machinery: Machinery = new Machinery(
          response[0]['PK'],
          response[0]['Code'],
          response[0]['Name'],
          response[0]['Brand'],
          response[0]['Price'],
          response[0]['MaintenanceCost'],
          response[0]['AcquisitionDate'],
          response[0]['MachineryTypePK'],
          response[0]['MachineryType'],
          response[0]['PowerSourcePK'],
          response[0]['PowerSource'],
          response[0]['DisplacementPK'],
          response[0]['Displacement'],
          response[0]['OperationPK'],
          response[0]['Operation'],
          response[0]['WorkPK'],
          response[0]['Work']
        );
        this.notifyMachineryUpdatedEvent(machinery);
      });
  }

  private getMachineryTypeList() {
    this.machineryTypeList = [];
    this.machineryService.getMachineryTypeList()
      .subscribe((response) => {
        let machineryType: MachineryType = null;
        response.forEach((element) => {
          machineryType = new MachineryType(
            element['PK'],
            element['Name']
          );
          this.machineryTypeList.push(machineryType);
        });
      });
  }

  private getOperationList() {
    this.operationList = [];
    this.machineryService.getOperationList()
      .subscribe((response) => {
        let operation: Operation = null;
        response.forEach((element) => {
          operation = new Operation(
            element['PK'],
            element['Name']
          );
          this.operationList.push(operation);
        });
      });
  }

  private getPowerSourceList() {
    this.powerSourceList = [];
    this.machineryService.getPowerSourceList()
      .subscribe((response) => {
        let powerSource: PowerSource = null;
        response.forEach((element) => {
          powerSource = new PowerSource(
            element['PK'],
            element['Name']
          );
          this.powerSourceList.push(powerSource);
        });
      });
  }

  private getWorkList() {
    this.workList = [];
    this.machineryService.getWorkList()
      .subscribe((response) => {
        let work: Work = null;
        response.forEach((element) => {
          work = new Work(
            element['PK'],
            element['Name']
          );
          this.workList.push(work);
        });
      });
  }

  private notifyMachineryUpdatedEvent(updatedMachinery: Machinery) {
    this.machineryUpdatedEvent.emit(updatedMachinery);
  }

  private resetAlerts() {
    this.successAlertMessage = null;
    this.errorAlertMessage = null;
  }

  private updateMachinery(
    pk: string,
    code: string,
    name: string,
    brand: string,
    price: number,
    maintenanceCost: number,
    acquisitionDate: string,
    type: string,
    powerSource: string,
    displacement: string,
    operation: string,
    work: string
  ) {
    this.machineryService.updateMachinery(
      pk,
      code,
      name,
      brand,
      price,
      maintenanceCost,
      acquisitionDate,
      type,
      powerSource,
      displacement,
      operation,
      work
    ).subscribe((response) => {
      let updateMachineryResponse: UpdateMachineryResponse = new UpdateMachineryResponse(
        response['outUpdated'],
        response['outMessage']
      );

      this.resetAlerts();

      if (updateMachineryResponse.updated) {
        this.successAlertMessage = updateMachineryResponse.message;
        this.getMachinery(this.machinery.pk);
      } else {
        this.errorAlertMessage = updateMachineryResponse.message;
      }
      window.scrollTo(0, 0);
    })
  }
}
