import { TestBed } from '@angular/core/testing';

import { LessonService } from './lesson.service';
import { importProvidersFrom } from '@angular/core';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { environment } from '../../../environments/environment';
import { AuthModule, getAuth, provideAuth } from '@angular/fire/auth';
import {
	FirestoreModule,
	getFirestore,
	provideFirestore,
} from '@angular/fire/firestore';

describe('LessonService', () => {
	let service: LessonService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [AuthModule, FirestoreModule],
			providers: [
				importProvidersFrom(
					provideFirebaseApp(() => initializeApp(environment.firebaseConfig))
				),
				importProvidersFrom(provideAuth(() => getAuth())),
				importProvidersFrom(provideFirestore(() => getFirestore())),
			],
		});
		service = TestBed.inject(LessonService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
