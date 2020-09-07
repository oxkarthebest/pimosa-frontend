export class Machinery {
    pk: string;
    code: string;
    name: string;
    brand: string;
    price: number;
    maintenanceCost: number;
    acquisitionDate: string;
    typePk: string;
    type: string;
    powerSourcePk: string;
    powerSource: string;
    displacementPk: string;
    displacement: string;
    operationPk: string;
    operation: string;
    workPk: string;
    work: string;
    newMachineryClass: string;
    updatedMachineryClass: string;
    selectedMachineryClass: string;

    constructor(
        pk: string,
        code: string,
        name: string,
        brand: string,
        price: number,
        maintenanceCost: number,
        acquisitionDate: string,
        typePk: string,
        type: string,
        powerSourcePk: string,
        powerSource: string,
        displacementPk: string,
        displacement: string,
        operationPk: string,
        operation: string,
        workPk: string,
        work: string            
    ){
        this.pk = pk;
        this.code = code;
        this.name = name;
        this.brand = brand;
        this.price = price;
        this.maintenanceCost = maintenanceCost;
        this.acquisitionDate = this.formatDate(acquisitionDate);
        this.typePk = typePk;
        this.type = type;
        this.powerSourcePk = powerSourcePk;
        this.powerSource = powerSource;
        this.displacementPk = displacementPk;
        this.displacement = displacement;
        this.operationPk = operationPk;
        this.operation = operation;
        this.workPk = workPk;
        this.work = work     
        this.newMachineryClass = null;
        this.updatedMachineryClass = null;
        this.selectedMachineryClass = null;       
    }

    toggleNewMachineryClass(){
        this.newMachineryClass = 'card-primary-new';
    }

    toggleUpdatedMachineryClass(){
        this.updatedMachineryClass = 'card-primary-updated'
    }
    
    toggleSelectedMachineryClass(){
        this.selectedMachineryClass = 'card-primary-active'
    }

    toggleMachineryClass(){
        this.newMachineryClass = null;
        this.updatedMachineryClass = null;
        this.selectedMachineryClass = null;
    }

    updateMachinery(machinery: Machinery){
        this.pk = machinery.pk;
        this.code = machinery.code;
        this.name = machinery.name;
        this.brand = machinery.brand;
        this.price = machinery.price;
        this.maintenanceCost = machinery.maintenanceCost;
        this.acquisitionDate = this.formatDate(machinery.acquisitionDate);
        this.typePk = machinery.typePk;
        this.type = machinery.type;
        this.powerSourcePk = machinery.powerSourcePk;
        this.powerSource = machinery.powerSource;
        this.displacementPk = machinery.displacementPk;
        this.displacement = machinery.displacement;
        this.operationPk = machinery.operationPk;
        this.operation = machinery.operation;
        this.workPk = machinery.workPk;
        this.work = machinery.work     
        this.newMachineryClass = null;
        this.updatedMachineryClass = null;
        this.selectedMachineryClass = null;      
    }

    private formatDate(date: string){
        if (date != null){
            return date.split('T')[0];
        }else{
            return null;
        }
    }
}