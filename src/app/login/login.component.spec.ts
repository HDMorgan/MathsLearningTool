import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { ActivatedRoute, Params, convertToParamMap } from '@angular/router';
import { BehaviorSubject, Observable, Subscription, of } from 'rxjs';
import { IconRegisterService } from '../services/mat-icon-register.service';
import {
	RouterTestingHarness,
	RouterTestingModule,
} from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';

describe('LoginComponent', () => {
	let component: LoginComponent;
	let fixture: ComponentFixture<LoginComponent>;
	let activatedRoute: ActivatedRoute;
	let iconRegisterService: IconRegisterService;
	let activatedRouteStub: { params: Observable<Params> };

	let mockParamsObservable = new Observable<Params>();
	let mockSubscription = new Subscription();

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [LoginComponent, RouterTestingModule, BrowserAnimationsModule],
			providers: [
				{ provide: ActivatedRoute, useValue: { params: of({ id: 'login' }) } },
			],
		}).compileComponents();

		fixture = TestBed.createComponent(LoginComponent);

		activatedRoute = TestBed.inject(ActivatedRoute);
		iconRegisterService = TestBed.inject(IconRegisterService);

		spyOn(activatedRoute.params, 'subscribe').and.returnValue(mockSubscription);
		spyOn(iconRegisterService, 'RegisterGoogleIcon');
		spyOn(mockSubscription, 'unsubscribe');

		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should subscribe to route params', () => {
		expect(activatedRoute?.params.subscribe).toHaveBeenCalledTimes(1);
	});

	it('should unsubscribe from route params on component destroy', () => {
		component.ngOnDestroy();
		expect(mockSubscription.unsubscribe).toHaveBeenCalled();
	});

	it('should register the google-logo icon', () => {
		expect(iconRegisterService.RegisterGoogleIcon).toHaveBeenCalledTimes(1);
	});
});
