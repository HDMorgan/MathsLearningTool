import { Subscription } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { IconRegisterService } from './../services/mat-icon-register.service';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LoginFormComponent } from './login-form/login-form.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
import { CommonModule } from '@angular/common';
import { ILoginForm } from './ilogin-form';
import { AuthService } from '../services/firebase/auth.service';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [
		CommonModule,
		MatButtonModule,
		MatIconModule,
		HttpClientModule,
		LoginFormComponent,
		RouterOutlet,
		SignUpFormComponent,
	],
	templateUrl: './login.component.html',
	styleUrl: './login.component.css',
})
export class LoginComponent {
	pageTitle: string = 'clank';

	constructor(
		private changeDetectorRef: ChangeDetectorRef,
		private authService: AuthService
	) {}

	OnActivated(componentReference: ILoginForm) {
		this.pageTitle = componentReference.title;
		this.changeDetectorRef.detectChanges();
	}

	GoogleSignIn() {
		this.authService.loginWithGoogle();
	}
}
