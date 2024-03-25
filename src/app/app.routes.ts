import { Routes } from '@angular/router';
import { JoinComponent } from './join/join.component';
import { authGuard } from './auth.guard';
import { LoginFormComponent } from './auth/login/login-form/login-form.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpFormComponent } from './auth/login/sign-up-form/sign-up-form.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';

export const routes: Routes = [
	{ path: '', redirectTo: 'join', pathMatch: 'full' },
	{ path: 'join', component: JoinComponent },
	{ path: 'auth', redirectTo: 'auth/login' },
	{
		path: 'auth',
		component: LoginComponent,
		children: [
			{ path: '', redirectTo: 'login', pathMatch: 'full' },
			{ path: 'login', component: LoginFormComponent },
			{ path: 'sign-up', component: SignUpFormComponent },
		],
	},
	{ path: 'forgot-password', component: ForgotPasswordComponent },
	{ path: 'reset-password', component: ResetPasswordComponent },
	{
		path: 'dashboard',
		loadChildren: () =>
			import('./dashboard/dashboard.routes').then((m) => m.dashboardRoutes),
		canActivate: [authGuard],
	},
];
