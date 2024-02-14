import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { IconRegisterService } from './services/mat-icon-register.service';

describe('AppComponent', () => {
	let iconRegisterService: IconRegisterService;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AppComponent],
		}).compileComponents();

		let fixture = TestBed.createComponent(AppComponent);

		iconRegisterService = TestBed.inject(IconRegisterService);
		spyOn(iconRegisterService, 'RegisterGenericIcons');

		fixture.detectChanges();
	});

	it('should create the app', () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});

	it(`should have the 'MathsQuiz' title`, () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.componentInstance;
		expect(app.title).toEqual('MathsQuiz');
	});

	it('should call RegisterGenericIcons', () => {
		expect(iconRegisterService.RegisterGenericIcons).toHaveBeenCalled();
	});
});
