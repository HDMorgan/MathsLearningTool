import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { LessonsComponent } from './lessons/lessons.component';
import { AccountComponent } from './account/account.component';

export const dashboardRoutes: Routes = [
	{
		path: '',
		component: DashboardComponent,
		children: [
			{ path: '', redirectTo: 'lessons', pathMatch: 'full' },
			{ path: 'lessons', component: LessonsComponent },
			{ path: 'account', component: AccountComponent },
		],
	},
];
