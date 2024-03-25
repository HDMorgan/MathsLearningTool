import { Routes } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { LoginComponent } from './login/login.component';
import { SignUpFormComponent } from './login/sign-up-form/sign-up-form.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SetTeacherNameComponent } from './set-teacher-name/set-teacher-name.component';

export default [
	{ path: '', redirectTo: 'login', pathMatch: 'full' },
	{
		path: 'login',
		component: LoginComponent,
		children: [
			{ path: '', component: LoginFormComponent },
			{ path: 'sign-up', component: SignUpFormComponent },
		],
	},
	{ path: 'forgot-password', component: ForgotPasswordComponent },
	{ path: 'reset-password', component: ResetPasswordComponent },
	{ path: 'set-teacher-name', component: SetTeacherNameComponent },
] as Routes;
