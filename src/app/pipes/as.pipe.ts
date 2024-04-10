import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
	name: 'as',
	standalone: true,
})
export class asPipe implements PipeTransform {
	transform<T>(value: unknown): T {
		return value as T;
	}
}
