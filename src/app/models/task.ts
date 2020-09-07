export class Task {
  pk: string;
  name: string;
  description: string;
  startDate: string;
  plannedEndDate: string;
  endDate: string;
  statusPk: string;
  status: string;
  newTaskClass: string;
  updatedTaskClass: string;
  selectedTaskClass: string;
  statusClass: string;

  constructor(
    pk: string,
    name: string,
    description: string,
    startDate: string,
    plannedEndDate: string,
    endDate: string,
    statusPk: string,
    status: string
  ) {
    this.pk = pk;
    this.name = name;
    this.description = description;
    this.startDate = this.formatDate(startDate);
    this.plannedEndDate = this.formatDate(plannedEndDate);
    this.endDate = this.formatDate(endDate);
    this.statusPk = statusPk;
    this.status = status;
    this.newTaskClass = null;
    this.updatedTaskClass = null;
    this.selectedTaskClass = null;
    this.statusClass = null;
    this.assignStatusClass(status);
  }

  toggleNewTaskClass() {
    this.newTaskClass = 'card-primary-new';
  }

  toggleUpdatedTaskClass() {
    this.updatedTaskClass = 'card-primary-updated'
  }

  toggleSelectedTaskClass() {
    this.selectedTaskClass = 'card-primary-active'
  }

  toggleTaskClass() {
    this.newTaskClass = null;
    this.updatedTaskClass = null;
    this.selectedTaskClass = null;
  }

  updateTask(updatedTask: Task) {
    this.pk = updatedTask.pk;
    this.name = updatedTask.name;
    this.description = updatedTask.description;
    this.startDate = this.formatDate(updatedTask.startDate);
    this.plannedEndDate = this.formatDate(updatedTask.plannedEndDate);
    this.endDate = this.formatDate(updatedTask.endDate);
    this.statusPk = updatedTask.statusPk;
    this.status = updatedTask.status;
    this.newTaskClass = null;
    this.updatedTaskClass = null;
    this.selectedTaskClass = null;
  }

  assignStatusClass(status: string) {
    switch (status) {
      case 'Retrasada':
        this.statusClass = 'card-status-delayed';
        break;
      case 'En curso':
        this.statusClass = 'card-status-ongoing';
        break;
      case 'Completada':
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
