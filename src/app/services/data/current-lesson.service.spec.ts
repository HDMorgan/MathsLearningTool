import { TestBed } from '@angular/core/testing';

import { CurrentLessonService } from './current-lesson.service';
import { importProvidersFrom } from '@angular/core';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth, AuthModule } from '@angular/fire/auth';
import {
	provideFirestore,
	getFirestore,
	FirestoreModule,
} from '@angular/fire/firestore';
import { environment } from '../../../environments/environment';

describe('CurrentLessonService', () => {
	let service: CurrentLessonService;

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
		service = TestBed.inject(CurrentLessonService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
