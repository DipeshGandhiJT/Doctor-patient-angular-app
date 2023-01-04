import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './authorization/auth-guard/auth.guard';
import { LoginComponent } from './authorization/login/login.component';

import { BlankComponent } from './shared-component/blank/blank.component';

const routes: Routes = [
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: '',
        canActivate:[AuthGuard],
        loadChildren: () =>
          import('./layout/layout.module').then((m) => m.LayoutModule),
      },
    ],
  },
  {
    path:'login',
    component : LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
