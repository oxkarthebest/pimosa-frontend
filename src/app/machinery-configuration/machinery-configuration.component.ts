import { Machinery } from 'src/app/models/machinery';
import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-machinery-configuration',
  templateUrl: './machinery-configuration.component.html',
  styleUrls: ['./machinery-configuration.component.scss']
})
export class MachineryConfigurationComponent implements OnInit, OnChanges {

  @Input() machinery: Machinery;
  @Output() machineryUpdatedEvent = new EventEmitter<Machinery>();

  showInformation: boolean = false;
  showModify: boolean = false;

  constructor() { }

  ngOnInit() {
    this.showInformation = true;
  }

  ngOnChanges(changes: SimpleChanges) {
    let previousMachinery: Machinery = changes['machinery']['previousValue'];
    let currentMachinery: Machinery = changes['machinery']['currentValue'];

    if (this.machinery != undefined && previousMachinery != undefined) {
      if (previousMachinery.pk !== currentMachinery.pk) {
        this.machinery = currentMachinery;
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
        this.showModify = true;
        break;
      default:
        this.showInformation = true;
        break;
    }
  }

  notifyOfMachineryUpdateEvent(updatedMachinery: Machinery){
    this.machineryUpdatedEvent.emit(updatedMachinery);
  } 

  private resetNavigation() {
    this.showInformation = false;
    this.showModify = false;
  }
}
