import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFormComponent } from './login-form.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { appConfig } from '../../app.config';

describe('LoginFormComponent', () => {
	let component: LoginFormComponent;
	let fixture: ComponentFixture<LoginFormComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				LoginFormComponent,
				RouterTestingModule,
				BrowserAnimationsModule,
				MatIconTestingModule,
			],
			providers: [appConfig.providers],
		}).compileComponents();

		fixture = TestBed.createComponent(LoginFormComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
