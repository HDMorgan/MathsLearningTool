import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'apostrophe',
	standalone: true,
})
export class ApostrophePipe implements PipeTransform {
	transform(value: string): string {
		if (!value) return '';
		if (value.toLowerCase().endsWith('s')) {
			return value + "'";
		} else {
			return value + "'s";
		}
	}
}
