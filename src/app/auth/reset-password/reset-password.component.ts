import { AuthService } from './../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
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
import { PasswordErrorStateMatcherService } from '../../services/password-error-state-matcher.service';
import { checkPasswords } from '../passwordVallidator';
import { ActivatedRoute } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
	selector: 'app-reset-password',
	standalone: true,
	imports: [
		MatButtonModule,
		MatInputModule,
		MatFormFieldModule,
		ReactiveFormsModule,
		CommonModule,
		AuthContainerComponent,
	],
	templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent {
	resetForm: FormGroup;
	passwordErrorMatcher: PasswordErrorStateMatcherService;

	constructor(
		formBuilder: FormBuilder,
		private authService: AuthService,
		passwordErrorMatcher: PasswordErrorStateMatcherService,
		private activatedRoute: ActivatedRoute
	) {
		this.passwordErrorMatcher = passwordErrorMatcher;

		this.resetForm = formBuilder.group(
			{
				password: ['', [Validators.required, Validators.minLength(6)]],
				confirmPassword: ['', [Validators.required]],
			},
			{ validators: checkPasswords }
		);
	}

	OnSubmit() {
		const oob = this.activatedRoute.snapshot.queryParamMap.get('oobCode');
		if (this.resetForm.valid && oob != null) {
			const newPassword = this.resetForm.get('password')?.value as string;

			this.authService.resetPassword(newPassword, oob);
		}
	}
}
