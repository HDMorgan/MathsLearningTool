import { Directive, HostListener, Input, ElementRef } from '@angular/core';

@Directive({
	selector: '[charLimit]',
})
export class MaxLengthDirective {
	@Input() appMaxLength!: number;
	el: any;
	constructor(el: ElementRef) {
		this.el = el;
	}

	@HostListener('paste', ['$event']) onPaste() {
		setTimeout(() => {
			const value = this.el.nativeElement.value;
			if (value.length > this.appMaxLength - 1) {
				this.el.nativeElement.value = value.substring(0, this.appMaxLength);
			}
		});
	}

	@HostListener('keydown', ['$event']) onKeydown(event: any) {
		const value = this.el.nativeElement.value;
		const keycode = event.which || event.keycode;
		const allowedKeyCodes = [8, 13, 46, 37, 38, 39, 40];
		const keyCodeIndex = allowedKeyCodes.indexOf(keycode);
		if (keyCodeIndex != -1) {
			return;
		}
		if (value.length > this.appMaxLength - 1) {
			event.preventDefault();
			event.stopPropagation();
		}
	}
}
