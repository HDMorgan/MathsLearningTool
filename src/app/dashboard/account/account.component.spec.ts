import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountComponent } from './account.component';
import { importProvidersFrom } from '@angular/core';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { environment } from '../../../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AccountComponent', () => {
	let component: AccountComponent;
	let fixture: ComponentFixture<AccountComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AccountComponent, BrowserAnimationsModule],
			providers: [
				importProvidersFrom(provideAuth(() => getAuth())),
				importProvidersFrom(
					provideFirebaseApp(() => initializeApp(environment.firebaseConfig))
				),
			],
		}).compileComponents();

		fixture = TestBed.createComponent(AccountComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
