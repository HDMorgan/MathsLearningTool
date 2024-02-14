import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
	providedIn: 'root',
})
export class IconRegisterService {
	constructor(
		private iconRegistry: MatIconRegistry,
		private sanitiser: DomSanitizer
	) {}

	RegisterGenericIcons() {
		this.iconRegistry.addSvgIcon(
			'main-logo',
			this.sanitiser.bypassSecurityTrustResourceUrl('assets/icons/logo.svg')
		);
	}
}
