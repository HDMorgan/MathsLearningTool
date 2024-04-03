import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionItemComponent } from './question-item.component';
import { QuestionType } from '../../interfaces/data/ibase-question';
import { importProvidersFrom } from '@angular/core';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from '../../../environments/environment';

describe('QuestionItemComponent', () => {
	let component: QuestionItemComponent;
	let fixture: ComponentFixture<QuestionItemComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [QuestionItemComponent],
			providers: [
				importProvidersFrom(
					provideFirebaseApp(() => initializeApp(environment.firebaseConfig))
				),
				importProvidersFrom(provideAuth(() => getAuth())),
				importProvidersFrom(provideFirestore(() => getFirestore())),
			],
		}).compileComponents();

		fixture = TestBed.createComponent(QuestionItemComponent);
		component = fixture.componentInstance;

		component.question = {
			id: '',
			data: { number: 0, title: '', summary: '', type: QuestionType.Numeric },
		};
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
