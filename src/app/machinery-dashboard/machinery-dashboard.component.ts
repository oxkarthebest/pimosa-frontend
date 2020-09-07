import { MachineryService } from './../services/machinery-service/machinery.service';
import { Machinery } from './../models/machinery';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-machinery-dashboard',
  templateUrl: './machinery-dashboard.component.html',
  styleUrls: ['./machinery-dashboard.component.scss']
})
export class MachineryDashboardComponent implements OnInit {

  creationPanel: boolean = false;
  configurationPanel: boolean = false;

  machineryList: Machinery[] = [];
  machineryMasterList: Machinery[] = [];

  showList: number[] = [];

  filterText: string;
  filterTextChanged: Subject<string> = new Subject<string>();

  selectedMachinery: Machinery = null;

  constructor(
    private machineryService: MachineryService
  ) {
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

  showConfigurationPanel(machinery: Machinery) {
    this.creationPanel = false;
    this.configurationPanel = true;
    this.selectedMachinery = machinery;

    this.machineryList.forEach((machinery) => {
      if (machinery.pk === this.selectedMachinery.pk){
        machinery.toggleSelectedMachineryClass();
      }
      else{
        machinery.toggleMachineryClass();
      }
    });
  }  

  showCreationPanel() {
    this.creationPanel = true;
    this.configurationPanel = false;
    this.selectedMachinery = null;

    this.machineryList.forEach((machinery) => {
        machinery.toggleMachineryClass();
    });
  }

  showingListChange(value) {
    if (0 === parseInt(value)) {
      this.machineryList = [...this.machineryMasterList];
    } else {
      this.machineryList = [...this.machineryMasterList].slice(0, parseInt(value));
    }
  }

  filterByName(text: string) {
    this.filterTextChanged.next(text);
  }  

  updateMachineryList(updatedMachinery: Machinery){
    this.machineryList.forEach((machinery) => {
      if (machinery.pk === updatedMachinery.pk){
        machinery.updateMachinery(updatedMachinery);
        machinery.toggleUpdatedMachineryClass();
      }
    });

    setTimeout(() => {
      this.machineryList.forEach((machinery) => {
        if (machinery.pk === updatedMachinery.pk) {
          machinery.toggleSelectedMachineryClass();
        }
      });
    }, 2000);
  }

  private getMachineryList(): void {
    this.machineryService.getMachineryList()
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

}
