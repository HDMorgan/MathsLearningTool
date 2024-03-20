import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
	selector: 'app-dashboard',
	standalone: true,
	imports: [],
	templateUrl: './dashboard.component.html',
	styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
	constructor(private auth: Auth, private router: Router) {}

	Logout() {
		this.auth.signOut().then(() => this.router.navigateByUrl('/'));
	}
}
