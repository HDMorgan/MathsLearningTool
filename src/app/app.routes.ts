import { Routes, RouterOutlet } from '@angular/router';
import { JoinComponent } from './join/join.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
	{ path: '', redirectTo: 'join', pathMatch: 'full' },
	{ path: 'join', component: JoinComponent },
	{ path: 'auth', redirectTo: 'auth/login' },
	{ path: 'auth/:id', component: LoginComponent },
];
