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
	styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
	loginForm: FormGroup;

	constructor(private formBuilder: FormBuilder) {
		this.loginForm = formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6)]],
		});
	}

	OnSubmit() {
		console.log('Email:' + this.loginForm.value[0]);
	}
}
