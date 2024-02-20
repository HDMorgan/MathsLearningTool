import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';

@Component({
	selector: 'app-logo-button',
	standalone: true,
	imports: [MatIconModule, MatButtonModule, HttpClientModule],
	template: `<button mat-button>
		<mat-icon svgIcon="main-logo"></mat-icon>
		MathQuiz
	</button>`,
})
export class LogoButtonComponent {}
