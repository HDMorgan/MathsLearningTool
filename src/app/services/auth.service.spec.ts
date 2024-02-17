import { Auth, getAuth, provideAuth } from '@angular/fire/auth';
import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { importProvidersFrom } from '@angular/core';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { appConfig } from '../app.config';

describe('AuthService', () => {
	let service: AuthService;
	let mockAuth = jasmine.createSpy('Auth');

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [appConfig.providers],
		});
		service = TestBed.inject(AuthService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
