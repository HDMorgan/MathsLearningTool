import { TestBed } from '@angular/core/testing';

import { FirestoreQuestionService } from './firestore-question.service';
import { importProvidersFrom } from '@angular/core';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from '../../../environments/environment';

describe('FirestoreQuestionService', () => {
	let service: FirestoreQuestionService;

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
		service = TestBed.inject(FirestoreQuestionService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
