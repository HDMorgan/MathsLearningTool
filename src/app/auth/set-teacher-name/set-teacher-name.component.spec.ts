import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetTeacherNameComponent } from './set-teacher-name.component';
import { importProvidersFrom } from '@angular/core';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { environment } from '../../../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SetTeacherNameComponent', () => {
	let component: SetTeacherNameComponent;
	let fixture: ComponentFixture<SetTeacherNameComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				SetTeacherNameComponent,
				BrowserAnimationsModule,
				RouterTestingModule,
			],
			providers: [
				importProvidersFrom(
					provideFirebaseApp(() => initializeApp(environment.firebaseConfig))
				),
				importProvidersFrom(provideAuth(() => getAuth())),
			],
		}).compileComponents();

		fixture = TestBed.createComponent(SetTeacherNameComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
