import { Component } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { IconRegisterService } from '../services/mat-icon-register.service';

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
