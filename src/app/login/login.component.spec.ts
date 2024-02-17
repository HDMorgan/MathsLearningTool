import { ILoginForm } from './ilogin-form';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { ChangeDetectorRef } from '@angular/core';

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
