import { TestBed } from '@angular/core/testing';

import { FirestoreLobbyService } from './firestore-lobby.service';
import { importProvidersFrom } from '@angular/core';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from '../../../environments/environment';

describe('FirestoreLobbyService', () => {
	let service: FirestoreLobbyService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [],
			providers: [
				importProvidersFrom(
					provideFirebaseApp(() => initializeApp(environment.firebaseConfig))
				),
				importProvidersFrom(provideAuth(() => getAuth())),
				importProvidersFrom(provideFirestore(() => getFirestore())),
			],
		});
		service = TestBed.inject(FirestoreLobbyService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
