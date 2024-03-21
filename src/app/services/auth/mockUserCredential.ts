/* eslint-disable @typescript-eslint/no-unused-vars */
import { IdTokenResult, User, UserCredential } from '@angular/fire/auth';

class mockUser implements User {
	emailVerified = false;
	isAnonymous = false;
	metadata = {};
	providerData = [];
	refreshToken = '';
	tenantId = '';
	delete(): Promise<void> {
		throw new Error('Method not implemented.');
	}
	getIdToken(forceRefresh?: boolean | undefined): Promise<string> {
		throw new Error('Method not implemented.');
	}
	getIdTokenResult(forceRefresh?: boolean | undefined): Promise<IdTokenResult> {
		throw new Error('Method not implemented.');
	}
	reload(): Promise<void> {
		throw new Error('Method not implemented.');
	}
	toJSON(): object {
		throw new Error('Method not implemented.');
	}
	displayName = '';
	email = '';
	phoneNumber = '';
	photoURL = '';
	providerId = '';
	uid = '';
}

export class mockUserCredential implements UserCredential {
	user = new mockUser();
	providerId = '';
	operationType: 'link' | 'reauthenticate' | 'signIn' = 'link';
}
