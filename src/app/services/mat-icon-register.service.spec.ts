import { MatIconRegistry } from '@angular/material/icon';
import { TestBed } from '@angular/core/testing';

import { IconRegisterService } from './mat-icon-register.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

describe('MatIconRegisterService', () => {
	let service: IconRegisterService;
	let matIconRegistry: MatIconRegistry;
	let domSanitizer: DomSanitizer;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(IconRegisterService);
		matIconRegistry = TestBed.inject(MatIconRegistry);
		domSanitizer = TestBed.inject(DomSanitizer);

		spyOn(domSanitizer, 'bypassSecurityTrustResourceUrl').and.returnValue(
			'url'
		);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should register main-logo when RegisterGenericIcons is called', () => {
		spyOn(matIconRegistry, 'addSvgIcon');

		service.RegisterGenericIcons();
		expect(matIconRegistry.addSvgIcon).toHaveBeenCalledOnceWith(
			'main-logo',
			jasmine.any(String)
		);
	});

	it('dom should be sanitised for main-logo icon when RegisterGenericIcons is called', () => {
		service.RegisterGenericIcons();
		expect(
			domSanitizer.bypassSecurityTrustResourceUrl
		).toHaveBeenCalledOnceWith('assets/icons/logo.svg');
	});
});
