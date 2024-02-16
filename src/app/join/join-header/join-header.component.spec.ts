import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinHeaderComponent } from './join-header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatIconTestingModule } from '@angular/material/icon/testing';

describe('JoinHeaderComponent', () => {
	let component: JoinHeaderComponent;
	let fixture: ComponentFixture<JoinHeaderComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				JoinHeaderComponent,
				RouterTestingModule,
				HttpClientModule,
				MatIconTestingModule,
			],
		}).compileComponents();

		fixture = TestBed.createComponent(JoinHeaderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
