import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from '../component/dashboard/dashboard.component';
import { OpdComponent } from '../component/opd/opd.component';
import { PatientsComponent } from '../component/patients/patients.component';
import { FullLayoutComponent } from './full-layout/full-layout.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: '',
    component: FullLayoutComponent, // LayoutComponent
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'clients', component: PatientsComponent },
      { path: 'opd', component: OpdComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {} 
