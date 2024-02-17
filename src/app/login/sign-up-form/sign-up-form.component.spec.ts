import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpFormComponent } from './sign-up-form.component';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

describe('SignUpFormComponent', () => {
	let component: SignUpFormComponent;
	let fixture: ComponentFixture<SignUpFormComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				SignUpFormComponent,
				MatIconTestingModule,
				BrowserAnimationsModule,
				RouterTestingModule,
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
