import { Routes } from '@angular/router';
import { JoinComponent } from './join/join.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
	{ path: '', redirectTo: 'join', pathMatch: 'full' },
	{ path: 'join', component: JoinComponent },
	{ path: 'auth', loadChildren: () => import('./auth/auth.routes') },
	{
		path: 'dashboard',
		loadChildren: () =>
			import('./dashboard/dashboard.routes').then((m) => m.dashboardRoutes),
		canActivate: [authGuard],
	},
];
