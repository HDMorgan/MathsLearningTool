import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { importProvidersFrom } from '@angular/core';
import {
	FirebaseAppModule,
	provideFirebaseApp,
	initializeApp,
} from '@angular/fire/app';
import { AuthModule } from '@angular/fire/auth';
import { environment } from '../../environments/environment';
import { MatIconTestingModule } from '@angular/material/icon/testing';

describe('DashboardComponent', () => {
	let component: DashboardComponent;
	let fixture: ComponentFixture<DashboardComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				DashboardComponent,
				AuthModule,
				FirebaseAppModule,
				RouterTestingModule,
				MatIconTestingModule,
			],
			providers: [
				importProvidersFrom(
					provideFirebaseApp(() => initializeApp(environment.firebaseConfig))
				),
			],
		}).compileComponents();

		fixture = TestBed.createComponent(DashboardComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
