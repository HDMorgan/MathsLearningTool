import { HttpClientModule } from '@angular/common/http';
import { IconRegisterService } from './../services/mat-icon-register.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LoginFormComponent } from './login-form/login-form.component';
import {
	ActivatedRoute,
	RouterOutlet,
	Params,
	RouterModule,
} from '@angular/router';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';

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
export class LoginComponent implements OnInit, OnDestroy {
	urlIsLogin: boolean = true;
	paramsSubscription: Subscription | undefined;

	constructor(
		private iconRegisterService: IconRegisterService,
		private route: ActivatedRoute
	) {
		console.log('construct');
	}

	ngOnInit(): void {
		this.iconRegisterService.RegisterGoogleIcon();

		this.paramsSubscription = this.route.params.subscribe((params) => {
			this.urlIsLogin = params['id'] === 'login';
		});
	}

	ngOnDestroy(): void {
		this.paramsSubscription?.unsubscribe();
	}
}
