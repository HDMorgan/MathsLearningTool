import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordComponent } from './forgot-password.component';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { importProvidersFrom } from '@angular/core';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { environment } from '../../../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ForgotPasswordComponent', () => {
	let component: ForgotPasswordComponent;
	let fixture: ComponentFixture<ForgotPasswordComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				ForgotPasswordComponent,
				MatIconTestingModule,
				BrowserAnimationsModule,
			],

			providers: [
				importProvidersFrom(
					provideFirebaseApp(() => initializeApp(environment.firebaseConfig))
				),
				importProvidersFrom(provideAuth(() => getAuth())),
			],
		}).compileComponents();

		fixture = TestBed.createComponent(ForgotPasswordComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
