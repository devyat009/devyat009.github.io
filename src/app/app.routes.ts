import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./modules/pages/home/home.component').then((c) => c.HomeComponent)
  },
  // {
  //   path: 'work',
  //   loadComponent: () => import('./modules/pages/work/work.component').then((c) => c.WorkComponent)
  // },
  // {
  //   path: 'about',
  //   loadComponent: () => import('./modules/pages/about/about.component').then((c) => c.AboutComponent)
  // },
  // {
  //   path: 'contact',
  //   loadComponent: () => import('./modules/pages/contact/contact.component').then((c) => c.ContactComponent)
  // }
];
