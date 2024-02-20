import { TestBed } from '@angular/core/testing';
import { FirebaseAppModule } from '@angular/fire/app';
import { AuthModule, GoogleAuthProvider } from '@angular/fire/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from './auth.service';

describe('AuthService', () => {
	let service: AuthService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [BrowserAnimationsModule, AuthModule, FirebaseAppModule],
			providers: [GoogleAuthProvider, AuthService],
		});

		service = TestBed.inject(AuthService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
