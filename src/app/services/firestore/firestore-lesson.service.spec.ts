import { TestBed } from '@angular/core/testing';

import { FirestoreLessonService } from './firestore-lesson.service';
import { importProvidersFrom } from '@angular/core';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { environment } from '../../../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

describe('FirestoreLessonService', () => {
	let service: FirestoreLessonService;

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
		service = TestBed.inject(FirestoreLessonService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
