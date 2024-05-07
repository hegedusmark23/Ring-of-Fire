import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideClientHydration(), 
    provideAnimationsAsync(), 
    importProvidersFrom(provideFirebaseApp(() => initializeApp({ "projectId": "ringoffire-e55ae", "appId": "1:96819023150:web:295d01c63e131c1e94bebf", "storageBucket": "ringoffire-e55ae.appspot.com", "apiKey": "AIzaSyCs7zhNu0ZDH8Reg4KozRpyTArLyBMnZvg", "authDomain": "ringoffire-e55ae.firebaseapp.com", "messagingSenderId": "96819023150", "measurementId": "G-V3SKC69FQM" }))), 
    importProvidersFrom(provideFirestore(() => getFirestore()))
  ]
};
