import { ILoginForm } from './ilogin-form';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { ChangeDetectorRef, importProvidersFrom } from '@angular/core';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { environment } from '../../../environments/environment';

describe('LoginComponent', () => {
	let component: LoginComponent;
	let fixture: ComponentFixture<LoginComponent>;
	let mockLoginFrom: ILoginForm;

	const testTitle = 'test-title';

	beforeEach(async () => {
		mockLoginFrom = { title: 'test-title' };

		await TestBed.configureTestingModule({
			imports: [
				LoginComponent,
				RouterTestingModule,
				BrowserAnimationsModule,
				MatIconTestingModule,
			],
			providers: [
				importProvidersFrom(provideAuth(() => getAuth())),
				importProvidersFrom(
					provideFirebaseApp(() => initializeApp(environment.firebaseConfig))
				),
			],
		}).compileComponents();

		fixture = TestBed.createComponent(LoginComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should set title when router activated', () => {
		component.OnActivated(mockLoginFrom);
		expect(component.pageTitle).toBe(testTitle);
	});

	it('should force an update when router activated', () => {
		const changeDetectorRef =
			fixture.debugElement.injector.get(ChangeDetectorRef);
		const detectChangesSpy = spyOn(
			changeDetectorRef.constructor.prototype,
			'detectChanges'
		);

		component.OnActivated(mockLoginFrom); // Which internally calls the detectChanges.

		expect(detectChangesSpy).toHaveBeenCalled();
	});
});
