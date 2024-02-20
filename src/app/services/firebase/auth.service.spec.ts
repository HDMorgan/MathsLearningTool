import { TestBed } from '@angular/core/testing';
import {
	FirebaseAppModule,
	initializeApp,
	provideFirebaseApp,
} from '@angular/fire/app';
import { AuthModule } from '@angular/fire/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from './auth.service';
import { importProvidersFrom } from '@angular/core';
import { environment } from '../../../environments/environment';

describe('AuthService', () => {
	let service: AuthService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [BrowserAnimationsModule, AuthModule, FirebaseAppModule],
			providers: [
				importProvidersFrom(
					provideFirebaseApp(() => initializeApp(environment.firebaseConfig))
				),
			],
		});

		service = TestBed.inject(AuthService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
