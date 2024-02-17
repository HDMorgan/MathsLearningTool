import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { ILoginForm } from '../ilogin-form';
import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-login-form',
	standalone: true,
	imports: [
		MatButtonModule,
		MatFormFieldModule,
		MatInputModule,
		ReactiveFormsModule,
		CommonModule,
		RouterLink,
	],
	templateUrl: './login-form.component.html',
})
export class LoginFormComponent implements ILoginForm {
	loginForm: FormGroup;
	title = 'Login';

	constructor(
		private formBuilder: FormBuilder,
		private authService: AuthService
	) {
		this.loginForm = formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6)]],
		});
	}

	OnSubmit() {
		if (this.loginForm.valid) {
			let email = this.loginForm.get('email')?.value;
			let password = this.loginForm.get('password')?.value;
			this.authService
				.login(email, password)
				.catch(() => this.loginForm.reset());
		}
	}
}
