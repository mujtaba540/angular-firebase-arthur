import { Routes } from '@angular/router';
import {
  HOME_UI_ROUTES,
  MESSAGES_UI_ROUTES,
} from './shared/constants/ui-routes';

export const ROUTES_INDEX: Routes = [
  {
    path: MESSAGES_UI_ROUTES.MAIN,
    loadChildren: () =>
      import('./pages/messages/messages.routing').then(
        (m) => m.MESSAGES_ROUTES
      ),
  },
  {
    path: HOME_UI_ROUTES.MAIN,
    loadChildren: () =>
      import('./pages/home/home.routing').then((m) => m.HOME_ROUTES),
  },
  {
    path: '**',
    redirectTo: HOME_UI_ROUTES.MAIN,
  },
];
