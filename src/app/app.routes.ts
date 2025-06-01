import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./modules/pages/home/home.component').then((c) => c.HomeComponent)
  },
  {
    path: 'projects',
    loadComponent: () => import('./modules/pages/projects/projects.component').then((c) => c.ProjectsComponent)
  },
  {
    path: 'about',
    loadComponent: () => import('./modules/pages/about/about.component').then((c) => c.AboutComponent)
  },
  {
    path: 'contact',
    loadComponent: () => import('./modules/pages/contact/contact.component').then((c) => c.ContactComponent)
  },
  {
    path: '**',
    loadComponent: () => import('./modules/pages/not-found/not-found.component').then((c) => c.NotFoundComponent)
  }
];
