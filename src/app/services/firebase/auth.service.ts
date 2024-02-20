import { Injectable } from '@angular/core';
import {
	Auth,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInWithPopup,
} from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private snackbarDuration = 5000;
	private googleAuthProvider = new GoogleAuthProvider();

	constructor(
		private auth: Auth,
		private router: Router,
		private snackBar: MatSnackBar
	) {}

	createAccountAndSignIn(email: string, password: string): Promise<boolean> {
		return new Promise<boolean>((resolve, reject) => {
			createUserWithEmailAndPassword(this.auth, email, password)
				.then(() => {
					this.router.navigateByUrl('/dashboard');
					resolve(true);
				})
				.catch((error) => {
					this.snackBar.open(`Sign up failed: ${error.message}`);
					reject(error);
				});
		});
	}

	loginWithEmail(email: string, password: string): Promise<boolean> {
		return new Promise<boolean>((resolve, reject) => {
			signInWithEmailAndPassword(this.auth, email, password)
				.then(() => {
					this.router.navigateByUrl('/dashboard');
					resolve(true);
				})
				.catch((error) => {
					this.snackBar.open(`Login failed: ${error.code}`, undefined, {
						duration: this.snackbarDuration,
					});
					reject(error);
				});
		});
	}

	loginWithGoogle(): Promise<boolean> {
		return new Promise<boolean>((resolve) => {
			signInWithPopup(this.auth, this.googleAuthProvider)
				.then(() => {
					this.router.navigateByUrl('/dashboard');
					resolve(true);
				})
				.catch((error) => {
					this.snackBar.open(`Login failed: ${error.code}`, undefined, {
						duration: this.snackbarDuration,
					});
				});
		});
	}

	getAuthState(): boolean {
		return !!this.auth.currentUser;
	}

	signOut() {
		this.auth.signOut();
	}
}
