import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpFormComponent } from './sign-up-form.component';
import { importProvidersFrom } from '@angular/core';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth, GoogleAuthProvider } from '@angular/fire/auth';
import { environment } from '../../../environments/environment';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SignUpFormComponent', () => {
	let component: SignUpFormComponent;
	let fixture: ComponentFixture<SignUpFormComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				SignUpFormComponent,
				RouterTestingModule,
				BrowserAnimationsModule,
			],
			providers: [
				importProvidersFrom(provideAuth(() => getAuth())),
				importProvidersFrom(
					provideFirebaseApp(() => initializeApp(environment.firebaseConfig))
				),
			],
		}).compileComponents();

		fixture = TestBed.createComponent(SignUpFormComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
