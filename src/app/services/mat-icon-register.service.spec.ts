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
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should register main-logo when RegisterGenericIcons is called', () => {
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

	it('should register google-logo when RegisterGoogleIcon is called', () => {
		service.RegisterGoogleIcon();
		expect(matIconRegistry.addSvgIcon).toHaveBeenCalledOnceWith(
			'google-logo',
			jasmine.any(String)
		);
	});

	it('dom should be sanitised for google-logo icon when RegisterGoogleIcon is called', () => {
		service.RegisterGoogleIcon();
		expect(
			domSanitizer.bypassSecurityTrustResourceUrl
		).toHaveBeenCalledOnceWith('assets/icons/google-logo.svg');
	});
});
