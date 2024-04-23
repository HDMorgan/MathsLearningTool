import { TestBed } from '@angular/core/testing';

import { ImageService } from './image.service';
import { importProvidersFrom } from '@angular/core';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { environment } from '../../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';

describe('ImageService', () => {
	let service: ImageService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				importProvidersFrom(
					provideFirebaseApp(() => initializeApp(environment.firebaseConfig))
				),
				importProvidersFrom(provideAuth(() => getAuth())),
				importProvidersFrom(provideStorage(() => getStorage())),
			],
		});
		service = TestBed.inject(ImageService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
