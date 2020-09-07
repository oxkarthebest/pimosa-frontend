export class Project {
  pk: string;
  code: string;
  name: string;
  purchaseOrder: string;
  description: string;
  industryPk: string;
  industry: string;
  startDate: string;
  plannedEndDate: string;
  endDate: string;
  statusPk: string;
  status: string;
  newProjectClass: string;
  updatedProjectClass: string;
  selectedProjectClass: string;
  statusClass: string;

  constructor(
    pk: string,
    code: string,
    name: string,
    purchaseOrder: string,
    description: string,
    industryPk: string,
    industry: string,
    startDate: string,
    plannedEndDate: string,
    endDate: string,
    statusPk: string,
    status: string
  ) {
    this.pk = pk;
    this.code = code;
    this.name = name;
    this.purchaseOrder = purchaseOrder;
    this.description = description;
    this.industryPk = industryPk;
    this.industry = industry;
    this.startDate = this.formatDate(startDate);
    this.plannedEndDate = this.formatDate(plannedEndDate);
    this.endDate = this.formatDate(endDate);
    this.statusPk = statusPk;
    this.status = status;
    this.newProjectClass = null;
    this.updatedProjectClass = null;
    this.selectedProjectClass = null;
    this.statusClass = null;
    this.assignStatusClass(status);
  }

  toggleNewProjectClass() {
    this.newProjectClass = 'card-primary-new';
  }

  toggleUpdatedProjectClass() {
    this.updatedProjectClass = 'card-primary-updated'
  }

  toggleSelectedProjectClass() {
    this.selectedProjectClass = 'card-primary-active'
  }

  toggleProjectClass() {
    this.newProjectClass = null;
    this.updatedProjectClass = null;
    this.selectedProjectClass = null;
  }

  updateProject(updatedProject: Project) {
    this.pk = updatedProject.pk;
    this.code = updatedProject.code;
    this.name = updatedProject.name;
    this.purchaseOrder = updatedProject.purchaseOrder;
    this.description = updatedProject.description;
    this.industryPk = updatedProject.industryPk;
    this.industry = updatedProject.industry;
    this.startDate = this.formatDate(updatedProject.startDate);
    this.plannedEndDate = this.formatDate(updatedProject.plannedEndDate);
    this.endDate = this.formatDate(updatedProject.endDate);
    this.statusPk = updatedProject.statusPk;
    this.status = updatedProject.status;
    this.newProjectClass = null;
    this.updatedProjectClass = null;
    this.selectedProjectClass = null;
  }

  private assignStatusClass(status: string) {
    switch (status) {
      case 'Retrasado':
        this.statusClass = 'card-status-delayed';
        break;
      case 'En Curso':
        this.statusClass = 'card-status-ongoing';
        break;
      case 'En Espera':
        this.statusClass = 'card-status-waiting';
        break;
      case 'Completado':
        this.statusClass = 'card-status-finished';
        break;
    }
  }

  private formatDate(date: string) {
    if (date != null) {
      return date.split('T')[0];
    } else {
      return null;
    }
  }
}
