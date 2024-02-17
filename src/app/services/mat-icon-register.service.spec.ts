import { MatIconRegistry } from '@angular/material/icon';
import { TestBed } from '@angular/core/testing';

import { IconRegisterService } from './mat-icon-register.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatIconTestingModule } from '@angular/material/icon/testing';

describe('MatIconRegisterService', () => {
	let service: IconRegisterService;
	let matIconRegistry: MatIconRegistry;
	let domSanitizer: DomSanitizer;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [MatIconTestingModule],
		});
		service = TestBed.inject(IconRegisterService);
		matIconRegistry = TestBed.inject(MatIconRegistry);
		domSanitizer = TestBed.inject(DomSanitizer);

		spyOn(domSanitizer, 'bypassSecurityTrustResourceUrl').and.returnValue(
			'url'
		);
		spyOn(matIconRegistry, 'addSvgIcon');

		service.RegisterSvgIcons();
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should register main-logo when RegisterSvgIcons is called', () => {
		expect(matIconRegistry.addSvgIcon).toHaveBeenCalledWith(
			'main-logo',
			jasmine.any(String)
		);
	});

	it('dom should be sanitised for main-logo icon when RegisterSvgIcons is called', () => {
		expect(domSanitizer.bypassSecurityTrustResourceUrl).toHaveBeenCalledWith(
			'assets/icons/logo.svg'
		);
	});

	it('should register google-logo when RegisterSvgIcons is called', () => {
		expect(matIconRegistry.addSvgIcon).toHaveBeenCalledWith(
			'google-logo',
			jasmine.any(String)
		);
	});

	it('dom should be sanitised for google-logo icon when RegisterSvgIcons is called', () => {
		expect(domSanitizer.bypassSecurityTrustResourceUrl).toHaveBeenCalledWith(
			'assets/icons/google-logo.svg'
		);
	});
});
