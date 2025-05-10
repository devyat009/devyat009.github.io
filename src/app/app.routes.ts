import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./modules/pages/login/login.component').then((c) => c.LoginComponent)
  }
];
