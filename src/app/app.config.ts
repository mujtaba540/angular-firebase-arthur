import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import {
  messageFeatureKey,
  messageReducer,
} from './pages/messages/store/reducers';
import { provideEffects } from '@ngrx/effects';
import { MessageEffects } from './pages/messages/store/effects';
import { firebaseConfig } from './shared/constants/secrets';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore(),
    provideState(messageFeatureKey, messageReducer),
    provideEffects(MessageEffects),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ],
};
