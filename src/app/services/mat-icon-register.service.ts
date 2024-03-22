import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
	providedIn: 'any',
})
export class IconRegisterService {
	constructor(
		private iconRegistry: MatIconRegistry,
		private sanitiser: DomSanitizer
	) {}

	RegisterSvgIcons() {
		this.iconRegistry.addSvgIcon(
			'main-logo',
			this.sanitiser.bypassSecurityTrustResourceUrl('assets/icons/logo.svg')
		);

		this.iconRegistry.addSvgIcon(
			'google-logo',
			this.sanitiser.bypassSecurityTrustResourceUrl(
				'assets/icons/google-logo.svg'
			)
		);
	}
}
