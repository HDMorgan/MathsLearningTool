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
import { MatIconTestingModule } from '@angular/material/icon/testing';

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
			imports: [
				LoginComponent,
				RouterTestingModule,
				BrowserAnimationsModule,
				MatIconTestingModule,
			],
		}).compileComponents();

		fixture = TestBed.createComponent(LoginComponent);

		activatedRoute = TestBed.inject(ActivatedRoute);

		spyOn(activatedRoute.url, 'subscribe').and.returnValue(mockSubscription);
		spyOn(mockSubscription, 'unsubscribe');

		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
