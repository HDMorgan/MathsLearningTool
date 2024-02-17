import { Component, EventEmitter, OnInit } from '@angular/core';
import { ILoginForm } from '../ilogin-form';

@Component({
	selector: 'app-sign-up-form',
	standalone: true,
	imports: [],
	templateUrl: './sign-up-form.component.html',
	styleUrl: './sign-up-form.component.css',
})
export class SignUpFormComponent implements ILoginForm {
	title = 'Sign up';
}
