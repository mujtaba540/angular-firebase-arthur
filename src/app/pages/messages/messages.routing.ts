import { Routes } from '@angular/router';

export const MESSAGES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/messages-listing/messages-listing.component').then(
        (m) => m.MessagesListingComponent
      ),
  },
];
