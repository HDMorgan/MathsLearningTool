import { TestBed } from '@angular/core/testing';

import { FirestoreLessonService } from './firestore-lesson.service';
import { importProvidersFrom } from '@angular/core';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { environment } from '../../../environments/environment';
import { FirestoreModule } from '@angular/fire/firestore';
import { AuthModule } from '@angular/fire/auth';

describe('FirestoreLessonService', () => {
	let service: FirestoreLessonService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [AuthModule, FirestoreModule],
			providers: [
				importProvidersFrom(
					provideFirebaseApp(() => initializeApp(environment.firebaseConfig))
				),
			],
		});
		service = TestBed.inject(FirestoreLessonService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
