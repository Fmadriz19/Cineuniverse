import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"usuarios-db-fcb27","appId":"1:360350059722:web:cc2c89f7c5eafbf414f833","storageBucket":"usuarios-db-fcb27.appspot.com","apiKey":"AIzaSyBGpyBbI82fxD5q5QirUFFkHAcR6hnI2Z0","authDomain":"usuarios-db-fcb27.firebaseapp.com","messagingSenderId":"360350059722"}))), importProvidersFrom(provideStorage(() => getStorage()))]
};
