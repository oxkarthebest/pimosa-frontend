import { MachineryDashboardComponent } from './machinery-dashboard/machinery-dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectDashboardComponent } from './project-dashboard/project-dashboard.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/management/projects',
    pathMatch: 'full'
  },
  {
    path: 'management/machinery',
    component: MachineryDashboardComponent
  },
  {
    path: 'management/projects',
    component: ProjectDashboardComponent
  },
  {
    path: '**',
    redirectTo: '/management/projects',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
