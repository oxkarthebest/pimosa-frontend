export class ProjectInformation {
  progress: number;
  tasksCompletes: number;
  tasksDelayed: number;
  tasksInProgress: number;

  constructor(
    progress: number,
    tasksCompletes: number,
    tasksDelayed: number,
    tasksInProgress: number
  ) {
    this.progress = progress;
    this.tasksCompletes = tasksCompletes;
    this.tasksDelayed = tasksDelayed;
    this.tasksInProgress = tasksInProgress;
  }
}
