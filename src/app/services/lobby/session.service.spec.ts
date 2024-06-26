import { TestBed } from '@angular/core/testing';

import { SessionService } from './session.service';
import { importProvidersFrom } from '@angular/core';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from '../../../environments/environment';
import { getStorage, provideStorage } from '@angular/fire/storage';

describe('SessionService', () => {
	let service: SessionService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [],
			providers: [
				importProvidersFrom(
					provideFirebaseApp(() => initializeApp(environment.firebaseConfig))
				),
				importProvidersFrom(provideAuth(() => getAuth())),
				importProvidersFrom(provideFirestore(() => getFirestore())),
				importProvidersFrom(provideStorage(() => getStorage())),
			],
		});
		service = TestBed.inject(SessionService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
