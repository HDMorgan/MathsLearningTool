import { Routes } from '@angular/router';
import { JoinComponent } from './join/join.component';

export const routes: Routes = [
	{ path: '', redirectTo: 'join', pathMatch: 'full' },
	{ path: 'join', component: JoinComponent },
];
