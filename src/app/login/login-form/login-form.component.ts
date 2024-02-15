import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-login-form',
	standalone: true,
	imports: [],
	templateUrl: './login-form.component.html',
	styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
	private loginForm: FormGroup;

	constructor(private formBuilder: FormBuilder) {
		this.loginForm = formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6)]],
		});
	}
}
