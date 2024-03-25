import { Component } from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { AuthContainerComponent } from '../auth-container/auth-container.component';
import { CommonModule } from '@angular/common';
import { Auth, sendPasswordResetEmail } from '@angular/fire/auth';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
	selector: 'app-forgot-password',
	standalone: true,
	imports: [
		CommonModule,
		MatButtonModule,
		MatInputModule,
		MatFormFieldModule,
		ReactiveFormsModule,
		AuthContainerComponent,
	],
	templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent {
	formGroup: FormGroup;
	emailSent = false;

	constructor(formBuilder: FormBuilder, private auth: Auth) {
		this.formGroup = formBuilder.group({
			email: ['', [Validators.email, Validators.required]],
		});
	}

	sendEmail() {
		if (this.formGroup.valid) {
			const email = this.formGroup.get('email')?.value as string;
			sendPasswordResetEmail(this.auth, email)
				.then(() => (this.emailSent = true))
				.catch((error) => console.log(error));
		}
	}
}
