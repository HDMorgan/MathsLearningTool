import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinComponent } from './join.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { AuthModule, getAuth, provideAuth } from '@angular/fire/auth';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { importProvidersFrom } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthService } from '../services/firebase/auth.service';

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
				AuthModule,
			],
			providers: [
				importProvidersFrom(
					provideFirebaseApp(() => initializeApp(environment.firebaseConfig))
				),
				importProvidersFrom(provideAuth(() => getAuth())),
			],
		}).compileComponents();

		fixture = TestBed.createComponent(JoinComponent);
		const authService = TestBed.inject(AuthService);
		spyOn(authService, 'getAuthState').and.returnValue(true);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
