import { TestBed } from '@angular/core/testing';
import { FirebaseAppModule } from '@angular/fire/app';
import {
	AuthModule,
	GoogleAuthProvider,
	signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from './auth.service';
import { mockUserCredential } from './mockUserCredential';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../../../environments/environment';

describe('AuthService', () => {
	let service: AuthService;
	let signInSpy: jasmine.Spy<jasmine.Func>;

	beforeEach(() => {
		signInSpy = jasmine
			.createSpy('signInWithEmailAndPassword')
			.and.returnValue(Promise.resolve(new mockUserCredential()));

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
