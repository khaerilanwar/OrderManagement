import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling } from '@angular/router';
import Lara from '@primeng/themes/lara';
import { providePrimeNG } from 'primeng/config';
import { appRoutes } from './app.routes';
import { authInterceptor } from './app/interceptors/auth.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getDatabase, provideDatabase } from '@angular/fire/database';

export const appConfig: ApplicationConfig = {
    providers: [
        importProvidersFrom([BrowserAnimationsModule, NgxSpinnerModule]),
        provideRouter(appRoutes, withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }), withEnabledBlockingInitialNavigation()),
        provideHttpClient(withInterceptors([authInterceptor]), withFetch()),
        providePrimeNG({ theme: { preset: Lara, options: { darkModeSelector: '.app-dark' } } }),
        provideAnimationsAsync(),
        provideFirebaseApp(() => initializeApp({ projectId: "ormatest-dcf0b", appId: "1:494040766954:web:189cbe6757b8d7403efa93", storageBucket: "ormatest-dcf0b.firebasestorage.app", apiKey: "AIzaSyAJN5eOBsGTh9EIP2UpgAkoR6QRR_ZJkpA", authDomain: "ormatest-dcf0b.firebaseapp.com", messagingSenderId: "494040766954", measurementId: "G-ZVS7QFCBGR", databaseURL: 'https://ormatest-dcf0b-default-rtdb.asia-southeast1.firebasedatabase.app' })),
        provideDatabase(() => getDatabase())
    ]
};
