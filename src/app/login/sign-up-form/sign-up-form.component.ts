import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ILoginForm } from '../ilogin-form';
import {
	AbstractControl,
	FormBuilder,
	FormGroup,
	ReactiveFormsModule,
	ValidationErrors,
	ValidatorFn,
	Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PasswordErrorStateMatcherService } from '../../services/password-error-state-matcher.service';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
	selector: 'app-sign-up-form',
	standalone: true,
	imports: [
		CommonModule,
		MatFormFieldModule,
		MatInputModule,
		ReactiveFormsModule,
		MatButtonModule,
		RouterLink,
	],
	templateUrl: './sign-up-form.component.html',
})
export class SignUpFormComponent implements ILoginForm {
	title = 'Sign up';
	signUpForm: FormGroup;
	passwordErrorMatcher: PasswordErrorStateMatcherService;

	checkPasswords: ValidatorFn = (
		group: AbstractControl
	): ValidationErrors | null => {
		const pass = group.get('password')?.value;
		const confirmPass = group.get('confirmPassword')?.value;
		return pass === confirmPass ? null : { notSame: true };
	};

	constructor(
		private formBuilder: FormBuilder,
		private authService: AuthService,
		passwordErrorMatcher: PasswordErrorStateMatcherService
	) {
		this.passwordErrorMatcher = passwordErrorMatcher;

		this.signUpForm = this.formBuilder.group(
			{
				email: ['', [Validators.required, Validators.email]],
				password: ['', [Validators.required, Validators.minLength(6)]],
				confirmPassword: ['', [Validators.required]],
			},
			{ validators: this.checkPasswords }
		);
	}

	OnSubmit() {
		if (this.signUpForm.valid) {
			const email = this.signUpForm.get('email')?.value;
			const password = this.signUpForm.get('password')?.value;
			this.authService
				.createAccountAndSignIn(email, password)
				.catch(() => this.signUpForm.reset());
		}
	}
}
