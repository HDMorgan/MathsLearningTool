import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinComponent } from './join.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MatIconTestingModule } from '@angular/material/icon/testing';

describe('JoinComponent', () => {
	let component: JoinComponent;
	let fixture: ComponentFixture<JoinComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				JoinComponent,
				BrowserAnimationsModule,
				RouterTestingModule,
				MatIconTestingModule,
			],
		}).compileComponents();

		fixture = TestBed.createComponent(JoinComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
