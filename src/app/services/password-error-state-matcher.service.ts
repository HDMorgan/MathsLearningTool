import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Injectable({
	providedIn: 'root',
})
export class PasswordErrorStateMatcherService implements ErrorStateMatcher {
	constructor() {}
	isErrorState(control: AbstractControl<unknown, unknown> | null): boolean {
		const invalidCtrl = !!(
			control?.parent?.hasError('notSame') && control?.dirty
		);
		const passwordInvalid = !!(
			!control?.parent?.get('password')?.valid && control?.dirty
		);

		return invalidCtrl || passwordInvalid;
	}
}
