import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinHeaderComponent } from './join-header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { AuthModule } from '@angular/fire/auth';
import {
	FirebaseAppModule,
	initializeApp,
	provideFirebaseApp,
} from '@angular/fire/app';
import { importProvidersFrom } from '@angular/core';
import { environment } from '../../../environments/environment';

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
				AuthModule,
				FirebaseAppModule,
			],
			providers: [
				importProvidersFrom(
					provideFirebaseApp(() => initializeApp(environment.firebaseConfig))
				),
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
