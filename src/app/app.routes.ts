import { Routes } from '@angular/router';
import { JoinComponent } from './join/join.component';
import { SignInComponent } from './login/sign-in/sign-in.component';
import { SignUpComponent } from './login/sign-up/sign-up.component';

export const routes: Routes = [
	{ path: '', redirectTo: 'join', pathMatch: 'full' },
	{ path: 'join', component: JoinComponent },
	{ path: 'signin', component: SignInComponent },
	{ path: 'signup', component: SignUpComponent },
];
