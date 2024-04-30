import { EventEmitter, Injectable } from '@angular/core';
import {
	Auth,
	GoogleAuthProvider,
	User,
	UserCredential,
	confirmPasswordReset,
	createUserWithEmailAndPassword,
	getAdditionalUserInfo,
	signInAnonymously,
	signInWithEmailAndPassword,
	signInWithPopup,
	updateProfile,
	verifyPasswordResetCode,
} from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private snackbarDuration = 5000;
	private googleAuthProvider = new GoogleAuthProvider();

	teacherNameChanged = new EventEmitter<string>();

	constructor(
		private auth: Auth,
		private router: Router,
		private snackBar: MatSnackBar
	) {}

	createAccountAndSignIn(email: string, password: string): Promise<boolean> {
		return new Promise<boolean>((resolve, reject) => {
			createUserWithEmailAndPassword(this.auth, email, password)
				.then(() => {
					this.router.navigateByUrl('/auth/set-teacher-name');
					resolve(true);
				})
				.catch((error) => {
					this.snackBar.open(`Sign up failed: ${error.code}`);
					reject(error);
				});
		});
	}

	loginWithEmail(email: string, password: string): Promise<boolean> {
		return new Promise<boolean>((resolve, reject) => {
			signInWithEmailAndPassword(this.auth, email, password)
				.then((credentials) => {
					this.resolveSignIn(credentials);
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
				.then((credentials) => {
					this.resolveSignIn(credentials);
					resolve(true);
				})
				.catch((error) => {
					this.snackBar.open(`Login failed: ${error.code}`, undefined, {
						duration: this.snackbarDuration,
					});
				});
		});
	}

	checkUserSignedIn(): boolean {
		return !!this.auth.currentUser && !this.auth.currentUser.isAnonymous;
	}

	resetPassword(newPassword: string, oob: string) {
		verifyPasswordResetCode(this.auth, oob as string)
			.then((email) => {
				confirmPasswordReset(this.auth, oob as string, newPassword).then(() => {
					this.loginWithEmail(email, newPassword);
				});
			})
			.catch((error) => {
				this.snackBar.open(`Password reset failed: ${error.code}`);
			});
	}

	changeTeacherName(name: string): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			updateProfile(this.auth.currentUser as User, { displayName: name })
				.then(() => {
					this.teacherNameChanged.emit(name);
					resolve();
				})
				.catch((error) => {
					this.snackBar.open(`Name update failed: ${error.code}`);
					reject();
				});
		});
	}

	authoriseStudent(): Promise<string> {
		if (!this.auth.currentUser) {
			return signInAnonymously(this.auth).then((credential) =>
				Promise.resolve(credential.user.uid)
			);
		}

		return Promise.resolve(this.auth.currentUser.uid);
	}

	private resolveSignIn(credentials: UserCredential) {
		if (getAdditionalUserInfo(credentials)?.isNewUser) {
			this.router.navigateByUrl('/auth/set-teacher-name');
			return;
		}
		this.router.navigateByUrl('/dashboard');
	}
}
