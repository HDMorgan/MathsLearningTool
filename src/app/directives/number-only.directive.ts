import { Directive, HostListener } from '@angular/core';

@Directive({
	selector: '[appNumberOnly]',
	standalone: true,
})
export class NumberOnlyDirective {
	@HostListener('input', ['$event']) onInputChange(event: KeyboardEvent) {
		const initialValue = (event.target as HTMLInputElement).value;
		(event.target as HTMLInputElement).value = initialValue.replace(
			/[^0-9.]/g,
			''
		);
		if (initialValue !== (event.target as HTMLInputElement).value) {
			event.stopPropagation();
		}
	}
}
