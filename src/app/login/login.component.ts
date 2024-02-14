import { IconRegisterService } from './../services/mat-icon-register.service';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [MatButtonModule, MatIconModule],
	templateUrl: './login.component.html',
	styleUrl: './login.component.css',
})
export class LoginComponent {
	constructor(iconRegisterService: IconRegisterService) {
		iconRegisterService.RegisterGoogleIcon();
	}
}
