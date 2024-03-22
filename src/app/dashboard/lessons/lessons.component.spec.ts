import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonsComponent } from './lessons.component';
import { importProvidersFrom } from '@angular/core';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { environment } from '../../../environments/environment';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';

describe('LessonsComponent', () => {
	let component: LessonsComponent;
	let fixture: ComponentFixture<LessonsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [LessonsComponent],

			providers: [
				importProvidersFrom(
					provideFirebaseApp(() => initializeApp(environment.firebaseConfig))
				),
				importProvidersFrom(provideAuth(() => getAuth())),
				importProvidersFrom(provideFirestore(() => getFirestore())),
			],
		}).compileComponents();

		fixture = TestBed.createComponent(LessonsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
