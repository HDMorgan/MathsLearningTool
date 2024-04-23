import { Directive, HostBinding, Input } from '@angular/core';

@Directive()
export class BaseDisplay {
	@Input() correct!: number;
	@Input() total!: number;
	@Input() showAnswer!: boolean;

	@HostBinding('class') class = 'question-display';
}
