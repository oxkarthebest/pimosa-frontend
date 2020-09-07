import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MachineryDashboardComponent } from './machinery-dashboard/machinery-dashboard.component';
import { MachineryCreateComponent } from './machinery-create/machinery-create.component';
import { MachineryInformationComponent } from './machinery-information/machinery-information.component';
import { MachineryUpdateComponent } from './machinery-update/machinery-update.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MachineryConfigurationComponent } from './machinery-configuration/machinery-configuration.component';
import { ProjectDashboardComponent } from './project-dashboard/project-dashboard.component';
import { ProjectConfigurationComponent } from './project-configuration/project-configuration.component';
import { ProjectInformationComponent } from './project-information/project-information.component';
import { ProjectTasksComponent } from './project-tasks/project-tasks.component';
import { ProjectUpdateComponent } from './project-update/project-update.component';
import { TaskCreateComponent } from './task-create/task-create.component';
import { TaskUpdateComponent } from './task-update/task-update.component';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { ProjectMachineryComponent } from './project-machinery/project-machinery.component';

@NgModule({
  declarations: [
    AppComponent,
    MachineryDashboardComponent,
    MachineryCreateComponent,
    MachineryInformationComponent,
    MachineryUpdateComponent,
    MachineryConfigurationComponent,
    ProjectDashboardComponent,
    ProjectConfigurationComponent,
    ProjectInformationComponent,
    ProjectTasksComponent,
    ProjectUpdateComponent,
    TaskCreateComponent,
    TaskUpdateComponent,
    ProjectCreateComponent,
    ProjectMachineryComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
