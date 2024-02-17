import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(routes),
		provideAnimations(),
		provideHttpClient(),
		importProvidersFrom(
			provideFirebaseApp(() =>
				initializeApp({
					projectId: 'mathematicslearningtool',
					appId: '1:143208606582:web:ad90504e613fbf8b652857',
					storageBucket: 'mathematicslearningtool.appspot.com',
					apiKey: 'AIzaSyCNlfWeUYvRHkfRe7xvfvwR8JOLcMRC6Po',
					authDomain: 'mathematicslearningtool.firebaseapp.com',
					messagingSenderId: '143208606582',
				})
			)
		),
		importProvidersFrom(provideAuth(() => getAuth())),
		importProvidersFrom(provideFirestore(() => getFirestore())),
		importProvidersFrom(provideStorage(() => getStorage())),
	],
};
