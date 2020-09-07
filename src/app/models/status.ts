export class ProjectStatus {
  pk: string;
  name: string;

  constructor(pk: string, name: string) {
    this.pk = pk;
    this.name = name;
  }
}

export class TaskStatus {
  pk: string;
  name: string;

  constructor(pk: string, name: string) {
    this.pk = pk;
    this.name = name;
  }
}
