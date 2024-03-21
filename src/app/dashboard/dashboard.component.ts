import { Component, OnDestroy, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { LogoButtonComponent } from '../logo-button/logo-button.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { LessonsComponent } from './lessons/lessons.component';
import { AccountComponent } from './account/account.component';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-dashboard',
	standalone: true,
	imports: [
		LogoButtonComponent,
		MatButtonModule,
		MatTabsModule,
		LessonsComponent,
		AccountComponent,
		RouterLink,
		RouterOutlet,
	],
	templateUrl: './dashboard.component.html',
	styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit, OnDestroy {
	private urlSubscription?: Subscription;

	links = [
		{ title: 'Lessons', url: 'lessons' },
		{ title: 'Account', url: 'account' },
	];
	activeLink: string = '';

	constructor(private auth: Auth, private router: Router) {}

	ngOnInit(): void {
		this.onUrlChanged(this.router.url);
		this.urlSubscription = this.router.events.subscribe(() =>
			this.onUrlChanged(this.router.url)
		);
	}

	onUrlChanged(url: string) {
		const urlSegments = url.split('/');
		this.activeLink = urlSegments[urlSegments.length - 1];
	}

	ngOnDestroy(): void {
		this.urlSubscription?.unsubscribe();
	}

	Logout() {
		this.auth.signOut().then(() => this.router.navigateByUrl('/'));
	}
}
