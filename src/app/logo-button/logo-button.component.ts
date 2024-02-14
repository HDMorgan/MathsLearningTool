import { Component } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

@Component({
	selector: 'app-logo-button',
	standalone: true,
	imports: [MatIconModule, MatButtonModule, HttpClientModule],
	templateUrl: './logo-button.component.html',
	styleUrl: './logo-button.component.css',
})
export class LogoButtonComponent {
	constructor(iconRegistry: MatIconRegistry, sanitiser: DomSanitizer) {
		iconRegistry.addSvgIcon(
			'main-logo',
			sanitiser.bypassSecurityTrustResourceUrl('assets/icons/logo.svg')
		);
	}
}
