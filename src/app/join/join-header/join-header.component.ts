import { Component, OnInit } from '@angular/core';
import { LogoButtonComponent } from '../../logo-button/logo-button.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
	selector: 'app-join-header',
	standalone: true,
	imports: [LogoButtonComponent, MatButtonModule, RouterLink],
	templateUrl: './join-header.component.html',
})
export class JoinHeaderComponent implements OnInit {
	teacherButtonRoute: string = '';
	teacherButtonText: string = '';

	constructor(private authService: AuthService) {}

	ngOnInit(): void {
		const loggedIn = !!this.authService.checkUserSignedIn();
		this.teacherButtonRoute = loggedIn ? '/dashboard' : '/auth/login';
		this.teacherButtonText = loggedIn ? 'DASHBOARD' : 'TEACHER LOGIN';
	}
}
