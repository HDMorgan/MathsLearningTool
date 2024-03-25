import { Component } from '@angular/core';
import {
	Auth,
	User,
	sendPasswordResetEmail,
	updateProfile,
} from '@angular/fire/auth';
import {
	FormBuilder,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
	selector: 'app-account',
	standalone: true,
	imports: [
		MatButtonModule,
		MatInputModule,
		MatFormFieldModule,
		ReactiveFormsModule,
	],
	templateUrl: './account.component.html',
	styleUrl: './account.component.scss',
})
export class AccountComponent {
	passwordAuthenticated: boolean;
	teacherNameForm: FormGroup;
	updateNameBtnText = 'Update';
	resetEmailSent = false;

	constructor(private auth: Auth, formBuilder: FormBuilder) {
		this.passwordAuthenticated = auth.currentUser?.providerId === 'password';

		this.teacherNameForm = formBuilder.group({
			teacherName: [auth.currentUser?.displayName, Validators.required],
		});
	}

	resetPassword() {
		sendPasswordResetEmail(
			this.auth,
			this.auth.currentUser?.email as string
		).then(() => (this.resetEmailSent = true));
	}

	updateTeacherName() {
		if (this.teacherNameForm.valid) {
			const newName = this.teacherNameForm.get('teacherName')?.value;
			updateProfile(
				this.auth.currentUser as User,
				{ displayName: newName } as User
			);
		}
	}
}
