import { Component } from '@angular/core';

@Component({
	selector: 'app-auth-container',
	standalone: true,
	imports: [],
	template: ` <div class="main-container">
		<div class="form-container">
			<object
				type="image/svg+xml"
				data="assets/icons/logo.svg"
				width="50"
				height="50"
			>
				logo
			</object>
			<ng-content></ng-content>
		</div>
	</div>`,
	styleUrl: './auth-container.component.scss',
})
export class AuthContainerComponent {}
