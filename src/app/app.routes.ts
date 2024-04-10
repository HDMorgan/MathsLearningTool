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
	{
		path: 'lesson/:id',
		loadComponent: () =>
			import('./LessonEditor/edit-lesson/edit-lesson.component').then(
				(m) => m.EditLessonComponent
			),
		canActivate: [authGuard],
	},
	{
		path: 'host/:id',
		loadComponent: () =>
			import('./host/host-container/host-container.component').then(
				(c) => c.HostContainerComponent
			),
		canActivate: [authGuard],
	},
];
