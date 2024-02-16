import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoButtonComponent } from './logo-button.component';
import { MatIconTestingModule } from '@angular/material/icon/testing';

describe('LogoButtonComponent', () => {
	let component: LogoButtonComponent;
	let fixture: ComponentFixture<LogoButtonComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [LogoButtonComponent, MatIconTestingModule],
		}).compileComponents();

		fixture = TestBed.createComponent(LogoButtonComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
