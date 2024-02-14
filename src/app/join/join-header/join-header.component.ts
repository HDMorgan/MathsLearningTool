import { Component } from '@angular/core';
import { LogoButtonComponent } from '../../logo-button/logo-button.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-join-header',
	standalone: true,
	imports: [LogoButtonComponent, MatButtonModule, RouterLink],
	templateUrl: './join-header.component.html',
	styleUrl: './join-header.component.css',
})
export class JoinHeaderComponent {}
