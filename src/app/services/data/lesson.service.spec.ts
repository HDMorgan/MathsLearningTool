import { TestBed } from '@angular/core/testing';

import { LessonService } from './lesson.service';
import { importProvidersFrom } from '@angular/core';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { environment } from '../../../environments/environment';
import { AuthModule } from '@angular/fire/auth';
import { FirestoreModule } from '@angular/fire/firestore';

describe('LessonService', () => {
	let service: LessonService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [AuthModule, FirestoreModule],
			providers: [
				importProvidersFrom(
					provideFirebaseApp(() => initializeApp(environment.firebaseConfig))
				),
			],
		});
		service = TestBed.inject(LessonService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
