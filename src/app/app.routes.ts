import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./faq/faq.component').then((m) => m.FaqComponent),
  },
];
