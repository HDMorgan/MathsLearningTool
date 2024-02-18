import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(routes),
		provideAnimations(),
		provideHttpClient(),
		importProvidersFrom(
			provideFirebaseApp(() => initializeApp(environment.firebaseConfig))
		),
		importProvidersFrom(provideAuth(() => getAuth())),
		importProvidersFrom(provideFirestore(() => getFirestore())),
		importProvidersFrom(provideStorage(() => getStorage())),
	],
};
