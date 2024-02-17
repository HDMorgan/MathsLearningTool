import { Injectable } from '@angular/core';
import { AbstractControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Injectable({
	providedIn: 'root',
})
export class PasswordErrorStateMatcherService implements ErrorStateMatcher {
	constructor() {}
	isErrorState(
		control: AbstractControl<any, any> | null,
		form: FormGroupDirective | NgForm | null
	): boolean {
		const invalidCtrl = !!(
			control?.parent?.hasError('notSame') && control?.dirty
		);
		const passwordInvalid = !!(
			!control?.parent?.get('password')?.valid && control?.dirty
		);

		return invalidCtrl || passwordInvalid;
	}
}
