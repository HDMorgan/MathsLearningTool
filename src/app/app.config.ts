import {
	APP_INITIALIZER,
	ApplicationConfig,
	importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAuth, getAuth, Auth } from '@angular/fire/auth';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { environment } from '../environments/environment';

export function initializeAuth(auth: Auth): Promise<void> {
	return new Promise<void>((resolve, reject) => {
		auth.onAuthStateChanged(
			() => {
				resolve();
			},
			(error) => {
				reject(error);
			}
		);
	});
}

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
		{
			provide: APP_INITIALIZER,
			useFactory: (auth: Auth) => () => initializeAuth(auth),
			multi: true,
			deps: [Auth],
		},
	],
};
