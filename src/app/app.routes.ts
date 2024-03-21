import { Routes } from '@angular/router';
import { JoinComponent } from './join/join.component';
import { LoginComponent } from './login/login.component';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { SignUpFormComponent } from './login/sign-up-form/sign-up-form.component';
import { authGuard } from './auth.guard';

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
	{
		path: 'dashboard',
		loadChildren: () =>
			import('./dashboard/dashboard.routes').then((m) => m.dashboardRoutes),
		canActivate: [authGuard],
	},
];
