import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';

@Component({
	selector: 'app-logo-button',
	standalone: true,
	imports: [RouterLink, HttpClientModule, MatIconModule, MatButtonModule],
	templateUrl: './logo-button.component.html',
	styleUrl: './logo-button.component.css',
})
export class LogoButtonComponent {}
