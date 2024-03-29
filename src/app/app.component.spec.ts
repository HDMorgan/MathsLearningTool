import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { IconRegisterService } from './services/mat-icon-register.service';
import { HttpClientModule } from '@angular/common/http';

import { MatIconTestingModule } from '@angular/material/icon/testing';

describe('AppComponent', () => {
	let iconRegisterService: IconRegisterService;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AppComponent, HttpClientModule, MatIconTestingModule],
		}).compileComponents();

		const fixture = TestBed.createComponent(AppComponent);

		iconRegisterService = TestBed.inject(IconRegisterService);
		spyOn(iconRegisterService, 'RegisterSvgIcons');

		fixture.detectChanges();
	});

	it('should create the app', () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});

	it(`should have the 'Maths Quiz' title`, () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.componentInstance;
		expect(app.title).toEqual('Maths Quiz');
	});

	// it('should call RegisterSvgIcons', () => {
	// 	expect(iconRegisterService.RegisterSvgIcons).toHaveBeenCalled();
	// });
});
