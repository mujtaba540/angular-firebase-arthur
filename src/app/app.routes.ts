import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layouts/full-page/full-page.component').then(
        (m) => m.FullPageComponent
      ),
    loadChildren: () => import('./routing.index').then((m) => m.ROUTES_INDEX),
  },
];
