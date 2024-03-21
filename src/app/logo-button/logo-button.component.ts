import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-logo-button',
	standalone: true,
	imports: [MatIconModule, MatButtonModule, HttpClientModule, RouterLink],
	template: `<button mat-button routerLink="/join">
		<mat-icon svgIcon="main-logo"></mat-icon>
		Maths Quiz
	</button>`,
})
export class LogoButtonComponent {}
